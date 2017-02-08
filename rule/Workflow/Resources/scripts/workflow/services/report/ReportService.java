package workflow.services.report;

import com.exponentus.common.model.ACL;
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
import workflow.model.Report;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("reports")
public class ReportService extends RestProvider {

    private Outcome outcome = new Outcome();

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            Report entity;

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Report();
                AssignmentDAO assignmentDAO = new AssignmentDAO(ses);
                entity.setParent(assignmentDAO.findById(getWebFormData().getValue("assignment")));
                entity.setAppliedAuthor(ses.getUser().getId());
                entity.setAppliedRegDate(new Date());
            } else {
                ReportDAO reportDAO = new ReportDAO(ses);
                entity = reportDAO.findById(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            outcome.setId(id);
            outcome.addPayload(entity);
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload("assignment", entity.getParent());
            if (!isNew) {
                outcome.addPayload(new ACL(entity));
            }

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Report reportForm) {
        _Validation validation = validate(reportForm);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        _Session ses = getSession();
        Report entity;
        try {
            ReportDAO reportDAO = new ReportDAO(ses);

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Report();
                entity.setParent(reportForm.getParent());
            } else {
                entity = reportDAO.findById(id);
            }

            //
            entity.setParent(reportForm.getParent());
            entity.setTitle(reportForm.getTitle());
            entity.setBody(reportForm.getBody());
            entity.setAppliedAuthor(reportForm.getAppliedAuthor());
            entity.setAppliedRegDate(reportForm.getAppliedRegDate());
            entity.setAttachments(getActualAttachments(entity.getAttachments(), reportForm.getAttachments()));

            if (isNew) {
                IUser<Long> user = ses.getUser();
                entity.addReaderEditor(user);
                entity = reportDAO.add(entity);
            } else {
                entity = reportDAO.update(entity);
            }

            outcome.setId(id);
            outcome.setTitle(entity.getTitle());
            outcome.addPayload(entity);

            return Response.ok(outcome).build();
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

    /*
     * Get entity attachment or _thumbnail
     */
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

    /*
     *
     */
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
