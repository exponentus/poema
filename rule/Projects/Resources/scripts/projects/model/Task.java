package projects.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.HierarchicalEntity;
import com.exponentus.dataengine.jpa.IHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import helpdesk.model.Demand;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

@JsonRootName("task")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "tasks")
@NamedQuery(name = "Task.findAll", query = "SELECT m FROM Task AS m ORDER BY m.regDate")
public class Task extends HierarchicalEntity<UUID> {
	
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
	
	@FTSearchable
	@Column(length = 140)
	private String title;
	
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

	// @JsonIgnore
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "task_attachments", joinColumns = { @JoinColumn(name = "task_id") }, inverseJoinColumns = {
			@JoinColumn(name = "attachment_id") }, indexes = {
					@Index(columnList = "task_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
							"task_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();
	
	@Column(name = "customer_observation")
	private boolean customerObservation;
	
	@JsonProperty("observerUserIds")
	@ElementCollection
	private List<Long> observers;
	
	@Transient
	private List<IAppEntity> children;
	
	//
	// TODO short graph
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
	
	// TODO short graph
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
	
	@JsonIgnore
	public List<Task> getSubtasks() {
		return subtasks;
	}
	
	public void setSubtasks(List<Task> subtasks) {
		this.subtasks = subtasks;
	}
	
	// TODO short graph
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
		statusDate = new Date();
	}
	
	public Date getStatusDate() {
		return statusDate;
	}
	
	public TaskPriorityType getPriority() {
		return priority;
	}
	
	public void setPriority(TaskPriorityType priority) {
		this.priority = priority;
	}
	
	@Override
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
	
	public boolean isInitiative() {
		return initiative;
	}
	
	public void setInitiative(boolean initiative) {
		this.initiative = initiative;
	}
	
	// TODO short graph
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
	
	// TODO short graph
	@Override
	public List<Attachment> getAttachments() {
		return attachments;
	}
	
	@Override
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
	
	public String getParentTaskId() {
		return parent != null ? parent.getIdentifier() : null;
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
	
	public List<IAppEntity> getChildren() {
		return children;
	}
	
	public void setChildren(List<IAppEntity> children) {
		this.children = children;
	}
	
	@Override
	@Transient
	public String getURL() {
		return "p?id=" + this.getClass().getSimpleName().toLowerCase() + "-form&taskId=" + getIdentifier();
	}
	
	@Override
	@JsonIgnore
	public IHierarchicalEntity getHead() {
		if (project != null) {
			return project;
		} else {
			return parent;
		}
	}
}
