package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.common.model.SimpleReferenceEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.localization.LanguageCode;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import helpdesk.model.Demand;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@JsonRootName("task")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "tasks")
public class Task extends SecureHierarchicalEntity<UUID> {

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    private Demand demand;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Task parent;

    @FTSearchable(ignoreLang = true)
    @Column(name = "reg_number", length = 140)
    private String regNumber;

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

    @FTSearchable
    @Column(length = 1024, name = "cancel_comment")
    private String cancellationComment;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    private Long assignee;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    private boolean initiative;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "task_tags")
    private List<Tag> tags;

    @Column(name = "customer_observation")
    private boolean customerObservation;

    @JsonProperty("observerUserIds")
    @ElementCollection
    private List<Long> observers;

    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    private List<Task> subtasks;

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

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "task_attachments", joinColumns = {@JoinColumn(name = "task_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "task_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {
            "task_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    @Transient
    private List<IAppEntity> responses;

    public Task() {
    }

    // java.util.UUID, java.util.Date, java.lang.Long, java.lang.String, java.lang.Long
    // java.util.UUID, java.util.Date, java.lang.Long, java.lang.String, java.lang.String, java.lang.String, reference.model.Tag, java.lang.Long
    public Task(UUID id, Date regDate, Long author, String tname, String locName, Long countAtt) {
        this.id = id;
        this.regDate = regDate;
        this.author = author;
        this.title = tname;
        // this.body = locName;
//        this.tags = tags;
    }

    public Task(UUID id, Date regDate, Long author, String title, String body, Tag tag, Long countAtt) {
        this.id = id;
        this.regDate = regDate;
        this.author = author;
        this.title = title;
        this.body = body;
        if (tag != null) {
            this.tags = new ArrayList<>();
            this.tags.add(tag);
        }
    }

    // java.util.UUID, java.util.Date, java.lang.Long, reference.model.TaskType, java.lang.String, java.lang.Long
    public Task(UUID id, Date regDate, Long author, TaskType taskType, String title, Long countAtt) {
        this.id = id;
        this.regDate = regDate;
        this.author = author;
        this.taskType = taskType;
        this.title = title;
        if (countAtt > 0) {
            this.attachments = new ArrayList<>();
            for (int i = 0; i < countAtt; i++) {
                this.attachments.add(new Attachment());
            }
        }
    }

    public Task(UUID id, Date regDate, String title, SimpleReferenceEntity sre, Long countAtt) {
        this.id = id;
        this.regDate = regDate;
        this.title = title;
        this.taskType = new TaskType();
        this.taskType.setName(sre.getName());
        this.taskType.setLocName(sre.getLocName());
        if (countAtt > 0) {
            this.attachments = new ArrayList<>();
            for (int i = 0; i < countAtt; i++) {
                this.attachments.add(new Attachment());
            }
        }
    }

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

    @JsonProperty
    public void setParent(Task parent) {
        this.parent = parent;
    }

    public Demand getDemand() {
        return demand;
    }

    public void setDemand(Demand demand) {
        this.demand = demand;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

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
        if (status != TaskStatusType.OPEN || status != TaskStatusType.DRAFT) {
            resetEditors();
        } else {
            addReaderEditor(author);
        }
        setStatusDate(new Date());
    }

    public Date getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(Date date) {
        statusDate = date;
    }

    public TaskPriorityType getPriority() {
        return priority;
    }

    public void setPriority(TaskPriorityType priority) {
        this.priority = priority;
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

    public boolean isInitiative() {
        return initiative;
    }

    public void setInitiative(boolean initiative) {
        this.initiative = initiative;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
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

    public List<Task> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<Task> subtasks) {
        this.subtasks = subtasks;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public List<Request> getRequests() {
        return requests;
    }

    @Override
    public List<Attachment> getAttachments() {
        return attachments;
    }

    @Override
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    //
    public List<IAppEntity> getResponses() {
        return responses;
    }

    public void setResponses(List<IAppEntity> responses) {
        this.responses = responses;
    }

    @Override
    @Transient
    public String getURL() {
        return "p?id=" + this.getClass().getSimpleName().toLowerCase() + "-form&taskId=" + getIdentifier();
    }

    @Override
    public SecureHierarchicalEntity<UUID> getParentEntity(_Session ses) {
        if (parent != null) {
            return parent;
        } else {
            return project;
        }
    }
}
