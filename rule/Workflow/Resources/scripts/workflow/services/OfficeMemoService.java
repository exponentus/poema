package workflow.services;

import java.util.Arrays;
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
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;

import administrator.model.User;
import reference.model.constants.ApprovalType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.OfficeMemoDAO;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.OfficeMemoDomain;
import workflow.domain.exception.ApprovalException;
import workflow.init.AppConst;
import workflow.model.OfficeMemo;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

@Path("office-memos")
@Produces(MediaType.APPLICATION_JSON)
public class OfficeMemoService extends RestProvider {

	private ActionFactory action = new ActionFactory();

	@GET
	public Response getView() {
		_Session session = getSession();
		int pageSize = session.pageSize;
		SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
		String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
		List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());

		try {
			// OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(session);
			// ViewPage<OfficeMemo> vp = officeMemoDAO.findViewPage(sortParams,
			// getWebFormData().getPage(), pageSize);

			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(session);
			ViewPage vp = officeMemoDAO.findAllWithDescendants(sortParams, getWebFormData().getPage(), pageSize,
					expandedIdList);

			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(action.newOfficeMemo);
			actionBar.addAction(action.refreshVew);

			EmployeeDAO empDao = new EmployeeDAO(session);
			Map<UUID, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getId, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = new Outcome();
			outcome.setId("office-memo");
			outcome.setTitle("office_memo_plural");
			outcome.addPayload(actionBar);
			outcome.addPayload(vp);
			outcome.addPayload("employees", emps);

			return Response.ok(outcome).build();
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	@GET
	@Path("{id}")
	public Response getById(@PathParam("id") String id) {
		_Session ses = getSession();
		OfficeMemo entity;
		OfficeMemoDomain omd = new OfficeMemoDomain();
		try {
			EmployeeDAO employeeDAO = new EmployeeDAO(ses);
			boolean isNew = "new".equals(id);
			if (isNew) {
				entity = omd.composeNew((User) ses.getUser(), employeeDAO.findByUser(ses.getUser()));
			} else {
				OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
				entity = officeMemoDAO.findByIdentefier(id);
			}

			EmployeeDAO empDao = new EmployeeDAO(ses);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = omd.getOutcome(entity);
			outcome.addPayload("employees", emps);
			outcome.addPayload(getActionBar(ses, entity, omd));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

			return Response.ok(outcome).build();
		} catch (DAOException | ApprovalException e) {
			return responseException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(OfficeMemo dto) {
		dto.setId(null);
		return saveRequest(dto);
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") String id, OfficeMemo dto) {
		dto.setId(UUID.fromString(id));
		return saveRequest(dto);
	}

	private Response saveRequest(OfficeMemo dto) {
		try {
			OfficeMemoDomain omd = new OfficeMemoDomain();
			Outcome outcome = omd.getOutcome(save(dto));

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	private OfficeMemo save(OfficeMemo dto) throws SecureException, DAOException, DTOException {
		_Session ses = getSession();

		EmployeeDAO empDao = new EmployeeDAO(ses);
		OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
		OfficeMemo entity;

		if (dto.isNew()) {
			entity = new OfficeMemo();
		} else {
			entity = officeMemoDAO.findById(dto.getId());
		}

		dto.setAppliedAuthor(empDao.findById(dto.getAppliedAuthor().getId()));
		dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

		OfficeMemoDomain omd = new OfficeMemoDomain();
		omd.fillFromDto(entity, dto, empDao.findByUser(ses.getUser()));
		omd.calculateReadersEditors(entity);

		if (dto.isNew()) {
			RegNum rn = new RegNum();
			entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
			entity = officeMemoDAO.add(entity, rn);
		} else {
			entity = officeMemoDAO.update(entity);
		}

		return entity;
	}

	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") String id) {
		_Session ses = getSession();
		try {
			OfficeMemoDAO dao = new OfficeMemoDAO(ses);
			OfficeMemo entity = dao.findByIdentefier(id);
			if (entity != null) {
				dao.delete(entity);
			}
			return Response.noContent().build();
		} catch (SecureException | DAOException e) {
			return responseException(e);
		}
	}

	@GET
	@Path("{id}/attachments/{attachId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		try {
			OfficeMemoDAO dao = new OfficeMemoDAO(getSession());
			OfficeMemo entity = dao.findByIdentefier(id);

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
	public Response startApproving(OfficeMemo dto) {
		try {
			OfficeMemo entity = save(dto);
			if (entity != null) {
				OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
				OfficeMemo om = officeMemoDAO.findById(dto.getId());
				OfficeMemoDomain omd = new OfficeMemoDomain();

				omd.startApproving(om);

				officeMemoDAO.update(om, false);

				new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
				Outcome outcome = omd.getOutcome(om);
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
	public Response acceptApprovalBlock(OfficeMemo dto) {
		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain();

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
	public Response declineApprovalBlock(OfficeMemo dto) {
		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain();

			String decisionComment = getWebFormData().getValueSilently("comment");
			if (!decisionComment.isEmpty()) {
				omd.declineApprovalBlock(om, getSession().getUser(), decisionComment);
			} else {
				return responseValidationError(new DTOException().addError("comment", "required", "field_is_empty"));

			}
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

	@POST
	@Path("action/skipApprovalBlock")
	public Response skipApprovalBlock(OfficeMemo dto) {
		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain();

			omd.skipApprovalBlock(om);

			officeMemoDAO.update(om, false);
			new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
			Outcome outcome = omd.getOutcome(om);
			outcome.setTitle("skipApprovalBlock");
			outcome.setMessage("skipApprovalBlock");

			return Response.ok(outcome).build();
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	private _ActionBar getActionBar(_Session session, OfficeMemo entity, OfficeMemoDomain omd) throws DAOException {
		_ActionBar actionBar = new _ActionBar(session);

		actionBar.addAction(action.close);
		if (entity.isEditable()) {
			actionBar.addAction(action.saveAndClose);
		}
		if (omd.approvalCanBeStarted(entity)) {
			actionBar.addAction(action.startApproving);
		}

		EmployeeDAO employeeDAO = new EmployeeDAO(getSession());

		if (omd.employeeCanDoDecisionApproval(entity, employeeDAO.findByUser(session.getUser()))) {
			if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
				actionBar.addAction(action.signApprovalBlock);
			} else {
				actionBar.addAction(action.acceptApprovalBlock);
			}
			actionBar.addAction(action.declineApprovalBlock);
			actionBar.addAction(action.skipApprovalBlock);
		}
		if (omd.canCreateAssignment(entity, (User) session.getUser())) {
			actionBar.addAction(new Action(_ActionType.LINK).caption("assignment")
					.url(AppConst.BASE_URL + "assignments/new?officememo=" + entity.getIdentifier()));
		}
		if (omd.documentCanBeDeleted(entity)) {
			actionBar.addAction(action.deleteDocument);
		}

		return actionBar;
	}
}
