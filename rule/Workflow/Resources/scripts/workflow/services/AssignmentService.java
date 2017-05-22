package workflow.services;

import java.util.HashMap;
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
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.user.SuperUser;

import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.AssignmentDAO;
import workflow.dao.ControlledDocumentDAO;
import workflow.dao.IncomingDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.dao.filter.AssignmentFilter;
import workflow.domain.AssignmentDomain;
import workflow.init.AppConst;
import workflow.model.Assignment;
import workflow.model.ControlledDocument;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

@Path("assignments")
@Produces(MediaType.APPLICATION_JSON)
public class AssignmentService extends RestProvider {

	private ActionFactory action = new ActionFactory();

	@GET
	@Path("my")
	public Response getMyAssignments() {
		return getView("_my");
	}

	@GET
	@Path("inbox")
	public Response getAssignmentsInbox() {
		return getView("_inbox");
	}

	@GET
	public Response getAll() {
		return getView("_all");
	}

	public Response getView(String slug) {
		_Session session = getSession();
		int pageSize = session.getPageSize();
		SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
		AssignmentFilter filter = new AssignmentFilter(getWebFormData());

		try {
			EmployeeDAO employeeDAO = new EmployeeDAO(session);
			Employee currentUserEmp = employeeDAO.findByUser(session.getUser());

			switch (slug) {
			case "_my":
				filter.setAppliedAuthor(currentUserEmp);
				break;
			case "_inbox":
				filter.setAssignee(currentUserEmp);
				break;
			}

			AssignmentDAO assignmentDAO = new AssignmentDAO(session);
			ViewPage vp = assignmentDAO.findViewPage(filter, sortParams, getWebFormData().getPage(), pageSize);

			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(action.refreshVew);

			Outcome outcome = new Outcome();
			outcome.setId("assignments");
			outcome.setTitle("assignments" + slug);
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
		try {
			_Session ses = getSession();
			EmployeeDAO employeeDAO = new EmployeeDAO(ses);
			Employee currentUserEmployee = employeeDAO.findByUserId(ses.getUser().getId());
			AssignmentDAO assignmentDAO = new AssignmentDAO(ses);
			Assignment entity;
			AssignmentDomain ad = new AssignmentDomain(ses);
			boolean isNew = "new".equals(id);

			if (isNew) {
				String incomingId = getWebFormData().getAnyValueSilently("incoming");
				String officeMemoId = getWebFormData().getAnyValueSilently("officememo");
				String assignmentId = getWebFormData().getAnyValueSilently("assignment");

				ControlledDocument parent = null;

				if (!incomingId.isEmpty()) {
					parent = (new IncomingDAO(ses)).findByIdentefier(incomingId);
				} else if (!officeMemoId.isEmpty()) {
					parent = new OfficeMemoDAO(ses).findByIdentefier(officeMemoId);
				} else if (!assignmentId.isEmpty()) {
					parent = assignmentDAO.findByIdentefier(assignmentId);
				} else {
					throw new IllegalArgumentException("No parent document");
				}

				entity = ad.composeNew(currentUserEmployee, parent);
			} else {
				entity = assignmentDAO.findByIdentefier(id);
			}

			EmployeeDAO empDao = new EmployeeDAO(ses);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = ad.getOutcome(entity);

			// permissions
			Map<String, Boolean> permissions = new HashMap<>();
			if (!entity.isNew() && entity.getAppliedAuthor().getId().equals(currentUserEmployee.getId())) {
				permissions.put("RESET_ASSIGNEE", true);
			}

			outcome.addPayload("employees", emps);
			outcome.addPayload("permissions", permissions);
			outcome.addPayload(getActionBar(ses, entity));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

			return Response.ok(outcome).build();
		} catch (Exception e) {
			return responseException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Assignment dto) {
		dto.setId(null);
		return saveRequest(dto);
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") String id, Assignment dto) {
		dto.setId(UUID.fromString(id));
		return saveRequest(dto);
	}

	private Response saveRequest(Assignment dto) {
		try {
			AssignmentDomain domain = new AssignmentDomain(getSession());
			Outcome outcome = domain.getOutcome(save(dto, new Validation()));

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	private Assignment save(Assignment dto, IValidation<Assignment> validation)
			throws SecureException, DAOException, DTOException {
		_Session ses = getSession();

		AssignmentDAO dao = new AssignmentDAO(ses);
		Assignment entity;

		if (dto.isNew()) {
			entity = new Assignment();
		} else {
			entity = dao.findById(dto.getId());
		}

		new AssignmentDomain(ses).fillFromDto(entity, dto, validation, getWebFormData().getFormSesId());

		return dao.save(entity);
	}

	public Response save(Assignment dto) {
		_Session ses = getSession();
		Assignment entity;
		AssignmentDomain domain = new AssignmentDomain(ses);

		try {
			EmployeeDAO employeeDAO = new EmployeeDAO(ses);
			AssignmentDAO assignmentDAO = new AssignmentDAO(ses);

			if (dto.isNew()) {
				entity = new Assignment();
			} else {
				entity = assignmentDAO.findById(dto.getId());
			}

			dto.setAppliedAuthor(employeeDAO.findById(dto.getAppliedAuthor().getId()));
			dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

			domain.fillFromDto(entity, dto, ses);

			// ACL routines
			entity.resetReadersEditors();

			Control control = entity.getControl();
			if (control.getAssigneeEntries().size() > 0) {
				control.setStatus(ControlStatusType.PROCESSING);
			}

			for (AssigneeEntry ae : control.getAssigneeEntries()) {
				entity.addReader(employeeDAO.findById(ae.getAssignee().getId()).getUserID());
			}

			List<Observer> observers = entity.getObservers();
			if (observers != null) {
				for (Observer observer : observers) {
					entity.addReader(observer.getEmployee().getUserID());
				}
			}

			ControlledDocumentDAO<ControlledDocument, UUID> dao = new ControlledDocumentDAO<ControlledDocument, UUID>(
					ControlledDocument.class, new _Session(new SuperUser()));
			ControlledDocument parent = dao.findById(entity.getParent().getId());
			entity.addReaders(parent.getReaders());

			if (control.getStatus() == ControlStatusType.DRAFT) {
				entity.addReaderEditor(entity.getAuthor());
				if (entity.getAppliedAuthor() != null) {
					entity.addReaderEditor(entity.getAppliedAuthor().getUser());
				}
				entity = assignmentDAO.save(entity);
			} else {
				entity.addReader(entity.getAuthor());
				if (entity.getAppliedAuthor() != null) {
					entity.addReader(entity.getAppliedAuthor().getUser());
				}
				entity = new AssignmentDAO(new _Session(new SuperUser())).save(entity);
			}

			parent.resetEditors();
			dao.update(parent);

			new Messages(getAppEnv()).notifyAssignees(entity);

			return Response.ok(domain.getOutcome(entity)).build();
		} catch (SecureException | DAOException e) {
			return responseException(e);
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (Exception e) {
			return responseException(e);
		}
	}

	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") String id) {
		try {
			_Session ses = getSession();
			AssignmentDAO dao = new AssignmentDAO(ses);
			Assignment entity = dao.findByIdentefier(id);
			if (entity != null) {
				dao.delete(entity);
			}
			return Response.noContent().build();
		} catch (SecureException | DAOException e) {
			return responseException(e);
		}
	}

	@POST
	@Path("action/resetAssignee")
	public Response resetAssignee(Assignment dto) {
		try {
			_Session ses = getSession();
			AssignmentDAO dao = new AssignmentDAO(ses);
			Assignment entity = dao.findById(dto.getId());
			AssignmentDomain domain = new AssignmentDomain(ses);

			domain.resetAssignee(entity, dto, new EmployeeDAO(ses).findByUserId(ses.getUser().getId()));

			dao.update(entity, false);

			return Response.ok(new Outcome()).build();
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	private _ActionBar getActionBar(_Session session, Assignment entity) {
		_ActionBar actionBar = new _ActionBar(session);

		actionBar.addAction(action.close);
		if (entity.isNew() || entity.isEditable()) {
			actionBar.addAction(action.saveAndClose);
		}
		if (!entity.isNew() && entity.getControl().getStatus() != ControlStatusType.DRAFT) {
			actionBar.addAction(new Action(ActionType.LINK).caption("assignment")
					.url(AppConst.BASE_URL + "assignments/new?assignment=" + entity.getIdentifier()));
		}
		if (entity.getControl().assigneesContainsUser(session.getUser())) {
			actionBar.addAction(new Action(ActionType.LINK).caption("report")
					.url(AppConst.BASE_URL + "reports/new?assignment=" + entity.getIdentifier()));
		}
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(action.deleteDocument);
		}

		return actionBar;
	}

	private class Validation implements IValidation<Assignment> {

		@Override
		public void check(Assignment assignment) throws DTOException {
			DTOException ve = new DTOException();

			if (assignment.getTitle() == null || assignment.getTitle().isEmpty()) {
				ve.addError("title", "required", "field_is_empty");
			}

			Control control = assignment.getControl();
			if (control != null) {
				if (control.getControlType() == null) {
					ve.addError("control.controlType", "required", "field_is_empty");
				}
				if (assignment.getControl().getStartDate() == null) {
					ve.addError("control.startDate", "required", "field_is_empty");
				}
				if (assignment.getControl().getDueDate() == null) {
					ve.addError("control.dueDate", "required", "field_is_empty");
				}
			} else {
				ve.addError("control", "required", "field_is_empty");
			}

			if (ve.hasError()) {
				throw ve;
			}

		}

	}
}
