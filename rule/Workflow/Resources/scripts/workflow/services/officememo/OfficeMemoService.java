package workflow.services.officememo;

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
import workflow.dao.OfficeMemoDAO;
import workflow.model.OfficeMemo;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("office-memos/{id}")
public class OfficeMemoService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id, @QueryParam(EnvConst.FSID_FIELD_NAME) String fsId) {
        _Session ses = getSession();
        OfficeMemo entity;

        boolean isNew = "new".equals(id);
        if (isNew) {
            entity = new OfficeMemo();
        } else {
            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
            entity = officeMemoDAO.findById(id);
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
    public Response save(@PathParam("id") String id, @QueryParam(EnvConst.FSID_FIELD_NAME) String fsId,
                         OfficeMemo form) {
        _Session ses = getSession();

        _Validation validation = validate(form);
        if (validation.hasError()) {
            // return error
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
        }

        // ApprovalDAO approvalDAO = new ApprovalDAO(ses);
        OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
        OfficeMemo entity;

        boolean isNew = "new".equals(id);
        if (isNew) {
            entity = new OfficeMemo();
        } else {
            entity = officeMemoDAO.findById(id);
        }

        // TODO remove
        if (entity.getRegNumber() == null) {
            entity.setRegNumber("RG-OM-" + Math.random());
        }
        //
        entity.setAppliedRegDate(form.getAppliedRegDate());
        if (form.getApproval() != null) {
            // entity.setApproval(approvalDAO.findById(form.getApproval().getId()));
        } else {
            entity.setApproval(null);
        }
        entity.setTitle(form.getTitle());
        entity.setBody(form.getBody());
        entity.setAttachments(getActualAttachments(ses, fsId, entity.getAttachments()));

        try {
            if (isNew) {
                IUser<Long> user = ses.getUser();
                entity.addReaderEditor(user);
                entity = officeMemoDAO.add(entity);
            } else {
                entity = officeMemoDAO.update(entity);
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
        OfficeMemoDAO dao = new OfficeMemoDAO(ses);
        OfficeMemo entity = dao.findById(id);
        if (entity != null) {
            try {
                dao.delete(entity);
            } catch (SecureException e) {
                return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
            }
        }
        return Response.noContent().build();
    }

    /* ===========================================
     * Get entity attachment or _thumbnail
     * ---------------------------------------- */
    @GET
    @Path("attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        OfficeMemoDAO dao = new OfficeMemoDAO(getSession());
        OfficeMemo entity = dao.findById(id);

        return getAttachment(entity, attachId);
    }

    private _ActionBar getActionBar(_Session session, OfficeMemo entity) {
        _ActionBar actionBar = new _ActionBar(session);
        // if (incoming.isEditable()) {
        actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
        }
        // }

        return actionBar;
    }

    private _Validation validate(OfficeMemo entity) {
        _Validation ve = new _Validation();

        if (entity.getTitle() == null || entity.getTitle().isEmpty()) {
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
