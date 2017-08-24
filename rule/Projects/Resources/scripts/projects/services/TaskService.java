package projects.services;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.extconnect.IMonitoringDAO;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.exception.RestServiceException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.domain.TaskDomain;
import projects.exception.TaskException;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
import projects.ui.ActionFactory;
import reference.dao.TaskTypeDAO;
import reference.model.Tag;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.exception.ApprovalException;
import workflow.dto.action.DeclineApprovalBlockAction;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("tasks")
@Produces(MediaType.APPLICATION_JSON)
public class TaskService extends RestProvider {

    @GET
    public Response getViewPage() {
        try {
            _Session session = getSession();
            WebFormData params = getWebFormData();

            String[] expandedIds = params.getListOfValuesSilently("expandedIds");
            List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
            int pageSize = session.getPageSize();
            int pageNum = params.getPage();

            TaskDAO taskDAO = new TaskDAO(session);
            TaskFilter taskFilter = setUpTaskFilter(session, params, new TaskFilter());
            SortParams sortParams = SortParams.valueOf(params.getStringValueSilently("sort", "-regDate"), SortParams.desc("regDate"));
            ViewPage<Task> vp;

            if (params.getBoolSilently("execution")) {
                Task parentTask = taskDAO.findById(taskFilter.getParentTask().getId());
                vp = taskDAO.findTaskExecution(parentTask);
            } else {
                vp = taskDAO.findAllWithResponses(taskFilter, sortParams, pageNum, pageSize, expandedIdList);
            }

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            String title;
            String slug = params.getValueSilently("slug");
            switch (slug) {
                case "inbox":
                    title = "tasks_assigned_to_me";
                    break;
                case "my":
                    title = "my_tasks";
                    break;
                case "moderate":
                    title = slug;
                    break;
                default:
                    title = "tasks";
                    break;
            }

            Outcome outcome = new Outcome();
            outcome.setId(title);
            outcome.setTitle(title);
            outcome.addPayload(vp);
            outcome.addPayload("employees", emps);

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();
        WebFormData params = getWebFormData();

        String fsId = params.getFormSesId();
        String projectId = params.getValueSilently("projectId");
        String parentTaskId = params.getValueSilently("parentTaskId");
        String demandId = params.getValueSilently("demand");
        boolean initiative = params.getBoolSilently("initiative");
        boolean isNew = "new".equals(id);

        try {
            EmployeeDAO empDao = new EmployeeDAO(session);
            TaskDAO taskDAO = new TaskDAO(session);
            IUser user = session.getUser();
            Task task;
            TaskDomain taskDomain = new TaskDomain(session);

            if (isNew) {
                Project project = null;
                Demand demand = null;
                Task parentTask = null;

                if (!parentTaskId.isEmpty()) {
                    parentTask = taskDAO.findByIdentefier(parentTaskId);
                }

                if (!projectId.isEmpty()) {
                    ProjectDAO projectDAO = new ProjectDAO(session);
                    project = projectDAO.findByIdentefier(projectId);
                } else if (parentTask != null) {
                    project = parentTask.getProject();
                }

                if (!demandId.isEmpty()) {
                    DemandDAO demandDAO = new DemandDAO(session);
                    demand = demandDAO.findByIdentefier(demandId);
                } else if (parentTask != null) {
                    demand = parentTask.getDemand();
                }

                TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
                TaskType taskType = null;
                try {
                    taskType = taskTypeDAO.findByName("Programming");
                } catch (DAOException e) {
                    Server.logger.exception(e);
                }

                task = taskDomain.composeNew((User) user, project, parentTask, demand, taskType, initiative, 10);
            } else {
                task = taskDAO.findByIdentefier(id);
                if (task == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = taskDomain.getOutcome(task);
            outcome.setId(id);
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, fsId);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(session, taskDomain, task));

            return Response.ok(outcome).build();
        } catch (DAOException | RestServiceException e) {
            return responseException(e);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Task dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Task dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Task taskDto) {
        _Session session = getSession();
        IUser user = session.getUser();

        try {
            validate(taskDto);

            DemandDAO demandDAO = new DemandDAO(session);
            TaskDAO taskDAO = new TaskDAO(session);
            Task task;
            TaskType taskType;

            if (taskDto.isNew()) {
                task = new Task();
                taskDto.setAuthor(user);

                if (taskDto.getParent() != null) {
                    taskDto.setParent(taskDAO.findById(taskDto.getParent().getId()));
                }
            } else {
                task = taskDAO.findById(taskDto.getId());
            }

            if (taskDto.getDemand() != null) {
                taskDto.setDemand(demandDAO.findById(taskDto.getDemand().getId()));
            }
            taskDto.setAttachments(getActualAttachments(task.getAttachments(), taskDto.getAttachments()));

            TaskDomain taskDomain = new TaskDomain(session);
            taskDomain.fillFromDto(task, taskDto);
            IMonitoringDAO mDao = Environment.getMonitoringDAO();

            if (taskDto.isNew()) {
                RegNum rn = new com.exponentus.runtimeobj.RegNum();
                TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
                taskType = taskTypeDAO.findById(taskDto.getTaskType().getId());
                task.setRegNumber(taskType.getPrefix() + rn.getRegNumber(taskType.getPrefix()));
                ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
                lifecycle.start();
                task = taskDAO.add(task, rn);
                //	mDao.postEvent(user, task, "task_was_registered");
            } else {
                task = taskDAO.update(task);
                //	mDao.postEvent(user, task, "task_was_updated");
            }

            if (taskDto.isNew() && task.getStatus() == TaskStatusType.OPEN) {
                new Messages(getAppEnv()).sendToAssignee(task);
            }

            return Response.ok(taskDomain.getOutcome(taskDAO.findById(task.getId()))).build();
        } catch (SecureException | DatabaseException | DAOException e) {
            return responseException(e);
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task entity = dao.findByIdentefier(id);
            if (entity != null) {
                entity.setAttachments(null); // if no on delete cascade
                dao.delete(entity);
            }
            return Response.noContent().build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @Override
    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task entity = dao.findByIdentefier(id);

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

    @POST
    @Path("{id}/action/acknowledged")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskAcknowledged(@PathParam("id") String id) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task task = dao.findByIdentefier(id);

            TaskDomain taskDomain = new TaskDomain(getSession());
            taskDomain.acknowledgedTask(task, (User) getSession().getUser());

            dao.update(task, false);

            new Messages(getAppEnv()).sendOfNewAcknowledging(task);

            return Response.ok(taskDomain.getOutcome(task)).build();
        } catch (SecureException | DAOException | TaskException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/complete")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskComplete(@PathParam("id") String id) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task task = dao.findByIdentefier(id);

            TaskDomain taskDomain = new TaskDomain(getSession());
            taskDomain.completeTask(task);

            dao.update(task, false);

            new Messages(getAppEnv()).sendOfTaskCompleted(task);

            return Response.ok(taskDomain.getOutcome(task)).build();
        } catch (SecureException | DAOException | DatabaseException | TaskException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/cancel")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskCancel(@PathParam("id") String id, @QueryParam("comment") String comment) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task task = dao.findByIdentefier(id);

            TaskDomain taskDomain = new TaskDomain(getSession());
            taskDomain.cancelTask(task, comment);

            dao.update(task, false);

            new Messages(getAppEnv()).sendOfTaskCancelled(task);

            return Response.ok(taskDomain.getOutcome(task)).build();
        } catch (SecureException | DAOException | DTOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/acceptApprovalBlock")
    public Response acceptApprovalBlock(Task dto) {
        try {
            _Session ses = getSession();
            TaskDomain domain = new TaskDomain(ses);
            Task entity = domain.getEntity(dto);
            domain.acceptApprovalBlock(entity, ses.getUser());
            domain.superUpdate(entity);

            Outcome outcome = domain.getOutcome(entity);
            if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED) {
                if (entity.getApprovalResult() == ApprovalResultType.ACCEPTED) {
                    // new workflow.other.Messages(getAppEnv()).notifyOfAccepting(entity, entity.getTitle());
                }
            }
            // new workflow.other.Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            outcome.setTitle("acceptApprovalBlock");
            outcome.setMessage("approval_block_accepted");

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/declineApprovalBlock")
    public Response declineApprovalBlock(DeclineApprovalBlockAction<Task> actionDto) {
        try {
            _Session ses = getSession();
            TaskDomain domain = new TaskDomain(ses);
            Task entity = domain.getEntity(actionDto.getModel());
            domain.declineApprovalBlock(entity, ses.getUser(), actionDto.getComment());
            domain.superUpdate(entity);

            //new workflow.other.Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED) {
                if (entity.getApprovalResult() == ApprovalResultType.REJECTED) {
                    //new workflow.other.Messages(getAppEnv()).notifyOfRejecting(entity, entity.getTitle());
                }
            }
            outcome.setTitle("declineApprovalBlock");
            outcome.setMessage("declineApprovalBlock");

            if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED && entity.getApprovalResult() == ApprovalResultType.REJECTED) {
                if (entity.isVersionsSupport()) {
                    entity = domain.backToRevise(entity);
                    domain.superUpdate(entity);
                }
            }

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    //
    private _ActionBar getActionBar(_Session session, TaskDomain taskDomain, Task task) {
        _ActionBar actionBar = new _ActionBar(session);
        ActionFactory action = new ActionFactory();

        actionBar.addAction(action.close);

        if (task.getApprovalStatus() == ApprovalStatusType.PENDING) {
            ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
            Approver approver = lifecycle.getProcessingBlock().getCurrentApprover();
            if (approver != null && approver.getEmployee().getUserID().equals(session.getUser().getId())) {
                actionBar.addAction(new Action(ActionType.API_ACTION).id("acceptApprovalBlock").url("acceptApprovalBlock").caption("accept"));
                actionBar.addAction(new Action(ActionType.API_ACTION).id("declineApprovalBlock").url("declineApprovalBlock").caption("decline"));
                actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("task_cancel").caption("cancel_task").icon("fa fa-ban"));
            }
        } else {
            if (taskDomain.taskIsEditable(task)) {
                actionBar.addAction(action.saveAndClose);
            }
            if (taskDomain.userCanDoRequest(task, (User) session.getUser())) {
                actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("add_request").caption("new_request"));
            }
            if (taskDomain.userCanDoAcknowledged(task, (User) session.getUser())) {
                actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("task_acknowledged").caption("acknowledged_task"));
            }
            if (taskDomain.userCanDoResolution(task, (User) session.getUser())) {
                actionBar.addAction(
                        new Action(ActionType.CUSTOM_ACTION).id("task_complete").caption("complete_task").icon("fa fa-check-square-o"));
                actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("task_cancel").caption("cancel_task").icon("fa fa-ban"));
            }
            if (taskDomain.userCanAddSubTask(task, (User) session.getUser())) {
                actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("add_subtask").caption("add_subtask"));
            }
        }
        if (taskDomain.taskCanBeDeleted(task)) {
            actionBar.addAction(action.deleteDocument);
        }

        return actionBar;
    }

