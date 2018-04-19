package projects.domain;

import administrator.dao.UserDAO;
import administrator.model.User;
import calendar.dao.EventDAO;
import calendar.dao.ReminderDAO;
import calendar.model.Event;
import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.init.DefaultDataConst;
import com.exponentus.common.model.constants.*;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;
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
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import com.exponentus.util.StringUtil;
import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.LocalDate;
import projects.dao.TaskDAO;
import projects.init.ModuleConst;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import reference.dao.TaskTypeDAO;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.domain.ApprovalDomain;

import java.util.*;

public class TaskDomain extends ApprovalDomain<Task> {

    private static String MODERATOR_ROLE_NAME = ModuleConst.ROLES[0];

    public TaskDomain(_Session ses) throws DAOException {
        super(ses);
        dao = new TaskDAO(ses);
    }

    public Task composeNew(User user, Project project, Task parentTask, Demand demand, TaskType taskType, boolean initiative,
                           int dueDateRange) throws DAOException, RestServiceException {
        Task task = new Task();

        task.setAuthor(user);
        task.setInitiative(initiative);
        task.setTaskType(taskType);
        task.setStatus(StatusType.DRAFT);
        task.setProject(project);
        if (demand != null) {
            task.setDemand(demand);
        } else if (task.getParent() != null) {
            // task.setDemand(task.getParent().getDemand());
        }

        if (project == null && demand != null) {
            task.setProject(demand.getProject());
        }

        if (task.getProject() != null) {
            task.setAssignee(task.getProject().getProgrammer());
        }

        if (parentTask != null) {
            task.setParent(parentTask);
            task.setTitle(parentTask.getTitle());
            task.setPriority(parentTask.getPriority());
            task.setStartDate(parentTask.getStartDate());
            task.setDueDate(parentTask.getDueDate());
            task.setTags(parentTask.getTags());
            task.setObservers(parentTask.getObservers());
        } else {
            task.setStartDate(new Date());
            task.setDueDate(new LocalDate(task.getStartDate()).plusDays(dueDateRange).toDate());
            if (task.getProject() != null) {
                task.setObservers(task.getProject().getObservers());
            }
        }

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
            changeStatus(task, StatusType.DRAFT);
            task.setInitiative(dto.isInitiative());

            if (dto.getParent() != null) {
                dto.setParent(dao.findById(dto.getParent().getId()));
                task.setParent(dto.getParent());
                //	dto.setProject(dto.getParent().getProject());
                //	task.addReaders(dto.getParent().getReader());
            }
            if (dto.getDemand() != null) {
                DemandDAO demandDAO = new DemandDAO(ses);
                dto.setDemand(demandDAO.findById(dto.getDemand().getId()));
            }
        } else {
            task = dao.findById(dto.getId());
        }

        String title = dto.getTitle();
        if (title == null || title.isEmpty()) {
            // TODO here it needed to vanish from markdown symbols
            title = StringUtils.abbreviate(StringUtil.cleanFromMarkdown(dto.getBody()), 140);
        }
        task.setTitle(title);
        task.setProject(dto.getProject());
        task.setTaskType(new TaskTypeDAO(ses).findById(dto.getTaskType().getId()));
        task.setPriority(dto.getPriority());
        task.setBody(dto.getBody());
        task.setTags(dto.getTags());
        task.setStartDate(dto.getStartDate());
        task.setDueDate(dto.getDueDate());
        calculateStatus(task);

        User user = new User();
        user.setId(dto.getAssignee());
        changeAssignee(task, user);

        task.setCustomerObservation(dto.isCustomerObservation());
        task.setAttachments(getActualAttachments(task.getAttachments(), dto.getAttachments(), formSesId));
        task.setObservers(dto.getObservers() != null ? dto.getObservers() : new ArrayList<>());

        calculateReaders(task);

        return task;
    }

    public Task fillDraft(Task dto, IValidation<Task> validation, String formSesId) throws DAOException, DTOException {
        dto.setStartDate(null);
        dto.setStatus(StatusType.DRAFT);
        Task task = fillFromDto(dto, validation, formSesId);
        Set<Long> readers = new HashSet<>();
        readers.add(task.getAuthor().getId());
        task.setReaders(readers);

        return task;
    }

//    public void saveTask(Task task) throws SecureException, DAOException, DTOException, ApprovalException {
//        if (task.isNew()) {
//            RegNum rn = new RegNum();
//            task.setRegNumber(task.getTaskType().getPrefix() + rn.getRegNumber(task.getTaskType().getPrefix()));
//            task = dao.add(task, rn);
//            //	mDao.postEmailSending(user, task, "task_was_registered");
//        } else {
//            task = dao.update(task);
//            //	mDao.postEmailSending(user, task, "task_was_updated");
//        }
//
//        if (task.getStatus() == StatusType.OPEN) {
//            ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
//            lifecycle.start();
//            if (task.getApprovalStatus() != ApprovalStatusType.FINISHED) {
//                task.getTimeLine().addStage(new Date(), StatusType.MODERATION.name());
//                task.addReaderEditor(task.getAuthorId()); //dev1292
//                superUpdate(task);
//                new Messages(getAppEnv()).sendToModerate(task);
//            } else {
//                superUpdate(task);
//                new Messages(getAppEnv()).sendToAssignee(task);
//                postCalendarEvent(task);
//            }
//        }
//    }

    public void changeStatus(Task task, StatusType status) {
        task.setStatus(status);

        if (status == StatusType.DRAFT) {
            task.resetReadersEditors();
            task.addReaderEditor(task.getAuthor());
        } else {
            task.addReaderEditor(task.getAuthor());
        }
    }

    public void calculateStatus(Task task) throws DAOException {
        if (task.getStartDate() == null) {
            changeStatus(task, StatusType.DRAFT);
        } else {
            if (task.getStatus() == StatusType.DRAFT || task.getStatus() == StatusType.OPEN
                    || task.getStatus() == StatusType.WAITING) {
                if (new Date().before(task.getStartDate())) {
                    changeStatus(task, StatusType.WAITING);
                } else {
                    EmployeeDAO empDao = new EmployeeDAO(ses);
                    List<Employee> moderators = empDao.findByRole(MODERATOR_ROLE_NAME).getResult();
                    if (moderators.size() > 0) {
                        List<Block> block = getModeratorBlock(moderators);
                        task.setBlocks(block);
                        if (moderators.contains(task.getAuthor())) {
                            task.setApprovalSchema(ApprovalSchemaType.WITHOUT_APPROVAL);
                        } else {
                            task.setApprovalSchema(ApprovalSchemaType.IN_ANY_CASE_DECIDE_PARALLEL_APPROVER);
                        }
                        task.setApprovalStatus(ApprovalStatusType.DRAFT);
                        task.setResult(ApprovalResultType.UNKNOWN);
                    } else {
                        throw new DAOException(DAOExceptionType.ENTITY_NOT_FOUND, "There is no user assigned to the \"" + MODERATOR_ROLE_NAME + "\" role");
                    }
                }
                changeStatus(task, StatusType.OPEN);
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
        String title = StringUtils.abbreviate(task.getRegNumber() + " " + task.getTitle(), 140);
        event.setTitle(title);
        event.setPriority(task.getPriority());
        event.setTags(task.getTags());
        event.setReminder(new ReminderDAO(assigneeSes).getDefault());
        event.setRelatedURL(task.getURL());
        eventDAO.add(event);
    }

    private List<Block> getModeratorBlock(List<Employee> moderators) {
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
