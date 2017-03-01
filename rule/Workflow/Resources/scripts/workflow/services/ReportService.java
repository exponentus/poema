package workflow.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.ReportDAO;
import workflow.domain.impl.ReportDomain;
import workflow.model.Report;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("reports")
public class ReportService extends RestProvider {

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            Report entity;
            ReportDomain reportDomain;

            boolean isNew = "new".equals(id);
            if (isNew) {
                EmployeeDAO employeeDAO = new EmployeeDAO(ses);
                AssignmentDAO aDAO = new AssignmentDAO(ses);
                String assignmentId = getWebFormData().getValue("assignment");

                entity = new Report();
                reportDomain = new ReportDomain(entity);
                reportDomain.composeNew(employeeDAO.findByUser(ses.getUser()), aDAO.findById(assignmentId));
            } else {
                ReportDAO reportDAO = new ReportDAO(ses);
                entity = reportDAO.findById(id);
                reportDomain = new ReportDomain(entity);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = reportDomain.getOutcome();
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Report dto) {
        _Validation validation = validate(dto);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        _Session ses = getSession();
        Report entity;
        ReportDomain reportDomain;

        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(ses);
            ReportDAO reportDAO = new ReportDAO(ses);
            boolean isNew = "new".equals(id);

            if (isNew) {
                entity = new Report();
            } else {
                entity = reportDAO.findById(id);
            }

            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            reportDomain = new ReportDomain(entity);
            reportDomain.fillFromDto(employeeDAO.findByUser(ses.getUser()), dto);

            if (isNew) {
                IUser<Long> user = ses.getUser();
                entity = reportDAO.add(entity);
            } else {
                entity = reportDAO.update(entity);
            }

            return Response.ok(reportDomain.getOutcome()).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            ReportDAO dao = new ReportDAO(ses);
            Report entity = dao.findById(id);
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
            ReportDAO dao = new ReportDAO(getSession());
            Report entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Report entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        // actionBar.addAction(new _Action("sign", "", "sign"));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private _Validation validate(Report entity) {
        _Validation ve = new _Validation();

        if (entity.getTitle() == null || entity.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }

        return ve;
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping());
        sd.addMethod(m);
        return sd;
    }
}
