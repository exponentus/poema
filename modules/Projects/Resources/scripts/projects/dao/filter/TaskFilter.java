package projects.dao.filter;

import administrator.model.User;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.constants.PriorityType;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.dataengine.IFilter;
import projects.model.Project;
import projects.model.Task;
import reference.model.Tag;
import reference.model.TaskType;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class TaskFilter implements IFilter<Task> {

    private Project project;
    private Task parentTask;
    private TaskType taskType;
    private StatusType status = StatusType.UNKNOWN;
    private PriorityType priority = PriorityType.UNKNOWN;
    private String search;
    private User author;
    private Long assigneeUserId;
    private Date startDate;
    private Date dueDate;
    private List<Tag> tags;
    private boolean isParentOnly;
    private Boolean isInitiative = null;
    private boolean treeMode = false;
    private boolean isModerate;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public TaskFilter setProject(String projectId) {
        if (projectId != null && !projectId.isEmpty()) {
            Project project = new Project();
            project.setId(UUID.fromString(projectId));
            setProject(project);
        }
        return this;
    }

    public Task getParentTask() {
        return parentTask;
    }

    public TaskFilter setParentTask(Task parentTask) {
        this.parentTask = parentTask;
        return this;
    }

    public TaskFilter setParentTask(String parentTaskId) {
        if (parentTaskId != null && !parentTaskId.isEmpty()) {
            Task task = new Task();
            task.setId(UUID.fromString(parentTaskId));
            setParentTask(task);
        }
        return this;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public TaskFilter setTaskType(TaskType taskType) {
        this.taskType = taskType;
        return this;
    }

    public TaskFilter setTaskType(String id) {
        if (id != null && !id.isEmpty()) {
            TaskType tt = new TaskType();
            tt.setId(UUID.fromString(id));
            setTaskType(tt);
        }
        return this;
    }

    public StatusType getStatus() {
        return status;

    }

    public TaskFilter setStatus(StatusType status) {
        this.status = status;
        return this;
    }

    public PriorityType getPriority() {
        return priority;
    }

    public TaskFilter setPriority(PriorityType priority) {
        this.priority = priority;
        return this;
    }

    public boolean hasSearch() {
        return search != null && !search.isEmpty();
    }

    public String getSearch() {
        return search;
    }

    public TaskFilter setSearch(String search) {
        this.search = search;
        return this;
    }

    public User getAuthor() {
        return author;
    }

    public TaskFilter setAuthor(User author) {
        this.author = author;
        return this;
    }

    public Long getAssigneeUserId() {
        return assigneeUserId;
    }

    public TaskFilter setAssigneeUserId(Long assigneeUserId) {
        this.assigneeUserId = assigneeUserId;
        return this;
    }

    public Date getStartDate() {
        return startDate;
    }

    public TaskFilter setStartDate(Date startDate) {
        this.startDate = startDate;
        return this;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public TaskFilter setDueDate(Date dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public TaskFilter setTags(List<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public boolean isParentOnly() {
        return isParentOnly;
    }

    public TaskFilter setParentOnly(boolean parentOnly) {
        isParentOnly = parentOnly;
        return this;
    }

    public Boolean isInitiative() {
        return isInitiative;
    }

    public TaskFilter setInitiative(boolean initiative) {
        isInitiative = initiative;
        return this;
    }

    public boolean isTreeMode() {
        return treeMode;
    }

    public TaskFilter setTreeMode(boolean treeMode) {
        this.treeMode = treeMode;
        return this;
    }

    public boolean isModerate() {
        return isModerate;
    }

    public void setModerate(boolean moderate) {
        isModerate = moderate;
    }

    @Override
    public Predicate collectPredicate(Root<Task> root, CriteriaBuilder cb, Predicate condition) {
        if (getProject() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("project"), getProject());
            } else {
                condition = cb.and(cb.equal(root.get("project"), getProject()), condition);
            }
        }

        if (getAuthor() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("author"), getAuthor());
            } else {
                condition = cb.and(cb.equal(root.get("author"), getAuthor()), condition);
            }
        }

        if (getStatus() != StatusType.UNKNOWN) {
            if (condition == null) {
                condition = cb.equal(root.get("status"), getStatus());
            } else {
                condition = cb.and(cb.equal(root.get("status"), getStatus()), condition);
            }
        }

        if (getPriority() != PriorityType.UNKNOWN) {
            if (condition == null) {
                condition = cb.equal(root.get("priority"), getPriority());
            } else {
                condition = cb.and(cb.equal(root.get("priority"), getPriority()), condition);
            }
        }

        if (getTaskType() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("taskType"), getTaskType());
            } else {
                condition = cb.and(cb.equal(root.get("taskType"), getTaskType()), condition);
            }
        }

        if (getAssigneeUserId() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("assignee"), getAssigneeUserId());
            } else {
                condition = cb.and(cb.equal(root.get("assignee"), getAssigneeUserId()), condition);
            }
        }

        if (isInitiative() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("initiative"), isInitiative());
            } else {
                condition = cb.and(cb.equal(root.get("initiative"), isInitiative()), condition);
            }
        }

        if (getTags() != null) {
            if (condition == null) {
                condition = cb.and(root.get("tags").in(getTags()));
            } else {
                condition = cb.and(root.get("tags").in(getTags()), condition);
            }
        }

        if (isModerate()) {
            Expression<ApprovalStatusType> status = root.<Collection<Block>>get("blocks").<ApprovalStatusType>get("status");
            Predicate predicate = cb.equal(status, ApprovalStatusType.PENDING);
            if (condition == null) {
                condition = cb.and(predicate);
            } else {
                condition = cb.and(predicate, condition);
            }
        }

        if (hasSearch()) {
            if (condition == null) {
                condition = cb.like(cb.lower(root.get("title")), "%" + getSearch() + "%");
            } else {
                condition = cb.and(cb.like(cb.lower(root.get("title")), "%" + getSearch() + "%"), condition);
            }
        }

        //
        if (getParentTask() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("parent"), getParentTask());
            } else {
                condition = cb.and(cb.equal(root.get("parent"), getParentTask()), condition);
            }
        } else if (isTreeMode() || isParentOnly()) {
            if (condition == null) {
                condition = cb.isEmpty(root.get("parent"));
            } else {
                condition = cb.and(cb.isEmpty(root.get("parent")), condition);
            }
        }

        return condition;
    }
}
