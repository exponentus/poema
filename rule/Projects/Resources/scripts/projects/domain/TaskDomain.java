package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.user.IUser;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.LocalDate;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.model.TaskType;

import java.util.ArrayList;
import java.util.Date;

public class TaskDomain {

    private Task task = null;

    public TaskDomain(Task task) {
        if (task == null) {
            throw new IllegalArgumentException("Error: task null");
        }

        this.task = task;
    }

    public TaskDomain(Task task, IUser<Long> user, Project project, Task parentTask, TaskType taskType, boolean initiative, int dueDateRange) {
        this.task = task;

        task.setAuthor(user);
        task.setInitiative(initiative);
        task.setTaskType(taskType);
        task.setStatus(TaskStatusType.OPEN);
        task.setProject(project);

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
            if (project != null) {
                task.setObservers(project.getObservers());
            }
        }
    }

    public void fillFromDto(Task dto) {
        if (task.isNew()) {
            task.setAuthor(dto.getAuthor());
            changeStatus(TaskStatusType.OPEN);
            task.setInitiative(dto.isInitiative());

            if (dto.getParent() != null) {
                task.setParent(dto.getParent());
                dto.setProject(dto.getParent().getProject());
                task.addReaders(dto.getParent().getReaders());
            }
        }

        task.setProject(dto.getProject());
        task.setDemand(dto.getDemand());

        String title = dto.getTitle();
        if (title == null || title.isEmpty()) {
            // TODO here it needed to vanish from markdown symbols
            title = StringUtils.abbreviate(dto.getBody(), 140);
        }
        task.setTitle(title);
        task.setTaskType(dto.getTaskType());
        task.setPriority(dto.getPriority());
        task.setBody(dto.getBody());
        task.setTags(dto.getTags());

        task.setStartDate(dto.getStartDate());
        task.setDueDate(dto.getDueDate());
        calculateStatus();

        changeAssignee(dto.getAssignee());
        task.setCustomerObservation(dto.isCustomerObservation());
        task.setAttachments(dto.getAttachments());
        task.setObservers(dto.getObservers() != null ? dto.getObservers() : new ArrayList<>());

        calculateReaders();
    }

    public Task addChildTask() {
        return null;
    }

    public void calculateStatus() {
        if (task.getStartDate() == null) {
            changeStatus(TaskStatusType.DRAFT);
        } else {
            if (task.getStatus() == TaskStatusType.DRAFT || task.getStatus() == TaskStatusType.OPEN
                    || task.getStatus() == TaskStatusType.WAITING) {
                if (new Date().before(task.getStartDate())) {
                    changeStatus(TaskStatusType.WAITING);
                } else {
                    changeStatus(TaskStatusType.OPEN);
                }
            }
        }
    }

    public void changeStatus(TaskStatusType status) {
        task.setStatus(status);
        if (status != TaskStatusType.OPEN || status != TaskStatusType.DRAFT) { // TODO ?
            task.resetEditors();
        } else {
            task.addReaderEditor(task.getAuthor());
        }
        task.setStatusDate(new Date());
    }

    public void changeAssignee(Long newAssignee) {
        task.setAssignee(newAssignee);

//        if (oldAssignee.longValue() != newAssignee.longValue()) {
//            // TODO notify about changes ?
//        }
    }

    public void calculateReaders() {
        if (task.getStatus() != TaskStatusType.DRAFT) {

            User assigneeUser = new User();
            assigneeUser.setId(task.getAssignee());

            task.addReader(assigneeUser);
            task.addReaders(task.getObservers());
        }

        if (task.getParent() != null) {
            task.getParent().addReaders(task.getReaders());
        }
    }

    public void acknowledged(IUser<Long> user) throws Exception {
        if (!task.getAssignee().equals(user.getId())) {
            throw new Exception("not_assignee_user");
        } else if (task.getStatus() != TaskStatusType.OPEN && task.getStatus() != TaskStatusType.WAITING) {
            throw new IllegalStateException("task_status_is_not_open");
        }

        changeStatus(TaskStatusType.PROCESSING);
    }

    public void complete() {
        if (task.getStatus() == TaskStatusType.COMPLETED) {
            throw new IllegalStateException("task already completed");
        }

        changeStatus(TaskStatusType.COMPLETED);
    }

    public void cancel(String comment) {
        if (task.getStatus() == TaskStatusType.CANCELLED) {
            throw new IllegalStateException("task already cancelled");
        }

        changeStatus(TaskStatusType.CANCELLED);
        task.setCancellationComment(comment);
    }

    public Outcome getOutcome() {
        Outcome outcome = new Outcome();

        if (task.isNew() && task.getParent() != null) {
            outcome.setTitle("new_subtask");
        } else if (task.isInitiative()) {
            outcome.setTitle("initiative_task");
        } else if (task.isNew()) {
            outcome.setTitle("new_task");
        } else if (task.getParent() != null) {
            outcome.setTitle("subtask");
        } else {
            outcome.setTitle("task");
        }

        outcome.addPayload(task);
        outcome.addPayload("parentTask", task.getParent());
        if (!task.isNew()) {
            // outcome.addPayload(new ACL(task));
        }

        return outcome;
    }
}
