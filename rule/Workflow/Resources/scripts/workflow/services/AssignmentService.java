package workflow.services;

import java.util.Date;
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
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.SuperUser;

import administrator.model.User;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.ControlledDocumentDAO;
import workflow.dao.IncomingDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.domain.impl.AssignmentDomain;
import workflow.model.Assignment;
import workflow.model.ControlledDocument;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;

@Path("assignments")
public class AssignmentService extends RestProvider {

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id) {
		try {
			_Session ses = getSession();
			EmployeeDAO employeeDAO = new EmployeeDAO(ses);
			Employee employee = employeeDAO.findByUserId(ses.getUser().getId());
			AssignmentDAO assignmentDAO = new AssignmentDAO(ses);
			Assignment entity;
			AssignmentDomain ad = new AssignmentDomain();
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

				entity = ad.composeNew(employee, parent);
			} else {
				entity = assignmentDAO.findByIdentefier(id);
			}

			EmployeeDAO empDao = new EmployeeDAO(ses);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = ad.getOutcome(entity);
			outcome.addPayload("employees", emps);
			outcome.addPayload(getActionBar(ses, entity));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

			return Response.ok(outcome).build();
		} catch (Exception e) {
			return responseException(e);
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Assignment dto) {
		dto.setId(null);
		return save(dto);
	}

	@PUT
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") String id, Assignment dto) {
		dto.setId(UUID.fromString(id));
		return save(dto);
	}

	public Response save(Assignment dto) {
		_Session ses = getSession();
		Assignment entity;
		AssignmentDomain domain = new AssignmentDomain();

		try {
			validate(dto);

			EmployeeDAO employeeDAO = new EmployeeDAO(ses);
			Employee employee = employeeDAO.findByUserId(ses.getUser().getId());
			AssignmentDAO assignmentDAO = new AssignmentDAO(ses);

			if (dto.isNew()) {
				entity = new Assignment();
			} else {
				entity = assignmentDAO.findById(dto.getId());
			}

			dto.setAppliedAuthor(employeeDAO.findById(dto.getAppliedAuthor().getId()));
			dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

			domain.fillFromDto(entity, dto, employee);

			// ACL routines
			entity.resetReadersEditors();
			entity.addReaderEditor(entity.getAuthor());
			if (dto.getAppliedAuthor() != null) {
				entity.addReaderEditor(dto.getAppliedAuthor().getUser());
			}

			for (AssigneeEntry ae : dto.getControl().getAssigneeEntries()) {
				entity.addReader(employeeDAO.findById(ae.getAssignee().getId()).getUserID());
			}

			List<User> observers = dto.getObservers();
			if (observers != null) {
				for (User observer : dto.getObservers()) {
					entity.addReader(observer);
				}
			}

			entity = assignmentDAO.save(entity);

			ControlledDocumentDAO dao = new ControlledDocumentDAO(new _Session(new SuperUser()));
			ControlledDocument parent = dao.findById(entity.getParent().getId());
			parent.resetEditors();
			dao.update(parent);

			return Response.ok(domain.getOutcome(entity)).build();
		} catch (SecureException | DAOException e) {
			return responseException(e);
		} catch (_Validation.VException e) {
			return responseValidationError(e.getValidation());
		}
	}

	@POST
	@Path("action/resetAssignee")
	public Response resetAssignee(Assignment dto) {
		try {
			_Session ses = getSession();
			AssignmentDAO dao = new AssignmentDAO(ses);
			Assignment entity = dao.findById(dto.getId());
			Control control = entity.getControl();
			List<AssigneeEntry> assigneeEntities = control.getAssigneeEntries();
			Control dtoControl = dto.getControl();
			List<AssigneeEntry> dtoAssigneeEntities = dtoControl.getAssigneeEntries();
			for (AssigneeEntry dtoEntry : dtoAssigneeEntities) {
				for (AssigneeEntry entry : assigneeEntities) {
					if (dtoEntry.getAssignee().equals(entry.getAssignee())) {
						entry.setResetBy(new EmployeeDAO(ses).findByUserId(ses.getUser().getId()));
						entry.setResetTime(new Date());
					}
				}
			}

			int completedAsignee = 0;
			for (AssigneeEntry entry : assigneeEntities) {
				if (entry.getResetTime() != null) {
					completedAsignee++;
				}
			}

			if (completedAsignee == assigneeEntities.size()) {
				control.setStatus(ControlStatusType.COMPLETED);
			}

			dao.update(entity);

			return Response.ok(new Outcome()).build();
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
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

	@GET
	@Path("{id}/attachments/{attachId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		try {
			AssignmentDAO dao = new AssignmentDAO(getSession());
			Assignment entity = dao.findByIdentefier(id);

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

	private _ActionBar getActionBar(_Session session, Assignment entity) {
		_ActionBar actionBar = new _ActionBar(session);

		actionBar.addAction(new _Action("close", "", "close", "fa fa-chevron-left", "btn-back"));
		if (entity.isNew() || entity.isEditable()) {
			actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
		}
		if (!entity.isNew()) {
			actionBar.addAction(new _Action("assignment", "", "new_assignment"));
		}
		if (entity.getControl().assigneesContainsUser(session.getUser())) {
			actionBar.addAction(new _Action("report", "", "new_report", "", ""));
		}
		// actionBar.addAction(new _Action("sign", "", "sign"));
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
		}

		return actionBar;
	}

	private void validate(Assignment assignment) throws _Validation.VException {
		_Validation ve = new _Validation();

		if (assignment.getTitle() == null || assignment.getTitle().isEmpty()) {
			ve.addError("title", "required", "field_is_empty");
		}

		if (assignment.getControl().getStartDate() == null) {
			ve.addError("control.startDate", "required", "field_is_empty");
		}

		if (assignment.getControl().getDueDate() == null) {
			ve.addError("control.dueDate", "required", "field_is_empty");
		}

		/*
		 * if (assignment.getControl().getAssigneeEntries() == null ||
		 * assignment.getControl().getAssigneeEntries().isEmpty()) {
		 * ve.addError("control.assigneeEntries", "required", "field_is_empty");
		 * }
		 */

		ve.assertValid();
	}
}
