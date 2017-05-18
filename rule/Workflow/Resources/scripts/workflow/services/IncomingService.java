package workflow.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.IncomingDAO;
import workflow.dao.filter.IncomingFilter;
import workflow.domain.IncomingDomain;
import workflow.init.AppConst;
import workflow.model.Incoming;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("incomings")
@Produces(MediaType.APPLICATION_JSON)
public class IncomingService extends RestProvider {

    private ActionFactory action = new ActionFactory();

    @GET
    public Response getView() {
        _Session session = getSession();
        int pageSize = session.getPageSize();
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
        IncomingFilter filter = new IncomingFilter(getWebFormData());

        try {
            IncomingDAO incomingDAO = new IncomingDAO(session);
            ViewPage vp = incomingDAO.findViewPage(filter, sortParams, getWebFormData().getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newIncoming);
            actionBar.addAction(action.refreshVew);

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
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        Incoming entity;
        IncomingDomain inDomain = new IncomingDomain();

        try {
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = inDomain.composeNew((IUser<Long>) ses.getUser());
            } else {
                IncomingDAO incomingDAO = new IncomingDAO(ses);
                entity = incomingDAO.findByIdentefier(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = inDomain.getOutcome(entity);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(ses, entity, inDomain));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Incoming dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Incoming dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Incoming dto) {
        _Session ses = getSession();
        Incoming entity;
        IncomingDomain inDomain = new IncomingDomain();

        try {
            IncomingDAO incomingDAO = new IncomingDAO(ses);

            if (dto.isNew()) {
                entity = new Incoming();
            } else {
                entity = incomingDAO.findById(dto.getId());
            }

            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            inDomain.fillFromDto(entity, dto, ses);

            // ACL routines
            entity.resetReadersEditors();
            entity.addReaderEditor(entity.getAuthor());
            entity.addReader(entity.getAddressee().getUser());

            List<Observer> observers = entity.getObservers();
            if (observers != null) {
                for (Observer observer : observers) {
                    Employee emp = observer.getEmployee();
                    entity.addReader(emp.getUserID());
                }
            }

            if (dto.isNew()) {
                RegNum rn = new RegNum();
                entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
                entity = incomingDAO.add(entity, rn);
            } else {
                entity = incomingDAO.update(entity);
            }

            entity = incomingDAO.findById(entity.getId());

            new Messages(getAppEnv()).notifyAddressee(entity);

            return Response.ok(inDomain.getOutcome(entity)).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        } catch (DTOException e) {
            return responseValidationError(e);
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        try {
            IncomingDAO dao = new IncomingDAO(ses);
            Incoming entity = dao.findByIdentefier(id);
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
            Incoming entity = dao.findByIdentefier(id);

            return getAttachment(entity, attachId);
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

    private _ActionBar getActionBar(_Session session, Incoming entity, IncomingDomain domain) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }
        if (domain.canCreateAssignment(entity, (User) session.getUser())) {
            actionBar.addAction(new Action(ActionType.LINK).caption("assignment")
                    .url(AppConst.BASE_URL + "assignments/new?incoming=" + entity.getIdentifier()));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        return actionBar;
    }
}
