package helpdesk.services;

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
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.server.Server;
import helpdesk.dao.DemandDAO;
import helpdesk.domain.DemandDomain;
import helpdesk.model.Demand;
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
            SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
            DemandDAO dao = new DemandDAO(session);
            ViewPage<Demand> vp = dao.findViewPage(sortParams, params.getPage(), pageSize);

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
        DemandDomain demandDomain;
        try {
            boolean isNew = "new".equals(id);
            if (isNew) {
                DemandType demandType = null;
                entity = new Demand();
                demandDomain = new DemandDomain(entity);

                try {
                    DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                    demandType = demandTypeDAO.findByName("bug");
                } catch (DAOException e) {
                    Server.logger.errorLogEntry(e);
                }

                demandDomain.composeNew((User) session.getUser(), demandType);
            } else {
                DemandDAO dao = new DemandDAO(session);
                entity = dao.findById(id);
                demandDomain = new DemandDomain(entity);
            }

            Outcome outcome = demandDomain.getOutcome();
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

        _Validation validation = validate(dto);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        Demand demand;
        DemandDomain demandDomain;
        try {
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

            demandDomain = new DemandDomain(demand);
            demandDomain.fillFromDto((User) session.getUser(), dto);

            if (dto.isNew()) {
                RegNum rn = new RegNum();
                demand.setRegNumber(demandType.getPrefix() + rn.getRegNumber(demandType.getPrefix()));
                demand = demandDAO.add(demand);
            } else {
                demand = demandDAO.update(demand);
            }

            Outcome outcome = demandDomain.getOutcome();

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
        try {
            DemandDAO dao = new DemandDAO(ses);
            Demand entity = dao.findById(id);
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
            Demand demand = demandDAO.findById(id);

            return getAttachment(demand, attachId);
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Demand entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        if (entity.isNew() || entity.isEditable()) {
            actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private _Validation validate(Demand demand) {
        _Validation ve = new _Validation();

        if (demand.getTitle() == null || demand.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (demand.getDemandType() == null) {
            ve.addError("demandType", "required", "field_is_empty");
        }

        return ve;
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/demands");
        sd.addMethod(m);
        return sd;
    }
}