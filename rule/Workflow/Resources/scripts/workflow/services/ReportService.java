package workflow.services;

import com.exponentus.common.domain.IValidation;
import com.exponentus.common.service.EntityService;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.ReportDAO;
import workflow.domain.ReportDomain;
import workflow.model.Assignment;
import workflow.model.Report;
import workflow.model.constants.ControlStatusType;
import workflow.ui.ActionFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("reports")
@Produces(MediaType.APPLICATION_JSON)
public class ReportService extends EntityService<Report, ReportDomain> {

    private final Action acceptReport = new Action(ActionType.API_ACTION).id("acceptReport").caption("accept").url("acceptReport");
    private final Action declineReport = new Action(ActionType.API_ACTION).id("declineReport").caption("decline").url("declineReport");

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            Report entity;
            ReportDomain reportDomain = new ReportDomain(ses);

            boolean isNew = "new".equals(id);
            if (isNew) {
                EmployeeDAO employeeDAO = new EmployeeDAO(ses);
                AssignmentDAO aDAO = new AssignmentDAO(ses);
                String assignmentId = getWebFormData().getValueSilently("assignment");

                entity = reportDomain.composeNew(employeeDAO.findByUser(ses.getUser()), aDAO.findByIdentefier(assignmentId));
            } else {
                ReportDAO reportDAO = new ReportDAO(ses);
                entity = reportDAO.findByIdentefier(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = reportDomain.getOutcome(entity);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Report dto) {
        try {
            ReportDomain domain = new ReportDomain(getSession());
            Report entity = domain.fillFromDto(dto, new Validation(), getWebFormData().getFormSesId());
            Outcome outcome = domain.getOutcome(domain.save(entity));

            domain.checkAssignment(entity);

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/acceptReport")
    public Response acceptReport(Report dto) {
        try {
            _Session ses = getSession();
            ReportDomain domain = new ReportDomain(ses);
            Assignment assignment = domain.acceptReport(dto);
            if (assignment.getStatus() == ControlStatusType.COMPLETED) {
                domain.resetEditors(domain.getEntity(dto.getId()));
            }
            return Response.ok(new Outcome()).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/declineReport")
    public Response declineReport(Report dto) {
        try {
            _Session ses = getSession();
            ReportDomain domain = new ReportDomain(ses);
            domain.declineReport(dto);

            return Response.ok(new Outcome()).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Report entity){
        _ActionBar actionBar = new _ActionBar(session);
        ActionFactory action = new ActionFactory();
        actionBar.addAction(action.close);
        actionBar.addAction(action.saveAndClose);
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        Assignment assignment = entity.getParent();
        if(entity.getId() != null  && entity.getSolution() != null &&
                (assignment.getAppliedAuthor().getUser().equals(session.getUser()) || assignment.getAuthor().equals(session.getUser()))) {
            actionBar.addAction(acceptReport);
            actionBar.addAction(declineReport);
        }

        return actionBar;

    }

    private class Validation implements IValidation<Report> {

        @Override
        public void check(Report assignment) throws DTOException {
            DTOException ve = new DTOException();

            if (assignment.getTitle() == null || assignment.getTitle().isEmpty()) {
                ve.addError("title", "required", "field_is_empty");
            }

            if (ve.hasError()) {
                throw ve;
            }
        }
    }
}
