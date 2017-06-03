package workflow.services;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.common.domain.IValidation;
import com.exponentus.common.service.EntityService;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
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
import workflow.dto.action.DeclineApprovalBlockAction;
import workflow.init.AppConst;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

@Path("office-memos")
@Produces(MediaType.APPLICATION_JSON)
public class OfficeMemoService extends EntityService<OfficeMemo, OfficeMemoDomain> {

	private ActionFactory action = new ActionFactory();

	@GET
	public Response getView() {
		_Session session = getSession();
		WebFormData params = getWebFormData();

		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(session);
			int pageSize = session.getPageSize();
			SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
			OfficeMemoFilter filter = new OfficeMemoFilter(params);
			ViewPage vp = officeMemoDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);

			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(action.newOfficeMemo);
			actionBar.addAction(action.refreshVew);

			Outcome outcome = new Outcome();
			outcome.setId("office-memo");
			outcome.setTitle("office_memo_plural");
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
		OfficeMemo entity;
		try {
			OfficeMemoDomain omd = new OfficeMemoDomain(ses);
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

	@Override
	public Response saveForm(OfficeMemo dto) {
		try {
			OfficeMemoDomain omd = new OfficeMemoDomain(getSession());
			OfficeMemo entity = omd.fillFromDto(dto, new ValidationToSaveAsDraft(), getWebFormData().getFormSesId());
			Outcome outcome = omd.getOutcome(omd.save(entity));
			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
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

	@POST
	@Path("action/startApproving")
	public Response startApproving(OfficeMemo dto) {
		_Session ses = getSession();
		try {
			OfficeMemoDomain domain = new OfficeMemoDomain(ses);
			OfficeMemo entity = domain.fillFromDto(dto, new ValidationToStartApprove(), getWebFormData().getFormSesId());
			domain.startApproving(entity);
			domain.save(entity);
			new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
			Outcome outcome = domain.getOutcome(entity);
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
			OfficeMemoDomain domain = new OfficeMemoDomain(ses);
			OfficeMemo entity = domain.getEntity(dto);
			domain.acceptApprovalBlock(entity, ses.getUser());
			domain.superUpdate(entity);

			Outcome outcome = domain.getOutcome(entity);
			if (entity.getStatus() == ApprovalStatusType.FINISHED) {
				if (entity.getResult() == ApprovalResultType.ACCEPTED) {
					new Messages(getAppEnv()).notifyOfAccepting(entity, entity.getTitle());
				}
			}
			new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
			outcome.setTitle("acceptApprovalBlock");
			outcome.setMessage("approval_block_accepted");

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	@POST
	@Path("action/declineApprovalBlock")
	public Response declineApprovalBlock(DeclineApprovalBlockAction<OfficeMemo> actionDto) {
		try {
			_Session ses = getSession();
			OfficeMemoDomain domain = new OfficeMemoDomain(ses);
			OfficeMemo entity = domain.getEntity(actionDto.getModel());
			domain.declineApprovalBlock(entity, ses.getUser(), actionDto.getComment());
			domain.superUpdate(entity);

			new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
			Outcome outcome = domain.getOutcome(entity);
			if (entity.getStatus() == ApprovalStatusType.FINISHED) {
				if (entity.getResult() == ApprovalResultType.REJECTED) {
					new Messages(getAppEnv()).notifyOfRejecting(entity, entity.getTitle());
				}
			}
			outcome.setTitle("declineApprovalBlock");
			outcome.setMessage("declineApprovalBlock");

			if (entity.getStatus() == ApprovalStatusType.FINISHED && entity.getResult() == ApprovalResultType.REJECTED) {
				if (entity.isVersionsSupport()) {
					entity = domain.backToRevise(entity);
					domain.superUpdate(entity);
				}
			}

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
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
