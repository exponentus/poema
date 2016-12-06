package projects.page.task;

import administrator.dao.UserDAO;
import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.ACL;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.*;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import com.exponentus.user.SuperUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;
import helpdesk.dao.DemandDAO;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.persistence.exceptions.DatabaseException;
import org.joda.time.LocalDate;
import projects.dao.ProjectDAO;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
import reference.dao.TagDAO;
import reference.dao.TaskTypeDAO;
import reference.model.Tag;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.*;
import java.util.stream.Collectors;

public class TaskForm extends _DoForm {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        devPrint(formData);
        IUser<Long> user = session.getUser();
        Task task;
        try {
            String id = formData.getValueSilently("taskId");

            if (!id.isEmpty()) {
                TaskDAO taskDAO = new TaskDAO(session);
                task = taskDAO.findById(id);

                if (task == null) {
                    setNotFound();
                    return;
                }

                if (formData.containsField("attachment")) {
                    doGetAttachment(session, formData, task);
                    return;
                }

                if (task.getParent() != null) {
                    addContent("parentTask", task.getParent());
                }

                addContent(task.getAttachments());
                addContent(new ACL(task));
            } else {
                task = new Task();
                task.setAuthor(user);
                task.setInitiative(formData.getBoolSilently("initiative"));
                TaskTypeDAO tDao = new TaskTypeDAO(session);
                try {
                    task.setTaskType(tDao.findByName("Programming"));
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
                    addContent("parentTask", parentTask);
                } else {
                    task.setStartDate(new Date());
                    task.setDueDate(new LocalDate(task.getStartDate()).plusDays(10).toDate());
                }

                String fsId = formData.getValueSilently(EnvConst.FSID_FIELD_NAME);

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
                addContent(new _POJOListWrapper<>(filesToPublish, session));
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
            addDataContent("employees", emps);

            addContent(task);
            addContent(getActionBar(session, task));
        } catch (DAOException e) {
            Server.logger.errorLogEntry(e);
            setBadRequest();
        }
    }

