package workflow.services;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.rest.validation.exception.DTOExceptionType;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._ActionBar;

import administrator.model.User;
import reference.model.constants.ApprovalType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.OutgoingDAO;
import workflow.dao.filter.OutgoingFilter;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.OutgoingDomain;
import workflow.domain.exception.ApprovalException;
import workflow.model.Outgoing;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

@Path("outgoings")
@Produces(MediaType.APPLICATION_JSON)
public class OutgoingService extends RestProvider {

	private ActionFactory action = new ActionFactory();

	@GET
	public Response getView() {
		_Session session = getSession();
		int pageSize = session.getPageSize();
		SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
		OutgoingFilter filter = new OutgoingFilter(getWebFormData());

		try {
			OutgoingDAO dao = new OutgoingDAO(session);
			ViewPage<Outgoing> vp = dao.findViewPage(filter, sortParams, getWebFormData().getPage(), pageSize);

			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(action.newOutgoing);
			actionBar.addAction(action.refreshVew);

			Outcome outcome = new Outcome();
			outcome.setId("outgoings");
			outcome.setTitle("outgoing_documents");
			outcome.addPayload(actionBar);
			outcome.addPayload(vp);

			return Response.ok(outcome).build();
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	@GET
	@Path("{id}")
	public Response getById(@PathParam("id") String id) {
		_Session ses = getSession();
		Outgoing entity;
		OutgoingDomain outDomain = new OutgoingDomain();
		try {
			boolean isNew = "new".equals(id);
			if (isNew) {
				entity = outDomain.composeNew((User) ses.getUser());
			} else {
				OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
				entity = outgoingDAO.findByIdentefier(id);
			}

			EmployeeDAO empDao = new EmployeeDAO(ses);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = outDomain.getOutcome(entity);
			outcome.addPayload("employees", emps);
			outcome.addPayload(getActionBar(ses, entity, outDomain));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

			return Response.ok(outcome).build();
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Outgoing dto) {
		dto.setId(null);
		return saveRequest(dto);
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") String id, Outgoing dto) {
		dto.setId(UUID.fromString(id));
		return saveRequest(dto);
	}

	private Response saveRequest(Outgoing dto) {
		try {
			OutgoingDomain omd = new OutgoingDomain();
			Outcome outcome = omd.getOutcome(save(dto));

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	private Outgoing save(Outgoing dto) throws SecureException, DAOException, DTOException {
		_Session ses = getSession();
		Outgoing entity;
		OutgoingDomain outDomain = new OutgoingDomain();
		OutgoingDAO outgoingDAO = new OutgoingDAO(ses);

		if (dto.isNew()) {
			entity = new Outgoing();
		} else {
			entity = outgoingDAO.findById(dto.getId());
		}

		dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));
		outDomain.fillFromDto(entity, dto, (User) ses.getUser(), ses);
		entity.addReaderEditor(entity.getAuthor());

		List<Observer> observers = entity.getObservers();
		if (observers != null) {
			for (Observer observer : observers) {
				Employee emp = observer.getEmployee();
				entity.addReader(emp.getUserID());
			}
		}

		if (dto.isNew()) {
			RegNum rn = new RegNum();
			entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
			entity = outgoingDAO.add(entity, rn);
		} else {
			entity = outgoingDAO.update(entity);
		}
		entity = outgoingDAO.findById(entity.getId());
		return entity;

	}

	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") String id) {
		_Session ses = getSession();
		try {
			OutgoingDAO dao = new OutgoingDAO(ses);
			Outgoing entity = dao.findByIdentefier(id);
			if (entity != null) {
				dao.delete(entity);
			}
			return Response.noContent().build();
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	@Override
	@GET
	@Path("{id}/attachments/{attachId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		try {
			OutgoingDAO dao = new OutgoingDAO(getSession());
			Outgoing entity = dao.findByIdentefier(id);

			return getAttachment(entity, attachId);
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	@GET
	@Path("{id}/attachments/{attachId}/{fileName}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachmentFN(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		return getAttachment(id, attachId);
	}

	@POST
	@Path("action/startApproving")
	public Response startApproving(Outgoing dto) {
		try {

			Outgoing entity = save(dto);
			if (entity != null) {
				OutgoingDAO dao = new OutgoingDAO(getSession());
				Outgoing outgoing = dao.findById(dto.getId());
				OutgoingDomain outgoingDomain = new OutgoingDomain();
				outgoing.setStatus(ApprovalStatusType.DRAFT);
				outgoing.setResult(ApprovalResultType.PROJECT);
				outgoingDomain.startApproving(outgoing);

				dao.update(outgoing, false);
				new Messages(getAppEnv()).notifyApprovers(outgoing, outgoing.getTitle());
				Outcome outcome = outgoingDomain.getOutcome(outgoing);
				outcome.setTitle("approving_started");
				outcome.setMessage("approving_started");
				outcome.addPayload("result", "approving_started");

				return Response.ok(outcome).build();
			} else {
				return responseValidationError(new DTOException(DTOExceptionType.NO_ENTITY));
			}
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	@POST
	@Path("action/acceptApprovalBlock")
	public Response acceptApprovalBlock(Outgoing dto) {
		try {
			OutgoingDAO officeMemoDAO = new OutgoingDAO(getSession());
			Outgoing om = officeMemoDAO.findById(dto.getId());
			OutgoingDomain omd = new OutgoingDomain();

			omd.acceptApprovalBlock(om, getSession().getUser());

			officeMemoDAO.update(om, false);
			new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
			Outcome outcome = omd.getOutcome(om);
			outcome.setTitle("acceptApprovalBlock");
			outcome.setMessage("acceptApprovalBlock");

			return Response.ok(outcome).build();
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	@POST
	@Path("action/declineApprovalBlock")
	public Response declineApprovalBlock(Outgoing dto) {
		try {
			OutgoingDAO officeMemoDAO = new OutgoingDAO(getSession());
			Outgoing om = officeMemoDAO.findById(dto.getId());
			OutgoingDomain omd = new OutgoingDomain();

			String decisionComment = getWebFormData().getValueSilently("comment");
			omd.declineApprovalBlock(om, getSession().getUser(), decisionComment);

			officeMemoDAO.update(om, false);
			new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
			Outcome outcome = omd.getOutcome(om);
			outcome.setTitle("declineApprovalBlock");
			outcome.setMessage("declineApprovalBlock");

			return Response.ok(outcome).build();
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	private _ActionBar getActionBar(_Session session, Outgoing entity, OutgoingDomain outDomain) throws DAOException {
		_ActionBar actionBar = new _ActionBar(session);

		actionBar.addAction(action.close);
		if (entity.isEditable()) {
			actionBar.addAction(action.saveAndClose);
		}
		if (outDomain.approvalCanBeStarted(entity)) {
			actionBar.addAction(action.startApproving);
		}

		EmployeeDAO employeeDAO = new EmployeeDAO(session);

		if (outDomain.employeeCanDoDecisionApproval(entity, employeeDAO.findByUser(session.getUser()))) {
			if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
				actionBar.addAction(action.signApprovalBlock);
			} else {
				actionBar.addAction(action.acceptApprovalBlock);
			}
			actionBar.addAction(action.declineApprovalBlock);
		}
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(action.deleteDocument);
		}

		return actionBar;
	}
}
