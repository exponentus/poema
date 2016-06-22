package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @JoinColumn
    private Project project;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn
    private Task parent;

    @OneToMany(mappedBy = "parent")
    private List<Task> subtasks;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn
    private TaskType taskType;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private TaskStatusType status = TaskStatusType.UNKNOWN;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private TaskPriorityType priority = TaskPriorityType.NORMAL;

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
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "task_id")
    private List<Comment> comments;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "task_attachments",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "task_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"task_id", "attachment_id"}))
    private List<Attachment> attachments;

    @Column(name = "customer_observation")
    private boolean customerObservation;

    @Column(name = "has_attachments")
    private boolean hasAttachments;

    @Column(name = "has_comments")
    private boolean hasComments;

    @Column(name = "has_subtasks")
    private boolean hasSubtasks;

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
    }

    public TaskPriorityType getPriority() {
        return priority;
    }

    public void setPriority(TaskPriorityType priority) {
        this.priority = priority;
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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public boolean isHasAttachments() {
        return hasAttachments;
    }

    public void setHasAttachments(boolean hasAttachments) {
        this.hasAttachments = hasAttachments;
    }

    @JsonIgnore
    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public boolean isHasComments() {
        return hasComments;
    }

    public void setHasComments(boolean hasComments) {
        this.hasComments = hasComments;
    }

    public boolean isHasSubtasks() {
        return hasSubtasks;
    }

    public void setHasSubtasks(boolean hasSubtasks) {
        this.hasSubtasks = hasSubtasks;
    }

    public String getProjectId() {
        return project.getIdentifier();
    }

    public String getParentTaskId() {
        return parent != null ? parent.getIdentifier() : null;
    }

    public String getTaskTypeId() {
        return taskType.getIdentifier();
    }

    public List<String> getTagIds() {
        return tags.stream().map(it -> it.getIdentifier()).collect(Collectors.toList());
    }
}