    @Override
    public void doPOST(_Session session, _WebFormData formData) {
        devPrint(formData);
        LanguageCode lang = session.getLang();
        try {
            String parentTaskId = formData.getValueSilently("parentTaskId");
            boolean isSubTask = !parentTaskId.isEmpty();

            _Validation ve = validate(formData, lang, isSubTask);
            if (ve.hasError()) {
                setBadRequest();
                setValidation(ve);
                return;
            }

            UserDAO userDAO = new UserDAO(session);
            ProjectDAO projectDAO = new ProjectDAO(session);
            DemandDAO demandDAO = new DemandDAO(session);
            TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
            TaskDAO dao = new TaskDAO(session);
            Task parentTask = null;
            Task task;
            TaskType taskType = null;
            String id = formData.getValueSilently("taskId");
            boolean isNew = id.isEmpty();

            if (isNew) {
                task = new Task();
                task.setAuthor(session.getUser());
                task.setStatus(TaskStatusType.OPEN);
                task.setInitiative(formData.getBoolSilently("initiative"));
            } else {
                task = dao.findById(id);
            }

            if (isSubTask) {
                parentTask = dao.findById(parentTaskId);
                task.setParent(parentTask);
                task.addReaders(parentTask.getReaders());
            }

            task.setProject(projectDAO.findById(formData.getValue("projectId")));
            taskType = taskTypeDAO.findById(formData.getValue("taskTypeId"));
            String title = formData.getValueSilently("title");
            if (title.isEmpty()) {
                // TODO here it needed to vanish from markdown symbols
                title = StringUtils.abbreviate(formData.getValueSilently("body"), 140);
            }
            task.setTitle(title);
            task.setTaskType(taskType);
            task.setPriority(TaskPriorityType.valueOf(formData.getValueSilently("priority")));

            String sd = formData.getValueSilently("startDate");
            if (sd.isEmpty()) {
                task.setStatus(TaskStatusType.DRAFT);
                task.setStartDate(null);
            } else {
                if (task.getStatus() == TaskStatusType.DRAFT || task.getStatus() == TaskStatusType.OPEN
                        || task.getStatus() == TaskStatusType.WAITING) {
                    task.setStartDate(TimeUtil.stringToDate(sd));
                    if (new Date().before(task.getStartDate())) {
                        task.setStatus(TaskStatusType.WAITING);
                    } else {
                        task.setStatus(TaskStatusType.OPEN);
                    }
                }
            }
            task.setDueDate(TimeUtil.stringToDate(formData.getValueSilently("dueDate")));
            task.setBody(formData.getValueSilently("body"));
            IUser<Long> assigneeUser = userDAO.findById(formData.getNumberValueSilently("assigneeUserId", 0));

            if (!formData.getValueSilently("demandId").isEmpty()) {
                task.setDemand(demandDAO.findById(formData.getValueSilently("demandId")));
            }

            task.setAssignee(assigneeUser.getId());
            task.setAttachments(getActualAttachments(task.getAttachments()));
            task.setCustomerObservation(Boolean.valueOf(formData.getValue("customerObservation")));

            List<Long> ouIds = new ArrayList<>();
            if (!formData.getValueSilently("observerUserIds").isEmpty()) {
                ouIds = Arrays.stream(formData.getValueSilently("observerUserIds").split(",")).map(Long::valueOf)
                        .collect(Collectors.toList());
                for (long uid : ouIds) {
                    IUser<Long> ou = userDAO.findById(uid);
                    if (ou == null) {
                        addContent("error", "observer user not found");
                        setBadRequest();
                        return;
                    }
                }
            }
            task.setObservers(ouIds);

            if (formData.containsField("tagIds")) {
                if (formData.getValueSilently("tagIds").isEmpty()) {
                    task.setTags(new ArrayList<>());
                } else {
                    String[] tagIds = formData.getValueSilently("tagIds").split(",");
                    if (tagIds.length > 0) {
                        TagDAO tagDAO = new TagDAO(session);
                        List<UUID> tagUIds = Arrays.stream(tagIds).map(UUID::fromString).collect(Collectors.toList());
                        List<Tag> tags = tagDAO.findAllByIds(tagUIds, 0, 0).getResult();
                        task.setTags(tags);
                    }
                }
            }

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

            if (isSubTask) {
                parentTask.addReaders(task.getReaders());
                new TaskDAO(new _Session(new SuperUser())).update(parentTask);
            }

            if (isNew && task.getStatus() == TaskStatusType.OPEN) {
                new Messages(getCurrentAppEnv()).sendToAssignee(task);
            }

            addContent(task);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        } catch (_Exception | DatabaseException e) {
            setBadRequest();
            logError(e);
        } catch (DAOException e) {
            setBadRequest();
            logError(e);
        }
    }

