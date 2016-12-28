package projects.services;

import administrator.dao.UserDAO;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.*;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import com.exponentus.user.SuperUser;
import com.exponentus.webserver.servlet.UploadedFile;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.persistence.exceptions.DatabaseException;
import org.joda.time.LocalDate;
import projects.dao.ProjectDAO;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
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

    private Outcome outcome = new Outcome();

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
            _SortParams sortParams = getWebFormData().getSortParams(_SortParams.desc("regDate"));

            ViewPage<Task> vp = taskDAO.findAllWithResponses(taskFilter, sortParams, pageNum, pageSize, expandedIdList);

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = empDao.findAll().stream()
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();
        _WebFormData formData = getWebFormData();

        IUser<Long> user = session.getUser();
        Task task;
        try {
            boolean isNew = "new".equals(id);
            if (!isNew) {
                TaskDAO taskDAO = new TaskDAO(session);
                task = taskDAO.findById(id);

                if (task == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }

                if (task.getParent() != null) {
                    outcome.addPayload("parentTask", task.getParent());
                }

                outcome.addPayload(new ACL(task));
            } else {
                task = new Task();
                task.setAuthor(user);
                task.setInitiative(formData.getBoolSilently("initiative"));
                TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
                try {
                    task.setTaskType(taskTypeDAO.findByName("Programming"));
                } catch (DAOException e) {
                    Server.logger.errorLogEntry(e);
                }
                task.setStatus(TaskStatusType.OPEN);

                String projectId = formData.getValueSilently("projectId");
                if (!projectId.isEmpty()) {
                    ProjectDAO projectDAO = new ProjectDAO(session);
                    Project project = projectDAO.findById(projectId);
                    task.setProject(project);
                    task.setObservers(project.getObservers());
                }

                String parentTaskId = formData.getValueSilently("parentTaskId");
                if (!parentTaskId.isEmpty()) {
                    TaskDAO taskDAO = new TaskDAO(session);
                    Task parentTask = taskDAO.findById(parentTaskId);
                    task.setProject(parentTask.getProject());
                    task.setParent(parentTask);
                    task.setTitle(parentTask.getTitle());
                    task.setPriority(parentTask.getPriority());
                    task.setStartDate(parentTask.getStartDate());
                    task.setDueDate(parentTask.getDueDate());
                    task.setTags(parentTask.getTags());
                    task.setObservers(parentTask.getObservers());

                    outcome.addPayload("parentTask", parentTask);
                } else {
                    task.setStartDate(new Date());
                    task.setDueDate(new LocalDate(task.getStartDate()).plusDays(10).toDate());
                }

                String fsId = formData.getFormSesId();

                List<String> formFiles;
                Object obj = session.getAttribute(fsId);
                if (obj == null) {
                    formFiles = new ArrayList<>();
                } else {
                    _FormAttachments fAtts = (_FormAttachments) obj;
                    formFiles = fAtts.getFiles().stream().map(TempFile::getRealFileName).collect(Collectors.toList());
                }

                List<IPOJOObject> filesToPublish = new ArrayList<>();

                for (String fn : formFiles) {
                    UploadedFile uf = (UploadedFile) session.getAttribute(fsId + "_file" + fn);
                    if (uf == null) {
                        uf = new UploadedFile();
                        uf.setName(fn);
                        session.setAttribute(fsId + "_file" + fn, uf);
                    }
                    filesToPublish.add(uf);
                }
                // addContent(new _POJOListWrapper<>(filesToPublish, session));
                outcome.addPayload("filesToPublish", filesToPublish);
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
            empIds.add(task.getAuthorId());
            for (Employee e : empDao.findAllByUserIds(empIds)) {
                emps.put(e.getUserID(), e);
            }

            outcome.setId(id);
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload(task);
            outcome.addPayload(getActionBar(session, task));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Task taskForm) {
        _Validation validation = validate(taskForm);
        if (validation.hasError()) {
            return responseValidationError(validation);
        }

        _Session session = getSession();
        try {
            UserDAO userDAO = new UserDAO(session);
            TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
            TaskDAO dao = new TaskDAO(session);
            Task task;
            TaskType taskType;
            boolean isNew = "new".equals(id);

            if (isNew) {
                task = new Task();
                task.setAuthor(session.getUser());
                task.setStatus(TaskStatusType.OPEN);
                task.setInitiative(taskForm.isInitiative());

                if (taskForm.getParent() != null) {
                    Task parentTask = dao.findById(taskForm.getParent().getId());
                    task.setParent(parentTask);
                    task.setProject(parentTask.getProject());
                    task.addReaders(parentTask.getReaders());
                }
            } else {
                task = dao.findById(id);
            }

            if (task.getParent() == null) {
                task.setProject(taskForm.getProject());
            }
            taskType = taskTypeDAO.findById(taskForm.getTaskType().getId());
            String title = taskForm.getTitle();
            if (title == null || title.isEmpty()) {
                // TODO here it needed to vanish from markdown symbols
                title = StringUtils.abbreviate(taskForm.getBody(), 140);
            }
            task.setTitle(title);
            task.setTaskType(taskType);
            task.setPriority(taskForm.getPriority());
            task.setStartDate(taskForm.getStartDate());
            task.setDueDate(taskForm.getDueDate());
            task.setBody(taskForm.getBody());
            task.setTags(taskForm.getTags());

            if (task.getStartDate() == null) {
                task.setStatus(TaskStatusType.DRAFT);
            } else {
                if (task.getStatus() == TaskStatusType.DRAFT || task.getStatus() == TaskStatusType.OPEN
                        || task.getStatus() == TaskStatusType.WAITING) {
                    if (new Date().before(task.getStartDate())) {
                        task.setStatus(TaskStatusType.WAITING);
                    } else {
                        task.setStatus(TaskStatusType.OPEN);
                    }
                }
            }

            if (getAppEnv().appName.equals("HelpDesk") && taskForm.getDemand() != null) {
                task.setDemand(taskForm.getDemand());
            }

            IUser<Long> assigneeUser = userDAO.findById(taskForm.getAssignee());
            task.setAssignee(assigneeUser.getId());
            task.setCustomerObservation(taskForm.isCustomerObservation());
            task.setAttachments(getActualAttachments(task.getAttachments()));
            task.setObservers(taskForm.getObservers() != null ? taskForm.getObservers() : new ArrayList<>());

            if (isNew) {
                if (task.getStatus() != TaskStatusType.DRAFT) {
                    task.addReader(assigneeUser);
                    task.addReaders(task.getObservers());
                }
                RegNum rn = new com.exponentus.runtimeobj.RegNum();
                task.setRegNumber(taskType.getPrefix() + rn.getRegNumber(taskType.prefix));
                task = dao.add(task, rn);
            } else {
                if (task.getStatus() != TaskStatusType.DRAFT) {
                    task.addReader(assigneeUser);
                    task.addReaders(task.getObservers());
                }
                task = dao.update(task);
            }

            if (task.getParent() != null) {
                task.getParent().addReaders(task.getReaders());
                new TaskDAO(new _Session(new SuperUser())).update(task.getParent());
            }

            if (isNew && task.getStatus() == TaskStatusType.OPEN) {
                new Messages(getAppEnv()).sendToAssignee(task);
            }

            task = dao.findById(task.getId());
            outcome.setId(id);
            outcome.addPayload(task);

            return Response.ok(outcome).build();
        } catch (SecureException | DatabaseException | DAOException e) {
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

    @DELETE
    @Path("{id}/attachments/{attachmentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {
        return deleteAttachmentFromSessionFormAttachments(attachmentId);
    }

    @POST
    @Path("{id}/action/complete")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskComplete(@PathParam("id") String id) {
        Outcome outcome = new Outcome();
        outcome.setId(id);

        TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
        Task task = dao.findById(id);

        try {
            if (task.getStatus() == TaskStatusType.COMPLETED) {
                outcome.setMessage("task status is completed");
                return Response.ok(outcome).build();
            }

            task.setStatus(TaskStatusType.COMPLETED);
            dao.update(task);

            new Messages(getAppEnv()).sendOfTaskCompleted(task);

            return Response.ok(outcome).build();
        } catch (SecureException | DAOException | DatabaseException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/cancel")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskCancel(@PathParam("id") String id, @QueryParam("comment") String comment) {
        Outcome outcome = new Outcome();
        outcome.setId(id);

        TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
        Task task = dao.findById(id);

        try {
            if (task.getStatus() == TaskStatusType.CANCELLED) {
                outcome.setMessage("task status is cancelled");
                return Response.ok(outcome).build();
            }

            task.setStatus(TaskStatusType.CANCELLED);
            task.setCancellationComment(comment);
            dao.update(task);

            new Messages(getAppEnv()).sendOfTaskCancelled(task);

            return Response.ok(outcome).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/action/acknowledged")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doTaskAcknowledged(@PathParam("id") String id) {
        Outcome outcome = new Outcome();
        outcome.setId(id);

        TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
        Task task = dao.findById(id);

        try {
            if (!task.getAssignee().equals(getSession().getUser().getId())) {
                outcome.setMessage("not_assignee_user");
                return Response.status(Response.Status.BAD_REQUEST).entity(outcome).build();
            } else if (task.getStatus() != TaskStatusType.OPEN && task.getStatus() != TaskStatusType.WAITING) {
                outcome.setMessage("task_status_is_not_open");
                return Response.status(Response.Status.BAD_REQUEST).entity(outcome).build();
            }

            task.setStatus(TaskStatusType.PROCESSING);
            dao.update(task);

            new Messages(getAppEnv()).sendOfNewAcknowledging(task);

            return Response.ok(outcome).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    //
    private _ActionBar getActionBar(_Session session, Task task) {

        _ActionBar actionBar = new _ActionBar(session);
        if (task.isEditable()) {
            actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
            if (!task.isNew()) {
                actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
            }
        }

        if (!task.isNew()) {
            RequestDAO requestDAO = new RequestDAO(session);
            if (task.getAssignee().equals(session.getUser().getId())) {
                if (task.getStatus() == TaskStatusType.OPEN || task.getStatus() == TaskStatusType.WAITING) {
                    actionBar.addAction(new _Action("", "", "task_acknowledged"));
                } else if (task.getStatus() == TaskStatusType.PROCESSING) {
                    if (requestDAO.findUnResolvedRequest(task) == null) {
                        actionBar.addAction(new _Action("", "", "add_request"));
                    }
                }
            }

            if (task.getAuthor().getId().equals(session.getUser().getId()) || session.getUser().isSuperUser()) {
                if ((task.getStatus() != TaskStatusType.COMPLETED && task.getStatus() != TaskStatusType.CANCELLED)) {
                    actionBar.addAction(new _Action("", "", "task_complete"));
                    actionBar.addAction(new _Action("", "", "task_cancel"));
                }
            }

            // if (task.getStatus() != TaskStatusType.COMPLETED &&
            // task.getStatus() != TaskStatusType.CANCELLED) {
            actionBar.addAction(new _Action("", "", "add_subtask"));
            // }
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
                    ve.addError("observerUserIds", "required", "observer user not found");
                }
            }
        }

        return ve;
    }

    public static TaskFilter setUpTaskFilter(_Session session, _WebFormData formData, TaskFilter filter) {

        filter.setProject(formData.getValueSilently("projectId"));
        filter.setParentTask(formData.getValueSilently("parentTaskId"));
        filter.setTaskType(formData.getValueSilently("taskTypeId"));
        filter.setSearch(formData.getValueSilently("keyWord").toLowerCase());
        filter.setStartDate(formData.getDateSilently("startDate"));
        filter.setDueDate(formData.getDateSilently("dueDate"));

        String parentOnly = formData.getValueSilently("parentOnly");
        if (!filter.hasSearch() && !parentOnly.equals("false")) {
            filter.setParentOnly(true);
        } else {
            filter.setParentOnly(false);
        }

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
            filter.setAuthorId(session.getUser().getId());
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
