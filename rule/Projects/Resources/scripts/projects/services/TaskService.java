package projects.services;

import administrator.dao.UserDAO;
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
import com.exponentus.user.IUser;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.domain.impl.TaskDomain;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
import reference.dao.TaskTypeDAO;
import reference.model.Tag;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("tasks")
public class TaskService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {
        try {
            _Session session = getSession();

            String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
            List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
            int pageSize = session.pageSize;
            int pageNum = getWebFormData().getPage();

            TaskDAO taskDAO = new TaskDAO(session);
            TaskFilter taskFilter = setUpTaskFilter(session, getWebFormData(), new TaskFilter());
            SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
            ViewPage<Task> vp;

            if (getWebFormData().getBoolSilently("execution")) {
                Task parentTask = taskDAO.findById(taskFilter.getParentTask().getId());
                vp = taskDAO.findTaskExecution(parentTask);
            } else {
                vp = taskDAO.findAllWithResponses(taskFilter, sortParams, pageNum, pageSize, expandedIdList);
            }

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            String title;
            String tasksFor = getWebFormData().getValueSilently("for");
            switch (tasksFor) {
                case "inbox":
                    title = "tasks_assigned_to_me";
                    break;
                case "my":
                    title = "my_tasks";
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
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();
        WebFormData formData = getWebFormData();

        String fsId = formData.getFormSesId();
        String projectId = formData.getValueSilently("projectId");
        String parentTaskId = formData.getValueSilently("parentTaskId");
        boolean initiative = formData.getBoolSilently("initiative");
        boolean isNew = "new".equals(id);

        try {
            TaskDAO taskDAO = new TaskDAO(session);
            IUser<Long> user = session.getUser();
            Task task;
            TaskDomain taskDomain;

            if (!isNew) {
                task = taskDAO.findById(id);
                if (task == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }

                taskDomain = new TaskDomain(task);
            } else {
                Project project = null;
                Task parentTask = null;

                if (!parentTaskId.isEmpty()) {
                    parentTask = taskDAO.findById(parentTaskId);
                }

                if (!projectId.isEmpty()) {
                    ProjectDAO projectDAO = new ProjectDAO(session);
                    project = projectDAO.findById(projectId);
                } else if (parentTask != null) {
                    project = parentTask.getProject();
                }

                TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
                TaskType taskType = null;
                try {
                    taskType = taskTypeDAO.findByName("Programming");
                } catch (DAOException e) {
                    Server.logger.errorLogEntry(e);
                }

                task = new Task();
                taskDomain = new TaskDomain(task);
                taskDomain.composeNew((User) user, project, parentTask, taskType, initiative, 10);
            }

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = new HashMap<>();
            List<Long> empIds = new ArrayList<>();
            if (task.getAssignee() != null) {
                empIds.add(task.getAssignee());
            }
            if (task.getObservers() != null) {
                empIds.addAll(task.getObservers());
            }
            empIds.add(task.getAuthor().getId());
            for (Employee e : empDao.findAllByUserIds(empIds)) {
                emps.put(e.getUserID(), e);
            }

            Outcome outcome = taskDomain.getOutcome();

            outcome.setId(id);
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, fsId);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(session, taskDomain));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Task taskDto) {
        _Validation validation = validate(taskDto);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        _Session session = getSession();
        try {
            TaskDAO taskDAO = new TaskDAO(session);
            Task task;
            TaskType taskType;
            boolean isNew = "new".equals(id);

            if (isNew) {
                task = new Task();
                taskDto.setAuthor(session.getUser());

                if (taskDto.getParent() != null) {
                    taskDto.setParent(taskDAO.findById(taskDto.getParent().getId()));
                }
            } else {
                task = taskDAO.findById(id);
            }

            taskDto.setAttachments(getActualAttachments(task.getAttachments(), taskDto.getAttachments()));

            TaskDomain taskDomain = new TaskDomain(task);
            taskDomain.fillFromDto(taskDto);

            if (isNew) {
                RegNum rn = new com.exponentus.runtimeobj.RegNum();
                TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
                taskType = taskTypeDAO.findById(taskDto.getTaskType().getId());
                task.setRegNumber(taskType.getPrefix() + rn.getRegNumber(taskType.getPrefix()));
                task = taskDAO.add(task, rn);
            } else {
                task = taskDAO.update(task);
            }

            if (isNew && task.getStatus() == TaskStatusType.OPEN) {
                new Messages(getAppEnv()).sendToAssignee(task);
            }

            return Response.ok((new TaskDomain(taskDAO.findById(task.getId()))).getOutcome()).build();
        } catch (SecureException | DatabaseException | DAOException e) {
            return responseException(e);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task entity = dao.findById(id);
            if (entity != null) {
                entity.setAttachments(null); // if no on delete cascade
                dao.delete(entity);
            }
            return Response.noContent().build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/acknowledged")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskAcknowledged(@PathParam("id") String id) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task task = dao.findById(id);

            TaskDomain taskDomain = new TaskDomain(task);
            taskDomain.acknowledgedTask((User) getSession().getUser());

            dao.update(task, false);

            new Messages(getAppEnv()).sendOfNewAcknowledging(task);

            return Response.ok(taskDomain.getOutcome()).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/complete")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskComplete(@PathParam("id") String id) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task task = dao.findById(id);

            TaskDomain taskDomain = new TaskDomain(task);
            taskDomain.completeTask();

            dao.update(task, false);

            new Messages(getAppEnv()).sendOfTaskCompleted(task);

            return Response.ok(taskDomain.getOutcome()).build();
        } catch (SecureException | DAOException | DatabaseException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/cancel")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskCancel(@PathParam("id") String id, @QueryParam("comment") String comment) {
        try {
            TaskDAO dao = new TaskDAO(getSession());
            Task task = dao.findById(id);

            TaskDomain taskDomain = new TaskDomain(task);
            taskDomain.cancelTask(comment);

            dao.update(task, false);

            new Messages(getAppEnv()).sendOfTaskCancelled(task);

            return Response.ok(taskDomain.getOutcome()).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    //
    private _ActionBar getActionBar(_Session session, TaskDomain taskDomain) {
        _ActionBar actionBar = new _ActionBar(session);

        if (taskDomain.taskIsEditable()) {
            actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));

            if (taskDomain.taskCanBeDeleted()) {
                actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
            }
        }

        if (taskDomain.userCanDoAcknowledged((User) session.getUser())) {
            actionBar.addAction(new _Action("acknowledged_task", "", "task_acknowledged"));
        }

        if (taskDomain.userCanDoRequest((User) session.getUser())) {
            actionBar.addAction(new _Action("", "", "add_request"));
        }

        if (taskDomain.userCanDoResolution((User) session.getUser())) {
            actionBar.addAction(new _Action("complete_task", "", "task_complete"));
            actionBar.addAction(new _Action("cancel_task", "", "task_cancel"));
        }

        if (taskDomain.userCanAddSubTask((User) session.getUser())) {
            actionBar.addAction(new _Action("add_subtask", "", "add_subtask"));
        }
        return actionBar;
    }

    private _Validation validate(Task task) {
        _Validation ve = new _Validation();
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
            ve.addError("assigneeUserId", "required", "field_is_empty");
        } else if (userDAO.findById(task.getAssignee()) == null) {
            ve.addError("assigneeUserId", "required", "user_not_found");
        }

        if (task.getObservers() != null && task.getObservers().size() > 0) {
            for (long uid : task.getObservers()) {
                IUser<Long> ou = userDAO.findById(uid);
                if (ou == null) {
                    ve.addError("observerUserIds", "required", "observer user not found: id=" + uid);
                }
            }
        }

        return ve;
    }

    public static TaskFilter setUpTaskFilter(_Session session, WebFormData formData, TaskFilter filter) {

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

        String tasksFor = formData.getValueSilently("for");
        if ("inbox".equals(tasksFor)) {
            filter.setAssigneeUserId(session.getUser().getId());
        } else if ("my".equals(tasksFor)) {
            filter.setAuthor((User) session.getUser());
        } else if ("initiative".equals(tasksFor)) {
            filter.setInitiative(true);
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

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/tasks");
        sd.addMethod(m);
        return sd;
    }
}
