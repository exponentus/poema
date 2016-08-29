package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@JsonRootName("task")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "tasks")
@NamedQuery(name = "Task.findAll", query = "SELECT m FROM Task AS m ORDER BY m.regDate")
public class Task extends SecureAppEntity<UUID> {

    @NotNull
    @ManyToOne
    private Project project;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Task parent;

    @Column(name = "reg_number", length = 140)
    private String regNumber;

    @OneToMany(mappedBy = "parent")
    private List<Task> subtasks;

    @NotNull
    @ManyToOne(optional = false)
    private TaskType taskType;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private TaskStatusType status = TaskStatusType.UNKNOWN;

    private Date statusDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private TaskPriorityType priority = TaskPriorityType.NORMAL;

    @Column(length = 140)
    private String title;

    @Column(length = 1024, name = "cancel_comment")
    private String cancellationComment;

    @Column(length = 2048)
    private String body;

    private Long assignee;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "task_tags")
    private List<Tag> tags;

    @JsonIgnore
    @OneToMany(mappedBy = "task", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "task_id")
    @CascadeOnDelete
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "task", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "task_id")
    @CascadeOnDelete
    private List<Request> requests;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "task_attachments",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "task_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"task_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    @Column(name = "customer_observation")
    private boolean customerObservation;

    @JsonProperty("observerUserIds")
    private List<Long> observers;

    @JsonIgnore
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @JsonIgnore
    public Task getParent() {
        return parent;
    }

    public void setParent(Task parent) {
        this.parent = parent;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    @JsonIgnore
    public List<Task> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<Task> subtasks) {
        this.subtasks = subtasks;
    }

    @JsonIgnore
    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public TaskStatusType getStatus() {
        return status;
    }

    public void setStatus(TaskStatusType status) {
        this.status = status;
        statusDate = new Date();
    }

    public Date getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(Date statusDate) {
        this.statusDate = statusDate;
    }

    public TaskPriorityType getPriority() {
        return priority;
    }

    public void setPriority(TaskPriorityType priority) {
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCancellationComment() {
        return cancellationComment;
    }

    public void setCancellationComment(String cancellationComment) {
        this.cancellationComment = cancellationComment;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @JsonProperty("assigneeUserId")
    public Long getAssignee() {
        return assignee;
    }

    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    @JsonIgnore
    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public boolean isHasRequests() {
        return requests != null && requests.size() > 0;
    }

    public boolean isHasComments() {
        return comments != null && comments.size() > 0;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public boolean isHasSubtasks() {
        return subtasks != null && subtasks.size() > 0;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public boolean isHasAttachments() {
        return attachments.size() > 0;
    }

    @Override
    public List<Attachment> getAttachments() {
        return attachments;
    }

    @Override
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public String getProjectId() {
        return project != null ? project.getIdentifier() : null;
    }

    public String getParentTaskId() {
        return parent != null ? parent.getIdentifier() : null;
    }

    public String getTaskTypeId() {
        return taskType != null ? taskType.getIdentifier() : null;
    }

    public List<String> getTagIds() {
        return tags != null ? tags.stream().map(it -> it.getIdentifier()).collect(Collectors.toList()) : null;
    }

    public boolean isCustomerObservation() {
        return customerObservation;
    }

    public void setCustomerObservation(boolean customerObservation) {
        this.customerObservation = customerObservation;
    }

    public List<Long> getObservers() {
        return observers;
    }

    public void setObservers(List<Long> observers) {
        this.observers = observers;
    }

    @Override
    public String getURL() {
        return "p?id=" + this.getClass().getSimpleName().toLowerCase() + "-form&taskId=" + getIdentifier();
    }
}
