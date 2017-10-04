package projects.domain;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.ui.ACL;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.rest.exception.RestServiceException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.rest.validation.exception.DTOExceptionType;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import com.exponentus.util.StringUtil;
import helpdesk.model.Demand;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.LocalDate;
import projects.dao.TaskDAO;
import projects.init.AppConst;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import projects.model.constants.TaskStatusType;
import reference.model.TaskType;
import reference.model.constants.ApprovalType;
import staff.dao.EmployeeDAO;
import staff.dao.RoleDAO;
import staff.model.Employee;
import staff.model.Role;
import workflow.domain.ApprovalDomain;
import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.model.constants.ApprovalResultType;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TaskDomain extends ApprovalDomain<Task> {

    private static String MODERATOR_ROLE_NAME = AppConst.ROLES[0];

    public TaskDomain(_Session ses) throws DAOException {
        super(ses);
        dao = new TaskDAO(ses);
    }

    @Override
    public Task fillFromDto(Task dto, IValidation<Task> validation, String formSesId) throws DTOException, DAOException {
        return null;
    }

    public Task composeNew(User user, Project project, Task parentTask, Demand demand, TaskType taskType, boolean initiative,
                           int dueDateRange) throws DAOException, RestServiceException {
        Task task = new Task();

        task.setAuthor(user);
        task.setInitiative(initiative);
        task.setTaskType(taskType);
        task.setStatus(TaskStatusType.DRAFT);
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

        task.setBlocks(getModeratorBlock(new EmployeeDAO(ses)));

        return task;
    }

    public void fillFromDto(Task task, Task dto) throws DAOException, RestServiceException {
        if (task.isNew()) {
            task.setAuthor(dto.getAuthor());
            changeStatus(task, TaskStatusType.DRAFT);
            task.setInitiative(dto.isInitiative());

            if (dto.getParent() != null) {
                task.setParent(dto.getParent());
                //	dto.setProject(dto.getParent().getProject());
                //	task.addReaders(dto.getParent().getReaders());
            }
        }

        task.setProject(dto.getProject());
        task.setDemand(dto.getDemand());

        String title = dto.getTitle();
        if (title == null || title.isEmpty()) {
            // TODO here it needed to vanish from markdown symbols
            title = StringUtils.abbreviate(StringUtil.cleanFromMarkdown(dto.getBody()), 140);
        }
        task.setTitle(title);
        task.setTaskType(dto.getTaskType());
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
        task.setAttachments(dto.getAttachments());
        task.setObservers(dto.getObservers() != null ? dto.getObservers() : new ArrayList<>());

        calculateReaders(task);
    }

    public void changeStatus(Task task, TaskStatusType status) {
        task.setStatus(status);

        if (status == TaskStatusType.DRAFT) {
            task.resetReadersEditors();
            task.addReaderEditor(task.getAuthor());
        } else {
            task.addReaderEditor(task.getAuthor());
        }
    }

    public void calculateStatus(Task task) throws DAOException, RestServiceException {
        if (task.getStartDate() == null) {
            changeStatus(task, TaskStatusType.DRAFT);
        } else {
            if (task.getStatus() == TaskStatusType.DRAFT || task.getStatus() == TaskStatusType.OPEN
                    || task.getStatus() == TaskStatusType.WAITING) {
                if (new Date().before(task.getStartDate())) {
                    changeStatus(task, TaskStatusType.WAITING);
                } else {
                    task.setBlocks(getModeratorBlock(new EmployeeDAO(ses)));
                    task.setApprovalStatus(ApprovalStatusType.DRAFT);
                    task.setResult(ApprovalResultType.UNKNOWN);
                    changeStatus(task, TaskStatusType.OPEN);
                }
            }
        }
    }

    public void changeAssignee(Task task, User newAssignee) {
        task.setAssignee(newAssignee.getId());

        // if (oldAssignee.longValue() != newAssignee.longValue()) {
        // // TODO notify about changes ?
        // }
    }

    public void calculateReaders(Task task) throws DAOException {
       EmployeeDAO employeeDAO = new EmployeeDAO(ses);
       ViewPage<Employee> supervisors = employeeDAO.findByRole(AppConst.CODE + EnvConst.SUPERVISOR_ROLE_NAME);
       for(Employee sv:supervisors.getResult()){
           task.addReader(sv.getUserID());
       }

    }

    public void acknowledgedTask(Task task, User user) throws DTOException {
        if (!task.getAssignee().equals(user.getId())) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "not_assignee_user");
        } else if (task.getStatus() != TaskStatusType.OPEN && task.getStatus() != TaskStatusType.WAITING) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "task_status_is_not_open");
        }

        changeStatus(task, TaskStatusType.PROCESSING);
    }

    public void completeTask(Task task) throws DTOException {
        if (task.getStatus() == TaskStatusType.COMPLETED) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "task already completed");
        }

        changeStatus(task, TaskStatusType.COMPLETED);
    }

    public void acceptApprovalBlock(Task task, IUser user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
        lifecycle.accept(user);
        changeStatus(task, TaskStatusType.OPEN);
    }


    public void declineApprovalBlock(Task task, IUser user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(task);
        lifecycle.decline(user, decisionComment);
        changeStatus(task, TaskStatusType.DRAFT);
    }

    public void prolongTask(Task task, Date newDueDate) throws DTOException {
        if (newDueDate == null) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "newDueDate is null");
        }

        if (task.getDueDate().after(newDueDate)) {
            throw new DTOException(DTOExceptionType.IMPROPER_CONDITION, "new due date '" + newDueDate + "' must be after current due date '" + task.getDueDate() + "'");
        }

        task.setDueDate(newDueDate);
        changeStatus(task, TaskStatusType.PROCESSING);
    }

    public void cancelTask(Task task, String comment) throws DTOException {
        if (task.getStatus() == TaskStatusType.CANCELLED) {
            throw new DTOException(DTOExceptionType.NO_ENTITY.IMPROPER_CONDITION, "task already cancelled");
        }

        changeStatus(task, TaskStatusType.CANCELLED);
        task.setCancellationComment(comment);
    }

    public void returnToProcessing(Task task) {
        changeStatus(task, TaskStatusType.PROCESSING);
    }

    public boolean taskIsEditable(Task task) {
        return task.isEditable();
    }

    public boolean taskCanBeDeleted(Task task) {
        return !task.isNew() && task.isEditable() && (task.getStatus() == TaskStatusType.OPEN || task.getStatus() == TaskStatusType.DRAFT);
    }

    public boolean userCanDoAcknowledged(Task task, User user) {
        if (!task.isNew() && task.getAssignee().equals(user.getId())) {
            if (task.getStatus() == TaskStatusType.OPEN || task.getStatus() == TaskStatusType.WAITING) {
                return true;
            }
        }
        return false;
    }

    public boolean userCanDoRequest(Task task, User user) {
        if (!task.isNew() && task.getAssignee().equals(user.getId())) {
            if (task.getStatus() == TaskStatusType.PROCESSING) {
                return true;
            }
        }
        return false;
    }

    public boolean userCanDoResolution(Task task, User user) {
        if (!task.isNew()) {
            if (task.getAuthor().getId().equals(user.getId()) || user.isSuperUser()) {
                if (task.getStatus() != TaskStatusType.COMPLETED && task.getStatus() != TaskStatusType.CANCELLED) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean userCanAddSubTask(Task task, User user) {
        if (!task.isNew()) {
            if (task.getStatus() != TaskStatusType.COMPLETED && task.getStatus() != TaskStatusType.CANCELLED) {
                return true;
            }
        }
        return false;
    }

    private List<Block> getModeratorBlock(EmployeeDAO empDao) throws DAOException, RestServiceException {
        ArrayList<Block> blocks = new ArrayList<Block>();
        RoleDAO roleDAO = new RoleDAO(empDao.getSession());
        Role role = roleDAO.findByName(MODERATOR_ROLE_NAME);
        if (role != null) {
            ViewPage<Employee> moderators = empDao.findByRole(role);
            if (moderators.getCount() > 0) {
                Block block = new Block();
                block.setType(ApprovalType.SERIAL);
                block.setSort(1);
                block.setStatus(ApprovalStatusType.DRAFT);
                block.setRequireCommentIfNo(true);
                Approver approver = new Approver();
                approver.setEmployee(moderators.getFirstEntity());
                List<Approver> approvers = new ArrayList<Approver>();
                approvers.add(approver);
                block.setApprovers(approvers);
                blocks.add(block);
            } else {
                throw new RestServiceException("There is no user assigned to the \"" + MODERATOR_ROLE_NAME + "\" role");
            }
        } else {
            throw new RestServiceException("role \"" + MODERATOR_ROLE_NAME + "\" has not been found");
        }
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
        outcome.addPayload("contentTitle", title);

        outcome.addPayload(task);
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
