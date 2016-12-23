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
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.OrganizationDAO;
import workflow.dao.OutgoingDAO;
import workflow.dao.ReportDAO;
import workflow.model.Report;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("reports")
public class ReportService extends RestProvider {

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
            } else {
                ReportDAO reportDAO = new ReportDAO(ses);
                entity = reportDAO.findById(id);
            }

            Outcome outcome = new Outcome();
            outcome.setId(id);
            outcome.addPayload(entity);
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            if (!isNew) {
                outcome.addPayload(new ACL(entity));
            }
            System.out.println(getWebFormData());
            return Response.ok(outcome).build();
        } catch (Exception e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Report reportForm) {
        _Session ses = getSession();

        _Validation validation = validate(reportForm);
        if (validation.hasError()) {
            // return error
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
        }
        Report entity;

        try {
            OrganizationDAO organizationDAO = new OrganizationDAO(ses);
            DocumentTypeDAO documentTypeDAO = new DocumentTypeDAO(ses);
            DocumentLanguageDAO documentLanguageDAO = new DocumentLanguageDAO(ses);
            OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
            ReportDAO reportDAO = new ReportDAO(ses);

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Report();
            } else {
                entity = reportDAO.findById(id);
            }

            //
            entity.setTitle(reportForm.getTitle());

            entity.setBody(reportForm.getBody());
            entity.setAttachments(getActualAttachments(entity.getAttachments()));

            if (isNew) {
                IUser<Long> user = ses.getUser();
                entity.addReaderEditor(user);
                entity = reportDAO.add(entity);
            } else {
                entity = reportDAO.update(entity);
            }

        } catch (SecureException | DAOException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(entity).build();
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
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
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
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
    }

    @DELETE
    @Path("{id}/attachments/{attachmentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {
        return deleteAttachmentFromSessionFormAttachments(attachmentId);
    }

    /*
     *
     */
    private _ActionBar getActionBar(_Session session, Report entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete_document", "", _ActionType.DELETE_DOCUMENT));
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
