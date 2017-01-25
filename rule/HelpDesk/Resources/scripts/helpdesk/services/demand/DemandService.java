package helpdesk.services.demand;

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
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import projects.dao.ProjectDAO;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;
import staff.dao.OrganizationDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("demands")
public class DemandService extends RestProvider {

    private Outcome outcome = new Outcome();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {
        _Session session = getSession();
        _WebFormData params = getWebFormData();
        int pageSize = session.pageSize;

        try {
            _SortParams sortParams = params.getSortParams(_SortParams.desc("regDate"));
            DemandDAO dao = new DemandDAO(session);
            ViewPage<Demand> vp = dao.findViewPage(sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            _Action newDocAction = new _Action("add_demand", "", "add_demand");
            actionBar.addAction(newDocAction);

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
        try {
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Demand();
                entity.setAuthor(session.getUser());
                entity.setTitle("");
                entity.setBody("");
                entity.setStatus(DemandStatusType.DRAFT);
                try {
                    DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                    entity.setDemandType(demandTypeDAO.findByName("bug"));
                } catch (DAOException e) {
                    Server.logger.errorLogEntry(e);
                }
            } else {
                DemandDAO dao = new DemandDAO(session);
                entity = dao.findById(id);
            }

            outcome.setId(id);
            outcome.addPayload(entity);
            outcome.addPayload(getActionBar(session, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            if (!isNew) {
                outcome.addPayload(new ACL(entity));
            }

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Demand demandForm) {
        _Session session = getSession();

        _Validation validation = validate(demandForm);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        Demand demand;
        try {
            ProjectDAO projectDAO = new ProjectDAO(session);
            OrganizationDAO organizationDAO = new OrganizationDAO(session);
            DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
            DemandDAO demandDAO = new DemandDAO(session);

            boolean isNew = "new".equals(id);
            if (isNew) {
                demand = new Demand();
            } else {
                demand = demandDAO.findById(id);
            }

            demand.setTitle(demandForm.getTitle());
            if (demandForm.getCustomer() != null) {
                demand.setCustomer(organizationDAO.findById(demandForm.getCustomer().getId()));
            } else {
                demand.setCustomer(null);
            }
            DemandType demandType = demandTypeDAO.findById(demandForm.getDemandType().getId());
            demand.setDemandType(demandType);
            if (demandForm.getProject() != null) {
                demand.setProject(projectDAO.findById(demandForm.getProject().getId()));
            } else {
                demand.setProject(null);
            }
            demand.setStatus(demandForm.getStatus());
            demand.setStatusDate(demandForm.getStatusDate());
            demand.setBody(demandForm.getBody());
            demand.setTags(demandForm.getTags());
            demand.setAttachments(getActualAttachments(demand.getAttachments()));

            if (isNew) {
                RegNum rn = new RegNum();
                demand.setRegNumber(demandType.getPrefix() + rn.getRegNumber(demandType.prefix));
                IUser<Long> user = session.getUser();
                demand.addReaderEditor(user);
                demand = demandDAO.add(demand);
            } else {
                demand = demandDAO.update(demand);
            }
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }

        outcome.setId(id);
        outcome.addPayload(demand);

        return Response.ok(outcome).build();
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

    @DELETE
    @Path("{id}/attachments/{attachmentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {
        return deleteAttachmentFromSessionFormAttachments(attachmentId);
    }

    /*
     * Action bar
     */
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

    /*
     * Validate entity
     */
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
