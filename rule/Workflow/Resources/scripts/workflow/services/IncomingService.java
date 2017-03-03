package workflow.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import workflow.dao.IncomingDAO;
import workflow.domain.impl.IncomingDomain;
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getView() {
        _Session session = getSession();
        int pageSize = session.pageSize;
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
        String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
        List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());

        try {
            IncomingDAO incomingDAO = new IncomingDAO(session);
            ViewPage vp = incomingDAO.findAllWithResponses(sortParams, getWebFormData().getPage(), pageSize,
                    expandedIdList);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(new _Action("add_new", "", "new_incoming"));
            actionBar.addAction(new _Action("", "", "refresh", "fa fa-refresh", ""));
            // actionBar.addAction(new _Action("del_document", "", _ActionType.DELETE_DOCUMENT));

            Outcome outcome = new Outcome();
            outcome.setId("incomings");
            outcome.setTitle("incoming_documents");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        Incoming entity;
        IncomingDomain inDomain;

        try {
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Incoming();
                inDomain = new IncomingDomain(entity);
                inDomain.composeNew((User) ses.getUser());
            } else {
                IncomingDAO incomingDAO = new IncomingDAO(ses);
                entity = incomingDAO.findById(id);
                inDomain = new IncomingDomain(entity);
            }

            Outcome outcome = inDomain.getOutcome();
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Incoming dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Incoming dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Incoming dto) {
        _Session ses = getSession();
        Incoming entity;
        IncomingDomain inDomain;

        try {
            validate(dto);

            IncomingDAO incomingDAO = new IncomingDAO(ses);

            if (dto.isNew()) {
                entity = new Incoming();
            } else {
                entity = incomingDAO.findById(dto.getId());
            }

            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            inDomain = new IncomingDomain(entity);
            inDomain.fillFromDto((User) ses.getUser(), dto);

            if (dto.isNew()) {
                RegNum rn = new RegNum();
                entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
                entity = incomingDAO.add(entity, rn);
            } else {
                entity = incomingDAO.update(entity);
            }

            entity = incomingDAO.findById(entity.getId());
            inDomain = new IncomingDomain(entity);

            return Response.ok(inDomain.getOutcome()).build();
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
        _Session ses = getSession();
        try {
            IncomingDAO dao = new IncomingDAO(ses);
            Incoming entity = dao.findById(id);
            if (entity != null) {
                dao.delete(entity);
            }
            return Response.noContent().build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            IncomingDAO dao = new IncomingDAO(getSession());
            Incoming entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Incoming entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        if (entity.isEditable()) {
            actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        }

        if (!entity.isNew()) {
            // dev396
            if (entity.getAddressee() != null && entity.getAddressee().getUser().getId().equals(session.getUser().getId())
                    || session.getUser().getRoles().contains("chancellery")) {
                actionBar.addAction(new _Action("assignment", "", "new_assignment"));
            }
        }
        actionBar.addAction(new _Action("sign", "", "sign"));
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private void validate(Incoming model) throws _Validation.VException {
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
        if (model.getSenderRegNumber() == null || model.getSenderRegNumber().isEmpty()) {
            ve.addError("senderRegNumber", "required", "field_is_empty");
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

        ve.assertValid();
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
