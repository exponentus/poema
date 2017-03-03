package projects.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.util.TimeUtil;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.domain.impl.RequestDomain;
import projects.domain.impl.TaskDomain;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
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
public class RequestService extends RestProvider {

    private Outcome outcome = new Outcome();

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();

        try {
            boolean isNew = "new".equals(id);
            RequestDAO requestDAO = new RequestDAO(session);
            Request request;
            RequestDomain requestDomain;
            EmployeeDAO empDao = new EmployeeDAO(session);

            if (isNew) {
                String taskId = getWebFormData().getValueSilently("task");
                TaskDAO taskDAO = new TaskDAO(session);

                request = new Request();
                requestDomain = new RequestDomain(request);
                requestDomain.composeNew((User) session.getUser(), taskDAO.findById(taskId));
            } else {
                request = requestDAO.findById(id);
                if (request == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }

                requestDomain = new RequestDomain(request);
            }

            Map<Long, Employee> emps = new HashMap<>();
            emps.put(request.getAuthor().getId(), empDao.findByUser(request.getAuthor()));

            outcome = requestDomain.getOutcome();
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload(getActionBar(session, request, requestDomain));
            outcome.addPayload("employees", emps);

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Request dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
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
            requestDto.setAttachments(getActualAttachments(request.getAttachments(), requestDto.getAttachments()));

            TaskDomain taskDomain = new TaskDomain(task);
            RequestDomain requestDomain = new RequestDomain(request);

            requestDomain.fillFromDto(requestDto);
            taskDomain.changeStatus(TaskStatusType.PENDING);

            task.getRequests().add(request);

            taskDAO.update(task, false);

            new Messages(getAppEnv()).sendOfNewRequest(request, task);

            return Response.ok(requestDomain.getOutcome()).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/accept")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doRequestAccept(@PathParam("id") String id, Request requestDTO) {
        return doResolution(id, ResolutionType.ACCEPTED, requestDTO);
    }

    @POST
    @Path("{id}/action/decline")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doRequestDecline(@PathParam("id") String id, Request requestDto) {
        return doResolution(id, ResolutionType.DECLINED, requestDto);
    }

    private Response doResolution(String requestId, ResolutionType resolutionType, Request requestDto) {
        try {
            RequestDAO requestDAO = new RequestDAO(getSession());
            Request request = requestDAO.findById(requestId);

            if (request == null || resolutionType == ResolutionType.UNKNOWN) {
                if (request == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
                return Response.status(Response.Status.NOT_FOUND).entity("ResolutionType.UNKNOWN").build();
            }

            TaskDomain taskDomain = new TaskDomain(request.getTask());
            RequestDomain requestDomain = new RequestDomain(request);

            if (resolutionType == ResolutionType.ACCEPTED) {
                switch (request.getRequestType().getName()) {
                    case "implement":
                        taskDomain.completeTask();
                        break;
                    case "prolong":
                        // prolong new due date
                        Date newDueDate = TimeUtil.stringToDate(getWebFormData().getValueSilently("dueDate"));
                        if (newDueDate == null) {
                            _Validation ve = new _Validation();
                            ve.addError("dueDate", "date", "field_is_empty");
                            return responseValidationError(ve);
                        }
                        taskDomain.prolongTask(newDueDate);
                        break;
                    case "cancel":
                        taskDomain.cancelTask("");
                        break;
                    default:
                        throw new IllegalArgumentException("I don't know what you want. Unknown request type: "
                                + request.getRequestType().getName());
                }
            } else {
                taskDomain.returnToProcessing();
            }

            requestDomain.doResolution((User) getSession().getUser(), resolutionType, getWebFormData().getValueSilently("comment"));

            requestDAO.update(request, false);

            new Messages(getAppEnv()).sendMessageOfRequestDecision(request);

            return Response.ok(outcome).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        try {
            RequestDAO dao = new RequestDAO(getSession());
            Request entity = dao.findById(id);
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
            Request entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Request request, RequestDomain requestDomain) {
        _ActionBar actionBar = new _ActionBar(session);
        if (request.isNew()) {
            actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
        } else if (request.isEditable()) {
            actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
        }

        if (requestDomain.userCanDoResolution((User) session.getUser())) {
            actionBar.addAction(new _Action("decline", "", "decline"));
            actionBar.addAction(new _Action("accept", "", "accept"));
        }

        return actionBar;
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/requests");
        sd.addMethod(m);
        return sd;
    }
}
