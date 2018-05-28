package workflow.services;

import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.ActionPayload;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.actions.constants.ActionType;
import com.exponentus.common.ui.lifecycle.LifeCycle;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.dao.filter.AssignmentFilter;
import workflow.domain.AssignmentDomain;
import workflow.domain.ReportDomain;
import workflow.init.ModuleConst;
import workflow.model.ActionableDocument;
import workflow.model.Assignment;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.ui.ActionFactory;
import workflow.ui.ViewOptions;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("assignments")
@Produces(MediaType.APPLICATION_JSON)
public class AssignmentService extends EntityService<Assignment, AssignmentDomain> {

    @GET
    @Path("my")
    public Response getMyAssignments() {
        return getViewPage("_my");
    }

    @GET
    @Path("inbox")
    public Response getAssignmentsInbox() {
        return getViewPage("_inbox");
    }

    @GET
    public Response getViewPage() {
        return getViewPage("_all");
    }

    public Response getViewPage(String slug) {
        _Session session = getSession();
        int pageSize = session.getPageSize();
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
        AssignmentFilter filter = new AssignmentFilter(getWebFormData());

        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            Employee currentUserEmp = employeeDAO.findByUser(session.getUser());
            boolean showAssigneeList = false;

            switch (slug) {
                case "_my":
                    filter.setAppliedAuthor(currentUserEmp);
                    showAssigneeList = true;
                    break;
                case "_inbox":
                    filter.setAssignee(currentUserEmp);
                    break;
            }

            AssignmentDAO assignmentDAO = new AssignmentDAO(session);
            ViewPage vp = assignmentDAO.findViewPage(filter, sortParams, getWebFormData().getPage(), pageSize, showAssigneeList);
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getAssignmentViewOptions());
            vp.setFilter(viewOptions.getAssignmentFilter(session));

            ActionFactory action = new ActionFactory();
            ActionBar actionBar = new ActionBar(session);
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
            IUser user = ses.getUser();
            Employee currentUserEmployee = employeeDAO.findByUserId(user.getId());
            AssignmentDAO assignmentDAO = new AssignmentDAO(ses);
            Assignment entity;
            AssignmentDomain ad = new AssignmentDomain(ses);
            boolean isNew = "new".equals(id);

