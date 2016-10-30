package workflow.services.outgoing;

import com.exponentus.common.model.ACL;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IAppFile;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._FormAttachments;
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
import workflow.model.Outgoing;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("outgoings/{id}")
public class OutgoingService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id, @QueryParam(EnvConst.FSID_FIELD_NAME) String fsId) {
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
        outcome.addPayload("fsId", fsId);
        if (!isNew) {
            outcome.addPayload(new ACL(entity));
        }

        return Response.ok(outcome).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, @QueryParam(EnvConst.FSID_FIELD_NAME) String fsId, Outgoing outgoingForm) {
        _Session ses = getSession();

        _Validation validation = validate(outgoingForm);
        if (validation.hasError()) {
            // return error
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
        }

        OrganizationDAO organizationDAO = new OrganizationDAO(ses);
        DocumentTypeDAO documentTypeDAO = new DocumentTypeDAO(ses);
        DocumentLanguageDAO documentLanguageDAO = new DocumentLanguageDAO(ses);
        OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
        Outgoing entity;

        boolean isNew = "new".equals(id);
        if (isNew) {
            entity = new Outgoing();
        } else {
            entity = outgoingDAO.findById(id);
        }

        // TODO remove
        if (entity.getRegNumber() == null) {
            entity.setRegNumber("RG-O-" + Math.random());
        }
        //
        entity.setTitle(outgoingForm.getTitle());
        entity.setAppliedRegDate(outgoingForm.getAppliedRegDate());
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
        entity.setAttachments(getActualAttachments(ses, fsId, entity.getAttachments()));

        try {
            if (isNew) {
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        OutgoingDAO dao = new OutgoingDAO(ses);
        Outgoing entity = dao.findById(id);
        if (entity != null) {
            try {
                dao.delete(entity);
            } catch (SecureException e) {
                return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
            }
        }
        return Response.noContent().build();
    }

    private _ActionBar getActionBar(_Session session, Outgoing entity) {
        _ActionBar actionBar = new _ActionBar(session);
        // if (incoming.isEditable()) {
        actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
        }
        // }

        return actionBar;
    }

    private _Validation validate(Outgoing outgoingForm) {
        _Validation ve = new _Validation();

        if (outgoingForm.getTitle() == null || outgoingForm.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }

        return ve;
    }

    // TODO refactor
    protected List<Attachment> getActualAttachments(_Session ses, String fsId, List<Attachment> atts) {
        _FormAttachments formFiles = ses.getFormAttachments(fsId);

        for (TempFile tmpFile : formFiles.getFiles()) {
            Attachment a = (Attachment) tmpFile.convertTo(new Attachment());
            a.setFieldName(a.getDefaultFormName());
            atts.add(a);
        }

        List<TempFile> toDelete = formFiles.getDeletedFiles();
        if (toDelete.size() > 0) {
            for (IAppFile fn : toDelete) {
                atts.remove(fn);
            }
        }

        return atts;
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