    private void validate(Task task) throws DTOException {
        DTOException ve = new DTOException();
        UserDAO userDAO = new UserDAO(getSession());

        if (task.getParent() == null && task.getProject() == null) {
            ve.addError("project", "required", "field_is_empty");
        }
        if (task.getParent() == null && task.getTaskType() == null) {
            ve.addError("taskType", "required", "field_is_empty");
        }
        if (task.getBody() == null || task.getBody().isEmpty()) {
            ve.addError("body", "required", "field_is_empty");
        } else if (task.getBody().length() > 10000) {
            ve.addError("body", "maxlen_10000", "field_is_too_long");
        }
        if (task.getStatus() == null) {
            ve.addError("status", "required", "field_is_empty");
        }
        if (task.getPriority() == null) {
            ve.addError("priority", "required", "field_is_empty");
        }
        if (task.getStartDate() == null) {
            ve.addError("startDate", "date", "field_is_empty");
        }
        if (task.getDueDate() == null) {
            ve.addError("dueDate", "date", "field_is_empty");
        }

        if (!task.isInitiative() && (task.getAssignee() == null || task.getAssignee() <= 0)) {
            ve.addError("assignee", "required", "field_is_empty");
        } else if (userDAO.findById(task.getAssignee()) == null) {
            ve.addError("assignee", "required", "user_not_found");
        }

        if (task.getObservers() != null && task.getObservers().size() > 0) {
            for (long uid : task.getObservers()) {
                IUser ou = userDAO.findById(uid);
                if (ou == null) {
                    ve.addError("observers", "required", "observer user not found: id=" + uid);
                }
            }
        }

        if (ve.hasError()) {
            throw ve;
        }
    }

