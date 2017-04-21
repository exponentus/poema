package helpdesk.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.server.Server;
import helpdesk.dao.DemandDAO;
import helpdesk.dao.filter.DemandFilter;
import helpdesk.domain.DemandDomain;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import projects.constants.Action;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("demands")
public class DemandService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {
        _Session session = getSession();
        WebFormData params = getWebFormData();
        int pageSize = session.pageSize;

        try {
            String slug = params.getValueSilently("slug");
            String statusName = params.getValueSilently("status");
            String demandTypeId = params.getValueSilently("demandType");

            SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
            DemandFilter filter = new DemandFilter();

            if (!statusName.isEmpty()) {
                DemandStatusType status = DemandStatusType.valueOf(statusName);
                filter.setStatus(status);
            }
            if (!demandTypeId.isEmpty()) {
                DemandType demandType = new DemandType();
                demandType.setId(UUID.fromString(demandTypeId));
                filter.setDemandType(demandType);
            } else if (!slug.isEmpty()) {
                try {
                    DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                    DemandType demandType = demandTypeDAO.findByName(slug);
                    filter.setDemandType(demandType);
                } catch (DAOException e) {
                    Server.logger.errorLogEntry(e);
                }
            }

            DemandDAO dao = new DemandDAO(session);
            ViewPage<Demand> vp = dao.findViewPage(filter, sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            _Action newDocAction = new _Action("add_demand", "", "add_demand");
            actionBar.addAction(newDocAction);

            Outcome outcome = new Outcome();
            outcome.setId("demands");
            outcome.setTitle("demands");
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
        _Session session = getSession();
        Demand entity;
        DemandDomain demandDomain = new DemandDomain();
        try {
            boolean isNew = "new".equals(id);

            if (isNew) {
                String demandTypeName = getWebFormData().getValueSilently("demandType");
                DemandType demandType = null;

                try {
                    DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                    if (demandTypeName.isEmpty() || demandTypeName.equals("my")) {
                        demandType = demandTypeDAO.findByName("bug");
                    } else {
                        demandType = demandTypeDAO.findByName(demandTypeName);
                    }
                } catch (DAOException e) {
                    Server.logger.errorLogEntry(e);
                }

                entity = demandDomain.composeNew((User) session.getUser(), demandType);
            } else {
                DemandDAO dao = new DemandDAO(session);
                entity = dao.findByIdentefier(id);
            }

            Outcome outcome = demandDomain.getOutcome(entity);
            outcome.addPayload(getActionBar(session, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Demand dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Demand dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Demand dto) {
        _Session session = getSession();
        Demand demand;
        DemandDomain demandDomain = new DemandDomain();

        try {
            validate(dto);

            DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
            DemandDAO demandDAO = new DemandDAO(session);

            if (dto.isNew()) {
                demand = new Demand();
            } else {
                demand = demandDAO.findById(dto.getId());
            }

            DemandType demandType = demandTypeDAO.findById(dto.getDemandType().getId());
            dto.setDemandType(demandType);
            dto.setAttachments(getActualAttachments(demand.getAttachments(), dto.getAttachments()));

            demandDomain.fillFromDto(demand, dto, (User) session.getUser());

            if (dto.isNew()) {
                RegNum rn = new RegNum();
                demand.setRegNumber(demandType.getPrefix() + rn.getRegNumber(demandType.getPrefix()));
                demand = demandDAO.add(demand);
            } else {
                demand = demandDAO.update(demand);
            }

            Outcome outcome = demandDomain.getOutcome(demand);

            return Response.ok(outcome).build();
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
            DemandDAO dao = new DemandDAO(ses);
            Demand entity = dao.findByIdentefier(id);
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
            DemandDAO demandDAO = new DemandDAO(getSession());
            Demand demand = demandDAO.findByIdentefier(id);

            return getAttachment(demand, attachId);
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}/{fileName}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachmentFN(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        return getAttachment(id, attachId);
    }

    private _ActionBar getActionBar(_Session session, Demand entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(Action.close);
        if (entity.isNew() || entity.isEditable()) {
            String actLabel = entity.isNew() ? "send" : "save_close";
            actionBar.addAction(new _Action(_ActionType.SAVE_AND_CLOSE).caption(actLabel).cls("btn-primary"));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action(_ActionType.CUSTOM_ACTION).id("create_task").caption("create_task"));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(Action.deleteDocument);
        }

        return actionBar;
    }

    private void validate(Demand demand) throws _Validation.VException {
        _Validation ve = new _Validation();

        if (demand.getTitle() == null || demand.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (demand.getDemandType() == null) {
            ve.addError("demandType", "required", "field_is_empty");
        }

        ve.assertValid();
    }
}
