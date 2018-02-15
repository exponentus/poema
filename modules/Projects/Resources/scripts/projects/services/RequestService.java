package projects.services;

import administrator.model.User;
import com.exponentus.common.dto.ActionPayload;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.ui.BaseReferenceModel;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.domain.RequestDomain;
import projects.domain.TaskDomain;
import projects.model.Request;
import projects.model.Task;
import projects.other.Messages;
import projects.ui.ActionFactory;
import reference.dao.RequestTypeDAO;
import staff.dao.EmployeeDAO;
import staff.dto.converter.EmployeeToBaseRefUserDtoConverter;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Path("requests")
@Produces(MediaType.APPLICATION_JSON)
public class RequestService extends RestProvider {

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();

        try {
            boolean isNew = "new".equals(id);
            RequestDAO requestDAO = new RequestDAO(session);
            Request request;
            RequestDomain requestDomain = new RequestDomain(session);
            EmployeeDAO empDao = new EmployeeDAO(session);

            if (isNew) {
                String taskId = getWebFormData().getValueSilently("task");
                TaskDAO taskDAO = new TaskDAO(session);

                request = requestDomain.composeNew((User) session.getUser(), taskDAO.findById(taskId));
            } else {
                request = requestDAO.findById(id);
                if (request == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            Map<Long, BaseReferenceModel> emps = new HashMap<>();
            emps.put(request.getAuthor().getId(), new EmployeeToBaseRefUserDtoConverter().convert(empDao.findByUser(request.getAuthor())));
            Environment.database.markAsRead(session.getUser(), request);

            Outcome outcome = requestDomain.getOutcome(request);
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload(getActionBar(session, request, requestDomain));
            outcome.addPayload("employees", emps);

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Request dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Request dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Request requestDto) {
        if (requestDto.getTask() == null || requestDto.getRequestType() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("task or requestType empty").build();
        }

        return addRequest(getSession(), requestDto);
    }

    private Response addRequest(_Session session, Request requestDto) {
        try {
            RequestTypeDAO requestTypeDAO = new RequestTypeDAO(session);
            TaskDAO taskDAO = new TaskDAO(session);
            Task task = taskDAO.findById(requestDto.getTask().getId());

            if (task == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            if (task.getStatus() != StatusType.PROCESSING) {
                throw new IllegalStateException("task status is not PROCESSING");
            }

            Request request = new Request();

            requestDto.setAuthor(session.getUser());
            requestDto.setTask(task);
            requestDto.setRequestType(requestTypeDAO.findById(requestDto.getRequestType().getId()));
            requestDto.setAttachments(getActualAttachments(request.getAttachments(), requestDto.getAttachments()));

            TaskDomain taskDomain = new TaskDomain(session);
            RequestDomain requestDomain = new RequestDomain(session);

            requestDomain.fillFromDto(request, requestDto);
            taskDomain.changeStatus(task, StatusType.PENDING);

            task.getRequests().add(request);

            taskDAO.update(task, false);

            new Messages(getAppEnv()).sendOfNewRequest(request, task);

            return Response.ok(requestDomain.getOutcome(request)).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("accept")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doAcceptRequest(ActionPayload<Request, Date> action) {
        try {
            RequestDAO requestDAO = new RequestDAO(getSession());
            Request request = requestDAO.findById(action.getTarget().getId());
            TaskDomain taskDomain = new TaskDomain(getSession());
            RequestDomain requestDomain = new RequestDomain(getSession());

            switch (request.getRequestType().getName()) {
                case "implement":
                    taskDomain.completeTask(request.getTask());
                    break;
                case "prolong":
                    // prolong new due date
                    Date newDueDate = action.getPayload();
                    if (newDueDate == null) {
                        DTOException ve = new DTOException();
                        ve.addError("dueDate", "date", "field_is_empty");
                        return responseValidationError(ve);
                    }
                    taskDomain.prolongTask(request.getTask(), newDueDate);
                    break;
                case "cancel":
                    taskDomain.cancelTask(request.getTask(), "");
                    break;
                default:
                    throw new IllegalArgumentException(
                            "I don't know what you want. Unknown request type: " + request.getRequestType().getName());
            }

            requestDomain.doAcceptRequest(request);

            requestDAO.update(request, false);

            new Messages(getAppEnv()).sendMessageOfRequestDecision(request);

            return Response.ok(new Outcome()).build();
        } catch (SecureException | DAOException | DTOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("decline")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doDeclineRequest(ActionPayload<Request, String> action) {
        try {
            RequestDAO requestDAO = new RequestDAO(getSession());
            Request request = requestDAO.findById(action.getTarget().getId());
            TaskDomain taskDomain = new TaskDomain(getSession());
            RequestDomain requestDomain = new RequestDomain(getSession());

            taskDomain.returnToProcessing(request.getTask());
            requestDomain.doDeclineRequest(request, action.getPayload());

            requestDAO.update(request, false);

            new Messages(getAppEnv()).sendMessageOfRequestDecision(request);

            return Response.ok(new Outcome()).build();
        } catch (SecureException | DAOException | DTOException e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        try {
            RequestDAO dao = new RequestDAO(getSession());
            Request entity = dao.findByIdentifier(id);
            if (entity != null) {
                entity.setAttachments(null); // if no on delete cascade
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
            RequestDAO dao = new RequestDAO(getSession());
            Request entity = dao.findByIdentifier(id);

            return getAttachment(entity, attachId);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}/{fileName}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachmentFN(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        return getAttachment(id, attachId);
    }

    private ActionBar getActionBar(_Session session, Request request, RequestDomain requestDomain) {
        ActionBar actionBar = new ActionBar(session);
        ActionFactory action = new ActionFactory();

        actionBar.addAction(action.close);
        if (request.isNew()) {
            actionBar.addAction(action.saveAndClose.caption("send_request").cls("btn-primary"));
        }

        if (requestDomain.userCanDoResolution(request, (User) session.getUser())) {
            actionBar.addAction(action.acceptRequest().cls("btn-primary"));
            actionBar.addAction(action.declineRequest());
        }

        return actionBar;
    }
}