    public TaskFilter setUpTaskFilter(_Session session, WebFormData formData, TaskFilter filter) {

        filter.setProject(formData.getValueSilently("project"));
        filter.setParentTask(formData.getValueSilently("parentTaskId"));
        filter.setTaskType(formData.getValueSilently("taskTypeId"));
        filter.setSearch(formData.getValueSilently("keyWord").toLowerCase());
        filter.setStartDate(formData.getDateSilently("startDate"));
        filter.setDueDate(formData.getDateSilently("dueDate"));

        String taskStatus = formData.getValueSilently("taskStatus");
        if (!taskStatus.isEmpty()) {
            filter.setStatus(TaskStatusType.valueOf(taskStatus));
        }

        String taskPriority = formData.getValueSilently("taskPriority");
        if (!taskPriority.isEmpty()) {
            filter.setPriority(TaskPriorityType.valueOf(taskPriority));
        }

        long assigneeUserId = (long) formData.getNumberDoubleValueSilently("assigneeUserId", 0);
        if (assigneeUserId > 0) {
            filter.setAssigneeUserId(assigneeUserId);
        }

        String slug = formData.getValueSilently("slug");
        switch (slug) {
            case "inbox":
                filter.setAssigneeUserId(session.getUser().getId());
                break;
            case "my":
                filter.setAuthor((User) session.getUser());
                break;
            case "initiative":
                filter.setInitiative(true);
                break;
            case "moderate":
                filter.setModerate(true);
                break;
            default:
                break;
        }

        if (formData.containsField("tagIds")) {
            List<Tag> tags = new ArrayList<>();
            String[] tagIds = formData.getListOfValuesSilently("tagIds");
            for (String tid : tagIds) {
                Tag tag = new Tag();
                tag.setId(UUID.fromString(tid));
                tags.add(tag);
            }
            filter.setTags(tags);
        }

        filter.setParentOnly(formData.getBoolSilently("parentOnly"));
        filter.setTreeMode(formData.getBoolSilently("isTreeMode"));

        return filter;
    }
}
