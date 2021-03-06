package projects.domain;

import administrator.dao.UserDAO;
import administrator.model.User;
import calendar.dao.EventDAO;
import calendar.dao.ReminderDAO;
import calendar.model.Event;
import calendar.model.embedded.TimeRange;
import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.init.DefaultDataConst;
import com.exponentus.common.model.constants.*;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.ACL;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.exception.DAOExceptionType;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.exception.RestServiceException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.rest.validation.exception.DTOExceptionType;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import com.exponentus.util.StringUtil;
import helpdesk.model.Demand;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.LocalDate;
import projects.dao.TaskDAO;
import projects.init.ModuleConst;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import projects.other.Messages;
import reference.dao.TaskTypeDAO;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.domain.ApprovalDomain;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

public class TaskDomain extends ApprovalDomain<Task> {

    public static String MODERATOR_ROLE_NAME = ModuleConst.ROLES[0];

    public TaskDomain(_Session ses) throws DAOException {
        super(ses);
        dao = new TaskDAO(ses);
    }

    public Task composeNew(User user, Project project, Task parentTask, Demand demand, TaskType taskType, boolean initiative,
                           int dueDateRange) throws DAOException, RestServiceException {
        Task task = new Task();
        task.setAuthor(user);
        task.setTaskType(taskType);
        task.setStatus(StatusType.DRAFT);
        task.setProject(project);
        if (demand != null) {
            task.setDemand(demand);
        }

        if (project == null && demand != null) {
            task.setProject(demand.getProject());
        }

        if (task.getProject() != null) {
            task.setAssignee(task.getProject().getProgrammer());
        }

        List<Long> allObservers = new ArrayList<>();

        if (parentTask != null) {
            task.setParent(parentTask);
            task.setTitle(parentTask.getTitle());
            task.setPriority(parentTask.getPriority());
            task.setTags(parentTask.getTags());
            allObservers.addAll(parentTask.getObservers());
        }

        task.setStartDate(new Date());
        task.setDueDate(new LocalDate(task.getStartDate()).plusDays(dueDateRange).toDate());
        if (task.getProject() != null) {
            allObservers.addAll(task.getProject().getObservers());
        }
        task.setObservers(allObservers);

        EmployeeDAO empDao = new EmployeeDAO(ses);
        ViewPage<Employee> moderators = empDao.findByRole(MODERATOR_ROLE_NAME);
        if (moderators.getCount() > 0) {
            task.setBlocks(getModeratorBlock(moderators.getResult()));
        } else {
            throw new RestServiceException("There is no user assigned to the \"" + MODERATOR_ROLE_NAME + "\" role");
        }

        return task;
    }

    @Override
    public Task fillFromDto(Task dto, IValidation<Task> validation, String formSesId) throws DTOException, DAOException {
        validation.check(dto);

        Task task;

        if (dto.isNew()) {
            task = new Task();
            task.setAuthor(ses.getUser());
            if (dto.getParent() != null) {
                dto.setParent(dao.findById(dto.getParent().getId()));
                task.setParent(dto.getParent());
            }
        } else {
            task = dao.findById(dto.getId());
            java.time.LocalDate previousStartDate = task.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            java.time.LocalDate startDate = dto.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            long daysBetweenStartAndPreviousStartDate = DAYS.between(previousStartDate, startDate);

            if (daysBetweenStartAndPreviousStartDate < 0) {
                throw new DTOException().addError("startDate", "date_gt:" + new Date().getTime(), "field_date_is_incorrect");
            }
        }

        Date startDate = dto.getStartDate();

        if (validation instanceof EntityService.EmptyValidation) {
            task.setStatus(StatusType.DRAFT);
        } else {
            if (task.getStatus() == StatusType.DRAFT || task.getStatus() == StatusType.UNKNOWN) {

                if (new Date().before(startDate)) {
                    task.setStatus(StatusType.WAITING);
                } else {
                    task.setStatus(StatusType.OPEN);
                }

                settingUpRevision(task);
            } else if (task.getStatus() == StatusType.OPEN && new Date().before(startDate)) {
                task.setStatus(StatusType.WAITING);
            }
        }

        String title = dto.getTitle();
        if (task.getStatus() != StatusType.DRAFT && StringUtils.isBlank(title)) {
            title = StringUtils.abbreviate(StringUtil.cleanFromMarkdown(dto.getBody()), 140);
        }
        task.setTitle(title);
        task.setProject(dto.getProject());
        task.setTaskType(new TaskTypeDAO(ses).findById(dto.getTaskType().getId()));
        task.setPriority(dto.getPriority());
        task.setBody(dto.getBody());
        task.setTags(dto.getTags());
        task.setStartDate(startDate);
        task.setDueDate(dto.getDueDate());
        task.setDemand(dto.getDemand());
        if (task.getDemand() != null) {
            task.setInitiative(true);
        }
        User user = new User();
        user.setId(dto.getAssignee());
        changeAssignee(task, user);
        task.setCustomerObservation(dto.isCustomerObservation());
        task.setAttachments(getActualAttachments(task.getAttachments(), dto.getAttachments(), formSesId));
        task.setObservers(dto.getObservers() != null ? dto.getObservers() : new ArrayList<>());
        calculateReaders(task);
        return task;
    }

