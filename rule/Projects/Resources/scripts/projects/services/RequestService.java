package projects.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.util.TimeUtil;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.domain.RequestDomain;
import projects.domain.TaskDomain;
import projects.exception.RequestException;
import projects.exception.TaskException;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
import projects.ui.ActionFactory;
import reference.dao.RequestTypeDAO;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

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

                request = requestDomain.composeNew((User) session.getUser(), taskDAO.findByIdentefier(taskId));
            } else {
                request = requestDAO.findByIdentefier(id);
                if (request == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            Map<Long, Employee> emps = new HashMap<>();
            emps.put(request.getAuthor().getId(), empDao.findByUser(request.getAuthor()));

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

            if (task.getStatus() != TaskStatusType.PROCESSING) {
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
            taskDomain.changeStatus(task, TaskStatusType.PENDING);

            task.getRequests().add(request);

            taskDAO.update(task, false);

            new Messages(getAppEnv()).sendOfNewRequest(request, task);

            return Response.ok(requestDomain.getOutcome(request)).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/accept")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doRequestAccept(@PathParam("id") String id, Request requestDTO) {
        return doResolution(id, ResolutionType.ACCEPTED, requestDTO);
    }

    @POST
    @Path("{id}/action/decline")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doRequestDecline(@PathParam("id") String id, Request requestDto) {
        return doResolution(id, ResolutionType.DECLINED, requestDto);
    }

    private Response doResolution(String requestId, ResolutionType resolutionType, Request requestDto) {
        try {
            RequestDAO requestDAO = new RequestDAO(getSession());
            Request request = requestDAO.findByIdentefier(requestId);

            if (request == null || resolutionType == ResolutionType.UNKNOWN) {
                if (request == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
                return Response.status(Response.Status.NOT_FOUND).entity("ResolutionType.UNKNOWN").build();
            }

            TaskDomain taskDomain = new TaskDomain(getSession());
            RequestDomain requestDomain = new RequestDomain(getSession());

            if (resolutionType == ResolutionType.ACCEPTED) {
                switch (request.getRequestType().getName()) {
                    case "implement":
                        taskDomain.completeTask(request.getTask());
                        break;
                    case "prolong":
                        // prolong new due date
                        Date newDueDate = TimeUtil.stringToDate(getWebFormData().getValueSilently("dueDate"));
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
            } else {
                taskDomain.returnToProcessing(request.getTask());
            }

            requestDomain.doResolution(request, (User) getSession().getUser(), resolutionType,
                    getWebFormData().getValueSilently("comment"));

            requestDAO.update(request, false);

            new Messages(getAppEnv()).sendMessageOfRequestDecision(request);

            return Response.ok(new Outcome()).build();
        } catch (SecureException | DAOException | TaskException | RequestException | DTOException e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        try {
            RequestDAO dao = new RequestDAO(getSession());
            Request entity = dao.findByIdentefier(id);
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
            Request entity = dao.findByIdentefier(id);

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

    private _ActionBar getActionBar(_Session session, Request request, RequestDomain requestDomain) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new ActionFactory().close);

        if (request.isNew()) {
            actionBar.addAction(new Action(ActionType.SAVE_AND_CLOSE).caption("send_request").cls("btn-primary"));
        }

        if (requestDomain.userCanDoResolution(request, (User) session.getUser())) {
            actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("accept").caption("accept").cls("btn-primary"));
            actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("decline").caption("decline"));
        }

        return actionBar;
    }
}