            if (isNew) {
                String incomingId = getWebFormData().getAnyValueSilently("incoming");
                String officeMemoId = getWebFormData().getAnyValueSilently("officememo");
                String assignmentId = getWebFormData().getAnyValueSilently("assignment");

                ActionableDocument primary = null;
                Assignment parent = null;

                if (!incomingId.isEmpty()) {
                    primary = (new IncomingDAO(ses)).findById(incomingId);
                } else if (!officeMemoId.isEmpty()) {
                    primary = new OfficeMemoDAO(ses).findById(officeMemoId);
                } else if (!assignmentId.isEmpty()) {
                    parent = assignmentDAO.findById(assignmentId);
                    // primary = parent.getPrimary();
                } else {
                    throw new IllegalArgumentException("No parent document");
                }

                entity = ad.composeNew(currentUserEmployee, primary, parent);
            } else {
                entity = assignmentDAO.findById(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            // permissions
            Map<String, Boolean> permissions = new HashMap<>();
            if (!entity.isNew() && entity.getAppliedAuthor().getId().equals(currentUserEmployee.getId())) {
                permissions.put("RESET_ASSIGNEE", true);
            }

            Outcome outcome = ad.getOutcome(entity);
            outcome.setFSID(getWebFormData().getFormSesId());
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload("employees", emps);
            outcome.addPayload("permissions", permissions);
            if (!isNew) {
                outcome.addPayload(new LifeCycle(user, entity));
            }

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Assignment dto) {
        try {
            AssignmentDomain domain = new AssignmentDomain(getSession());
            Assignment entity = domain.fillFromDto(dto, new Validation(), getWebFormData().getFormSesId());
            domain.save(entity);
            return Response.ok(domain.getOutcome(entity)).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("startImplementation")
    public Response startImplementation(ActionPayload<Assignment, Object> action) {
        try {
            _Session ses = getSession();
            AssignmentDomain domain = new AssignmentDomain(ses);
            Assignment entity = domain.fillFromDto(action.getTarget(), new ValidationToStartImpl(), getWebFormData().getFormSesId());
            domain.startAssignee(entity);
            domain.superUpdate(entity);
            domain.addReadersUp(entity);
            domain.addReadersToPrimary(entity);

            Outcome outcome = new Outcome();
            outcome.addMessage("assignment_was_started_to_impl");

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("completeAssignee")
    public Response resetAssignee(ActionPayload<Assignment, Object> action) {
        try {
            _Session ses = getSession();
            AssignmentDomain domain = new AssignmentDomain(ses);

            Assignment entity = domain.completeAssignee(action.getTarget(), new EmployeeDAO(ses).findByUserId(ses.getUser().getId()));
            domain.superUpdate(entity);

            if (entity.getStatus() == ControlStatusType.COMPLETED) {
                ReportDomain reportDomain = new ReportDomain(ses);
                reportDomain.resetEditors(entity.getReports());
            }

            return Response.ok(new Outcome()).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        } catch (DTOException e) {
            return responseValidationError(e);
        }
    }

    @POST
    @Path("completeEntireAssignment")
    public Response completeAssignee(ActionPayload<Assignment, Object> action) {
        try {
            _Session ses = getSession();
            AssignmentDomain domain = new AssignmentDomain(ses);

            Assignment entity = domain.completeEntireAssignment(action.getTarget(), new EmployeeDAO(ses).findByUserId(ses.getUser().getId()));
            domain.superUpdate(entity);

            return Response.ok(new Outcome()).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private ActionBar getActionBar(_Session session, Assignment entity) {
        ActionBar actionBar = new ActionBar(session);
        ActionFactory action = new ActionFactory();

        actionBar.addAction(action.close);
        if (entity.isNew() || entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }
        if (entity.getStatus() == ControlStatusType.DRAFT && entity.getAppliedAuthor().getUserID().equals(session.getUser().getId())) {
            actionBar.addAction(new Action().id("startImplementation").caption("start_impl").url(ModuleConst.BASE_URL + "api/assignments/startImplementation"));
        }

        if (!entity.isNew() && entity.getStatus() != ControlStatusType.DRAFT) {
            actionBar.addAction(new Action(ActionType.LINK).caption("new_sub_assignment")
                    .url(ModuleConst.BASE_URL + "assignments/new?assignment=" + entity.getIdentifier()));
        }

        if (entity.getStatus() == ControlStatusType.PROCESSING && entity.assigneesContainsUser(session.getUser())) {
            actionBar.addAction(new Action(ActionType.LINK).caption("report")
                    .url(ModuleConst.BASE_URL + "reports/new?assignment=" + entity.getIdentifier()));
        }

        if (!entity.isNew() && entity.getStatus() != ControlStatusType.COMPLETED && entity.getAppliedAuthor().getUserID().equals(session.getUser().getId())) {
            actionBar.addAction(new Action().caption("complete").confirm().url(ModuleConst.BASE_URL + "api/assignments/completeEntireAssignment"));
        }

        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        return actionBar;
    }

    private class ValidationToStartImpl extends Validation {

        @Override
        public void check(Assignment dto) throws DTOException {
            super.check(dto);
            DTOException e = new DTOException();

            List<AssigneeEntry> entries = dto.getAssigneeEntries();
            if (entries.size() == 0) {
                e.addError("assigneeEntries", "required", "field_is_empty");
            }

            if (e.hasError()) {
                throw e;
            }
        }
    }

    private class Validation implements IValidation<Assignment> {

        @Override
        public void check(Assignment assignment) throws DTOException {
            DTOException ve = new DTOException();

            if (assignment.getBody() == null || assignment.getBody().isEmpty()) {
                ve.addError("body", "required", "field_is_empty");
            } else if (assignment.getBody().length() > 5000) {
                ve.addError("body", "maxlen:5000", "field_is_too_long");
            }

            if (assignment.getControlType() == null) {
                ve.addError("controlType", "required", "field_is_empty");
            }
            if (assignment.getStartDate() == null) {
                ve.addError("startDate", "required", "field_is_empty");
            }
            if (assignment.getDueDate() == null) {
                ve.addError("dueDate", "required", "field_is_empty");
            }
            if (assignment.getParent() == null && assignment.getPrimary() == null) {
                ve.addError("parent", "required", "it_should_pointed_either_assignment_or_primary");
            }

            if (ve.hasError()) {
                throw ve;
            }
        }
    }
}