    public void saveTask(Task task) throws SecureException, DAOException, DTOException, ApprovalException, RestServiceException {
        if (task.getStatus() == StatusType.DRAFT) {
            task = dao.save(task);
        } else {
            if (task.getRegNumber() == null) {
                RegNum rn = new RegNum();
                task.setRegNumber(task.getTaskType().getPrefix() + rn.getRegNumber(task.getTaskType().getPrefix()));
                task = dao.save(task, rn);
            } else {
                task = dao.save(task);
            }
        }

        if (task.getStatus() == StatusType.OPEN && task.getApprovalStatus() == ApprovalStatusType.DRAFT) {
            ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
            lifecycle.start();
            if (task.getApprovalStatus() != ApprovalStatusType.FINISHED) {
                task.getTimeLine().addStage(new Date(), StatusType.MODERATION.name());
                task.addReaderEditor(task.getAuthorId()); //dev1292
                superUpdate(task);
                new Messages(getAppEnv()).sendToModerate(task);
            } else {
                superUpdate(task);
                new Messages(getAppEnv()).sendToAssignee(task);
                postCalendarEvent(task);
            }
        }
    }

    public void changeStatus(Task task, StatusType status) {
        task.setStatus(status);

        if (status == StatusType.DRAFT) {
            task.resetReadersEditors();
            task.addReaderEditor(task.getAuthor());
        } else {
            task.addReaderEditor(task.getAuthor());
        }
    }

    public void settingUpRevision(Task task) throws DAOException {
        if (task.getApprovalStatus() == ApprovalStatusType.DRAFT) {
            EmployeeDAO empDao = new EmployeeDAO(ses);
            List<Employee> moderators = empDao.findByRole(MODERATOR_ROLE_NAME).getResult();
            if (moderators.size() > 0) {
                List<Block> block = getModeratorBlock(moderators);
                task.setBlocks(block);
                if (moderators.contains(task.getAuthor())) {
                    task.setApprovalSchema(ApprovalSchemaType.WITHOUT_APPROVAL);
                } else {
                    task.setApprovalSchema(ApprovalSchemaType.REJECT_IF_NO_ACCEPT_IF_ANY_YES);
                }
                task.setResult(ApprovalResultType.UNKNOWN);
            } else {
                throw new DAOException(DAOExceptionType.ENTITY_NOT_FOUND, "There is no user assigned to the \"" + MODERATOR_ROLE_NAME + "\" role");
            }
        }
    }

    public void changeAssignee(Task task, User newAssignee) {
        task.setAssignee(newAssignee.getId());
    }

    public void calculateReaders(Task task) throws DAOException {
        EmployeeDAO employeeDAO = new EmployeeDAO(ses);
        ViewPage<Employee> supervisors = employeeDAO.findByRole(ModuleConst.CODE + DefaultDataConst.SUPERVISOR_ROLE_NAME);
        for (Employee sv : supervisors.getResult()) {
            task.addReader(sv.getUserID());
        }

        for (Long observer : task.getObservers()) {
            task.addReader(observer);
        }
    }

