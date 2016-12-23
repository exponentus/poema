package workflow.services.outgoing;

import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.IUser;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentSubjectDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.OrganizationDAO;
import workflow.dao.OutgoingDAO;
import workflow.model.Outgoing;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("outgoings")
public class OutgoingService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getView() {
        _Session session = getSession();
        int pageSize = session.pageSize;

        OutgoingDAO dao = new OutgoingDAO(session);
        ViewPage vp = dao.findViewPage(getWebFormData().getPage(), pageSize);

        //
        _ActionBar actionBar = new _ActionBar(session);
        _Action newDocAction = new _Action("add_new", "", "new_incoming");
        newDocAction.setURL("new");
        actionBar.addAction(newDocAction);
        actionBar.addAction(new _Action("del_document", "", _ActionType.DELETE_DOCUMENT));

        Outcome outcome = new Outcome();
        outcome.setId("outgoings");
        outcome.setTitle("outgoing_documents");
        outcome.addPayload(actionBar);
        outcome.addPayload(vp);

        return Response.ok(outcome).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        Outgoing entity;

        boolean isNew = "new".equals(id);
        if (isNew) {
            entity = new Outgoing();
        } else {
            OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
            entity = outgoingDAO.findById(id);
        }

        Outcome outcome = new Outcome();
        outcome.setId(id);
        outcome.addPayload(entity);
        outcome.addPayload(getActionBar(ses, entity));
        outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
        if (!isNew) {
            outcome.addPayload(new ACL(entity));
        }

        return Response.ok(outcome).build();
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Outgoing outgoingForm) {
        _Session ses = getSession();

        _Validation validation = validate(outgoingForm);
        if (validation.hasError()) {
            // return error
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
        }

        Outgoing entity;
        try {
            OrganizationDAO organizationDAO = new OrganizationDAO(ses);
            DocumentSubjectDAO documentSubjectDAO = new DocumentSubjectDAO(ses);
            DocumentTypeDAO documentTypeDAO = new DocumentTypeDAO(ses);
            DocumentLanguageDAO documentLanguageDAO = new DocumentLanguageDAO(ses);
            OutgoingDAO outgoingDAO = new OutgoingDAO(ses);

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Outgoing();
            } else {
                entity = outgoingDAO.findById(id);
            }

            //
            entity.setTitle(outgoingForm.getTitle());
            entity.setAppliedRegDate(outgoingForm.getAppliedRegDate());
            if (outgoingForm.getDocSubject() != null) {
                entity.setDocSubject(documentSubjectDAO.findById(outgoingForm.getDocSubject().getId()));
            } else {
                entity.setDocSubject(null);
            }
            if (outgoingForm.getDocLanguage() != null) {
                entity.setDocLanguage(documentLanguageDAO.findById(outgoingForm.getDocLanguage().getId()));
            } else {
                entity.setDocLanguage(null);
            }
            if (outgoingForm.getDocType() != null) {
                entity.setDocType(documentTypeDAO.findById(outgoingForm.getDocType().getId()));
            } else {
                entity.setDocType(null);
            }
            if (outgoingForm.getRecipient() != null) {
                entity.setRecipient(organizationDAO.findById(outgoingForm.getRecipient().getId()));
            } else {
                entity.setRecipient(null);
            }
            entity.setBody(outgoingForm.getBody());
            entity.setAttachments(getActualAttachments(entity.getAttachments()));

            if (isNew) {
                RegNum rn = new RegNum();
                entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));

                IUser<Long> user = ses.getUser();
                entity.addReaderEditor(user);
                entity = outgoingDAO.add(entity);
            } else {
                entity = outgoingDAO.update(entity);
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
        _Session ses = getSession();
        OutgoingDAO dao = new OutgoingDAO(ses);
        Outgoing entity = dao.findById(id);
        if (entity != null) {
            try {
                dao.delete(entity);
            } catch (SecureException | DAOException e) {
                return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
            }
        }
        return Response.noContent().build();
    }

    /*
     * Get entity attachment or _thumbnail
     */
    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        OutgoingDAO dao = new OutgoingDAO(getSession());
        Outgoing entity = dao.findById(id);

        return getAttachment(entity, attachId);
    }

    @DELETE
    @Path("{id}/attachments/{attachmentId}")
    public Response deleteAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {
        return deleteAttachmentFromSessionFormAttachments(attachmentId);
    }

    /*
     *
     */
    private _ActionBar getActionBar(_Session session, Outgoing entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete_document", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private _Validation validate(Outgoing outgoingForm) {
        _Validation ve = new _Validation();

        if (outgoingForm.getTitle() == null || outgoingForm.getTitle().isEmpty()) {
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
