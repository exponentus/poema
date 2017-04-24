package workflow.services;

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
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.constants.Action;
import workflow.dao.AssignmentDAO;
import workflow.dao.ControlledDocumentDAO;
import workflow.dao.IncomingDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.domain.impl.AssignmentDomain;
import workflow.init.AppConst;
import workflow.model.Assignment;
import workflow.model.ControlledDocument;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;
import workflow.other.Messages;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

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
                    // entity.addReader(observer.getEmployee().getUserID());
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
        } catch (_Validation.VException e) {
            return responseValidationError(e.getValidation());
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

    @POST
    @Path("action/resetAssignee")
    public Response resetAssignee(Assignment dto) {
        try {
            _Session ses = getSession();
            AssignmentDAO dao = new AssignmentDAO(ses);
            Assignment entity = dao.findById(dto.getId());
            AssignmentDomain domain = new AssignmentDomain();

            domain.resetAssignee(entity, dto, new EmployeeDAO(ses).findByUserId(ses.getUser().getId()));

            dao.update(entity);

            return Response.ok(new Outcome()).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Assignment entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(Action.close);
        if (entity.isNew() || entity.isEditable()) {
            actionBar.addAction(Action.saveAndClose);
        }
        if (!entity.isNew() && entity.getControl().getStatus() != ControlStatusType.DRAFT) {
            actionBar.addAction(new _Action(_ActionType.LINK).caption("assignment")
                    .url(AppConst.BASE_URL + "assignments/new?assignment=" + entity.getIdentifier()));
        }
        if (entity.getControl().assigneesContainsUser(session.getUser())) {
            actionBar.addAction(new _Action(_ActionType.LINK).caption("report")
                    .url(AppConst.BASE_URL + "reports/new?assignment=" + entity.getIdentifier()));
        }
        // actionBar.addAction(new
        // _Action(_ActionType.API_ACTION).id("resetAssignee").caption("reset_assignee").url("resetAssignee"));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(Action.deleteDocument);
        }

        return actionBar;
    }

    private void validate(Assignment assignment) throws _Validation.VException {
        _Validation ve = new _Validation();

        if (assignment.getTitle() == null || assignment.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }

        if (assignment.getControl().getControlType() == null) {
            ve.addError("control.controlType", "required", "field_is_empty");
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