    public void acknowledgedTask(Task task, User user) throws DTOException {
        if (!task.getAssignee().equals(user.getId())) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "not_assignee_user");
        } else if (task.getStatus() != StatusType.OPEN && task.getStatus() != StatusType.WAITING) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "task_status_is_not_open");
        }

        changeStatus(task, StatusType.PROCESSING);
    }

    public void completeTask(Task task) throws DTOException {
        if (task.getStatus() == StatusType.COMPLETED) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "task already completed");
        }

        changeStatus(task, StatusType.COMPLETED);
    }

    public void acceptApprovalBlock(Task task, IUser user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
        lifecycle.accept(user);
        changeStatus(task, StatusType.OPEN);
    }

    public void declineApprovalBlock(Task task, IUser user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
        lifecycle.decline(user, decisionComment);
        changeStatus(task, StatusType.DRAFT);
    }

    public void prolongTask(Task task, Date newDueDate) throws DTOException {
        if (newDueDate == null) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "newDueDate is null");
        }

        if (task.getDueDate().after(newDueDate)) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "new due date '" + newDueDate + "' must be after current due date '" + task.getDueDate() + "'");
        }

        task.setDueDate(newDueDate);
        changeStatus(task, StatusType.PROCESSING);
    }

    public void cancelTask(Task task, String comment) throws DTOException {
        if (task.getStatus() == StatusType.CANCELLED) {
            throw new DTOException(DTOExceptionType.NO_ENTITY.IMPROPER_CONDITION, "task already cancelled");
        }

        changeStatus(task, StatusType.CANCELLED);
        task.setCancellationComment(comment);
    }

    public void returnToProcessing(Task task) {
        changeStatus(task, StatusType.PROCESSING);
    }

    public boolean taskIsEditable(Task task) {
        return task.isEditable();
    }

    public boolean taskCanBeDeleted(Task task) {
        if (task.isNew()) {
            return false;
        }
        if (ses.getUser().isSuperUser()) {
            return true;
        } else {
            return !task.isNew() && task.isEditable() && (task.getStatus() == StatusType.OPEN ||
                    task.getStatus() == StatusType.DRAFT);
        }
    }

    public boolean userCanDoAcknowledged(Task task, User user) {
        if (!task.isNew() && task.getAssignee().equals(user.getId())) {
            if (task.getStatus() == StatusType.OPEN || task.getStatus() == StatusType.WAITING) {
                return true;
            }
        }
        return false;
    }

    public boolean userCanDoRequest(Task task, User user) {
        if (!task.isNew() && task.getAssignee().equals(user.getId())) {
            if (task.getStatus() == StatusType.PROCESSING) {
                return true;
            }
        }
        return false;
    }

    public boolean userCanDoResolution(Task task, User user) {
        if (!task.isNew()) {
            if (task.getAuthor().getId().equals(user.getId()) || user.isSuperUser()) {
                if (task.getStatus() != StatusType.COMPLETED && task.getStatus() != StatusType.CANCELLED) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean userCanAddSubTask(Task task, User user) {
        if (!task.isNew()) {
            if (task.getStatus() != StatusType.COMPLETED && task.getStatus() != StatusType.CANCELLED) {
                return true;
            }
        }
        return false;
    }

    public void postCalendarEvent(Task task) throws DAOException, SecureException {
        IUser assignee = new UserDAO().findById(task.getAssignee());
        _Session assigneeSes = new _Session(assignee);
        EventDAO eventDAO = new EventDAO(assigneeSes);
        Event event = new Event();
        event.setDescription(task.getBody());
        event.setEventTime(task.getDueDate());
        TimeRange range = new TimeRange();
        range.setStartTime(task.getDueDate());
        //range.setEndTime(new LocalDate(range.getStartTime()).plus(task.getEstimateInHours()).toDate());
        String title = StringUtils.abbreviate(task.getRegNumber() + " " + task.getTitle(), 140);
        event.setTitle(title);
        event.setPriority(task.getPriority());
        event.setTags(task.getTags());
        event.setReminder(new ReminderDAO(assigneeSes).getDefault());
        event.setRelatedURL(task.getURL());
        eventDAO.add(event);
    }

    public static List<Block> getModeratorBlock(List<Employee> moderators) {
        ArrayList<Block> blocks = new ArrayList<Block>();
        Block block = new Block();
        block.setType(ApprovalType.PARALLEL);
        block.setSort(1);
        block.setStatus(ApprovalStatusType.DRAFT);
        block.setRequireCommentIfNo(true);
        List<Approver> approvers = new ArrayList<Approver>();
        for (Employee moder : moderators) {
            Approver approver = new Approver();
            approver.setEmployee(moder);
            approvers.add(approver);
            approver.setSort(approvers.size());
        }
        block.setApprovers(approvers);
        blocks.add(block);
        return blocks;
    }

    public Outcome getOutcome(Task task) {
        Outcome outcome = new Outcome();
        String title;

        if (task.isNew() && task.getParent() != null) {
            title = "new_subtask";
        } else if (task.isInitiative()) {
            title = "initiative_task";
        } else if (task.isNew()) {
            title = "new_task";
        } else if (task.getParent() != null) {
            title = "subtask";
        } else {
            title = "task";
        }

        outcome.setTitle(Environment.vocabulary.getWord(title, ses.getLang()) + " " + (task.getTitle() != null ? task.getTitle() : ""));
        outcome.setPayloadTitle(title);

        outcome.setModel(task);
        outcome.addPayload("parentTask", task.getParent());
        if (!task.isNew()) {
            outcome.addPayload(new ACL(task));
        }

        if (task.getRequests() != null && !task.getRequests().isEmpty()) {
            Request unresolvedRequest = task.getRequests().stream()
                    .filter(it -> it.getResolution() != ResolutionType.ACCEPTED && it.getResolution() != ResolutionType.DECLINED)
                    .findFirst().orElse(null);
            if (unresolvedRequest != null) {
                outcome.addPayload("unresolvedRequest", unresolvedRequest);
            }
        }

        return outcome;
    }
}
