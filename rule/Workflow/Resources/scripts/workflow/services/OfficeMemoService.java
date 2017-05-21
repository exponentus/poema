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

import com.exponentus.common.domain.IValidation;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;

import administrator.model.User;
import reference.model.constants.ApprovalType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.OfficeMemoDAO;
import workflow.dao.filter.OfficeMemoFilter;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.OfficeMemoDomain;
import workflow.domain.exception.ApprovalException;
import workflow.init.AppConst;
import workflow.model.OfficeMemo;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

@Path("office-memos")
@Produces(MediaType.APPLICATION_JSON)
public class OfficeMemoService extends RestProvider {

	private ActionFactory action = new ActionFactory();

	@GET
	public Response getView() {
		_Session session = getSession();
		int pageSize = session.getPageSize();
		SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
		OfficeMemoFilter filter = new OfficeMemoFilter(getWebFormData());

		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(session);
			ViewPage<OfficeMemo> vp = officeMemoDAO.findViewPage(filter, sortParams, getWebFormData().getPage(),
					pageSize);

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
		OfficeMemoDomain omd = new OfficeMemoDomain(ses);
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
			OfficeMemoDomain omd = new OfficeMemoDomain(getSession());
			Outcome outcome = omd.getOutcome(save(dto, new ValidationToSaveAsDraft()));

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	private OfficeMemo save(OfficeMemo dto, IValidation<OfficeMemo> validation)
			throws SecureException, DAOException, DTOException {
		_Session ses = getSession();

		OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
		OfficeMemo entity;

		if (dto.isNew()) {
			entity = new OfficeMemo();
		} else {
			entity = officeMemoDAO.findById(dto.getId());
		}

		new OfficeMemoDomain(getSession()).fillFromDto(entity, dto, validation, getWebFormData().getFormSesId());

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

	@Override
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

		OfficeMemo om = null;
		_Session ses = getSession();
		try {
			UUID id = dto.getId();
			if (dto.isNew()) {
				id = save(dto, new ValidationToStartApprove()).getId();
			}
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
			om = officeMemoDAO.findById(id);
			OfficeMemoDomain omd = new OfficeMemoDomain(ses);
			omd.startApproving(om);
			officeMemoDAO.update(om, false);

			new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
			Outcome outcome = omd.getOutcome(om);
			outcome.setTitle("approving_started");
			outcome.setMessage("approving_started");
			outcome.addPayload("result", "approving_started");

			return Response.ok(outcome).build();

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
			_Session ses = getSession();
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain(ses);

			omd.acceptApprovalBlock(om, ses.getUser());

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
			_Session ses = getSession();
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain(ses);

			String decisionComment = getWebFormData().getValueSilently("comment");
			omd.declineApprovalBlock(om, ses.getUser(), decisionComment);

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
		}
		if (omd.canCreateAssignment(entity, (User) session.getUser())) {
			actionBar.addAction(new Action(ActionType.LINK).caption("assignment")
					.url(AppConst.BASE_URL + "assignments/new?officememo=" + entity.getIdentifier()));
		}
		if (omd.documentCanBeDeleted(entity)) {
			actionBar.addAction(action.deleteDocument);
		}

		return actionBar;
	}

	private class ValidationToSaveAsDraft implements IValidation<OfficeMemo> {

		@Override
		public void check(OfficeMemo om) throws DTOException {
			DTOException e = new DTOException();

			if (om.getTitle() == null || om.getTitle().isEmpty()) {
				e.addError("title", "required", "field_is_empty");
			}
			if (om.getAppliedAuthor() == null) {
				e.addError("appliedAuthor", "required", "field_is_empty");
			}
			if (om.getRecipient() == null) {
				e.addError("recipient", "required", "field_is_empty");
			}
			if (e.hasError()) {
				throw e;
			}

		}

	}

	private class ValidationToStartApprove extends ValidationToSaveAsDraft {

		@Override
		public void check(OfficeMemo om) throws DTOException {
			super.check(om);
			DTOException e = new DTOException();

			List<Block> blocks = om.getBlocks();
			if (blocks.size() == 0) {
				e.addError("blocks", "required", "field_is_empty");
			} else {
				List<Approver> approvers = blocks.get(0).getApprovers();
				if (approvers == null || approvers.size() == 0) {
					e.addError("approvers", "required", "field_is_empty");
				}
			}

			if (e.hasError()) {
				throw e;
			}

		}

	}

}