    @Override
    public void doPUT(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        String action = formData.getValueSilently("_action");

        if (taskId.isEmpty() || action.isEmpty()) {
            addContent("error", "taskId or _action empty");
            setBadRequest();
            return;
        }

        switch (action) {
            case "complete":
                doTaskComplete(session, taskId);
                break;
            case "cancel":
                doTaskCancel(session, taskId, formData.getValueSilently("comment"));
                break;
            case "acknowledged":
                doAcknowledged(session, taskId);
                break;
            default:
                addValue("error", "unknown action");
                break;
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String fsId = formData.getValueSilently(EnvConst.FSID_FIELD_NAME);
        String attachmentId = formData.getValueSilently("attachmentId");
        _FormAttachments formFiles = session.getFormAttachments(fsId);
        AttachmentDAO attachmentDAO;
        try {
            attachmentDAO = new AttachmentDAO(session);
            Attachment attachment = attachmentDAO.findById(attachmentId);
            if (attachment != null) {
                formFiles.removeFile("attachment", attachment.getRealFileName());
            }
        } catch (DAOException e) {
            logError(e);
            setBadRequest();
            return;
        }
    }

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

    private _Validation validate(_WebFormData formData, LanguageCode lang, boolean isSubTask) {
        _Validation ve = new _Validation();

        if (!isSubTask && formData.getValueSilently("projectId").isEmpty()) {
            ve.addError("projectId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (!isSubTask && formData.getValueSilently("taskTypeId").isEmpty()) {
            ve.addError("taskTypeId", "required", getLocalizedWord("field_is_empty", lang));
        }
        /*
		 * if (formData.getValueSilently("title").isEmpty()) {
		 * ve.addError("title", "required", getLocalizedWord("field_is_empty",
		 * lang)); } else if (formData.getValueSilently("title").length() > 140)
		 * { ve.addError("title", "maxlen_140",
		 * getLocalizedWord("field_is_too_long", lang)); }
		 */
        if (formData.getValueSilently("body").isEmpty()) {
            ve.addError("body", "required", getLocalizedWord("field_is_empty", lang));
        } else if (formData.getValueSilently("body").length() > 10000) {
            ve.addError("body", "maxlen_10000", getLocalizedWord("field_is_too_long", lang));
        }
        if (formData.getValueSilently("status").isEmpty()) {
            ve.addError("status", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("priority").isEmpty()) {
            ve.addError("priority", "required", getLocalizedWord("field_is_empty", lang));
        }

        String sDate = formData.getValueSilently("startDate");
        if (sDate.isEmpty()) {
            // ve.addError("startDate", "required",
            // getLocalizedWord("field_is_empty", lang));
        } else if (TimeUtil.stringToDate(sDate) == null) {
            ve.addError("startDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
        }

        String dDate = formData.getValueSilently("dueDate");
        if (dDate.isEmpty()) {
            ve.addError("dueDate", "required", getLocalizedWord("field_is_empty", lang));
        } else if (TimeUtil.stringToDate(dDate) == null) {
            ve.addError("dueDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
        }

        if (!formData.getBoolSilently("initiative") && formData.getNumberValueSilently("assigneeUserId", 0) == 0) {
            ve.addError("assigneeUserId", "required", getLocalizedWord("field_is_empty", lang));
        }

        return ve;
    }

    private void doTaskComplete(_Session session, String taskId) {
        TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
        Task task = dao.findById(taskId);

        try {
            if (task.getStatus() == TaskStatusType.COMPLETED) {
                addContent("info", "task status is completed");
                return;
            }

            task.setStatus(TaskStatusType.COMPLETED);
            dao.update(task);

            new Messages(getCurrentAppEnv()).sendOfTaskCompleted(task);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        } catch (DatabaseException e) {
            setBadRequest();
            logError(e);
        } catch (DAOException e) {
            setBadRequest();
            logError(e);
        }
    }

    private void doTaskCancel(_Session session, String taskId, String comment) {
        TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
        Task task = dao.findById(taskId);

        try {
            if (task.getStatus() == TaskStatusType.CANCELLED) {
                addContent("info", "task status is cancelled");
                return;
            }

            task.setStatus(TaskStatusType.CANCELLED);
            task.setCancellationComment(comment);
            dao.update(task);

            new Messages(getCurrentAppEnv()).sendOfTaskCancelled(task);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        } catch (DAOException e) {
            setBadRequest();
            logError(e);
        }
    }

    private void doAcknowledged(_Session session, String taskId) {
        TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
        Task task = dao.findById(taskId);

        try {
            if (!task.getAssignee().equals(session.getUser().getId())) {
                addContent("error", "not_assignee_user");
                setBadRequest();
                return;
            } else if (task.getStatus() != TaskStatusType.OPEN && task.getStatus() != TaskStatusType.WAITING) {
                addContent("error", "task_status_is_not_open");
                setBadRequest();
                return;
            }

            task.setStatus(TaskStatusType.PROCESSING);
            dao.update(task);

            new Messages(getCurrentAppEnv()).sendOfNewAcknowledging(task);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        } catch (DAOException e) {
            setBadRequest();
            logError(e);
        }
    }
}
