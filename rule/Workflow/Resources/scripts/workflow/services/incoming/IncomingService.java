package workflow.services.incoming;

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
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.IUser;
import workflow.dao.IncomingDAO;
import workflow.model.Incoming;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Path("incomings")
public class IncomingService extends RestProvider {

    private Outcome outcome = new Outcome();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getView() {
        _Session session = getSession();
        int pageSize = session.pageSize;
        _SortParams sortParams = getWebFormData().getSortParams(_SortParams.desc("regDate"));
        String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
        List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());

        IncomingDAO incomingDAO = new IncomingDAO(session);
        ViewPage vp = incomingDAO.findAllWithResponses(sortParams, getWebFormData().getPage(), pageSize, expandedIdList);

        //
        _ActionBar actionBar = new _ActionBar(session);
        actionBar.addAction(new _Action("add_new", "", "new_incoming"));
        actionBar.addAction(new _Action("", "", "refresh", "fa fa-refresh"));
        // actionBar.addAction(new _Action("del_document", "", _ActionType.DELETE_DOCUMENT));

        outcome.setId("incomings");
        outcome.setTitle("incoming_documents");
        outcome.addPayload(actionBar);
        outcome.addPayload(vp);

        return Response.ok(outcome).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        Incoming entity;

        boolean isNew = "new".equals(id);
        if (isNew) {
            entity = new Incoming();
        } else {
            IncomingDAO incomingDAO = new IncomingDAO(ses);
            entity = incomingDAO.findById(id);
        }

        outcome.setId(id);
        outcome.setTitle(entity.getTitle());
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
    public Response save(@PathParam("id") String id, Incoming incomingForm) {
        _Validation validation = validate(incomingForm);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        _Session ses = getSession();
        Incoming entity;

        try {
            IncomingDAO incomingDAO = new IncomingDAO(ses);

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Incoming();
            } else {
                entity = incomingDAO.findById(id);
            }

            entity.setTitle(incomingForm.getTitle());
            entity.setAppliedRegDate(incomingForm.getAppliedRegDate());
            entity.setDocLanguage(incomingForm.getDocLanguage());
            entity.setDocType(incomingForm.getDocType());
            entity.setSender(incomingForm.getSender());
            entity.setAddressee(incomingForm.getAddressee());
            entity.setResponseTo(incomingForm.getResponseTo());
            entity.setSenderRegNumber(incomingForm.getSenderRegNumber());
            entity.setSenderAppliedRegDate(incomingForm.getSenderAppliedRegDate());
            entity.setBody(incomingForm.getBody());
            entity.setAttachments(getActualAttachments(entity.getAttachments()));

            if (isNew) {
                RegNum rn = new RegNum();
                entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
                IUser<Long> user = ses.getUser();
                entity.addReaderEditor(user);
                entity = incomingDAO.add(entity, rn);
            } else {
                entity = incomingDAO.update(entity);
            }

            entity = incomingDAO.findById(entity.getId());

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
        _Session ses = getSession();
        IncomingDAO dao = new IncomingDAO(ses);
        Incoming entity = dao.findById(id);
        if (entity != null) {
            try {
                dao.delete(entity);
            } catch (SecureException | DAOException e) {
                return responseException(e);
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
        IncomingDAO dao = new IncomingDAO(getSession());
        Incoming entity = dao.findById(id);

        return getAttachment(entity, attachId);
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
    private _ActionBar getActionBar(_Session session, Incoming entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        if (!entity.isNew() && session.getUser().getRoles().contains("chancellery")) {
            actionBar.addAction(new _Action("assignment", "", "new_assignment"));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete_document", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private _Validation validate(Incoming model) {
        _Validation ve = new _Validation();

        if (model.getTitle() == null || model.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (model.getSender() == null) {
            ve.addError("sender", "required", "field_is_empty");
        }
        if (model.getAddressee() == null) {
            ve.addError("addressee", "required", "field_is_empty");
        }
        if (model.getResponseTo() == null) {
            ve.addError("responseTo", "required", "field_is_empty");
        }
        if (model.getSenderAppliedRegDate() == null) {
            ve.addError("senderAppliedRegDate", "required", "field_is_empty");
        }
        if (model.getDocLanguage() == null) {
            ve.addError("docLanguage", "required", "field_is_empty");
        }
        if (model.getDocType() == null) {
            ve.addError("docType", "required", "field_is_empty");
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
