package projects.dao.filter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.exponentus.runtimeobj.Filter;

import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

/**
 * Created by MK on 02.06.2016.
 */
public class TaskFilter extends Filter {

	private Project project;
	private Task parentTask;
	private TaskType taskType;
	private TaskStatusType status = TaskStatusType.UNKNOWN;
	private TaskPriorityType priority = TaskPriorityType.UNKNOWN;
	private String search;
	private Long authorId;
	private Long assigneeUserId;
	private Date startDate;
	private Date dueDate;
	private List<Tag> tags;
	private boolean isParentOnly;

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public void setProject(String projectId) {
		if (projectId != null && !projectId.isEmpty()) {
			Project project = new Project();
			project.setId(UUID.fromString(projectId));
			setProject(project);
		}
	}

	public Task getParentTask() {
		return parentTask;
	}

	public void setParentTask(Task parentTask) {
		this.parentTask = parentTask;
	}

	public void setParentTask(String parentTaskId) {
		if (parentTaskId != null && !parentTaskId.isEmpty()) {
			Task task = new Task();
			task.setId(UUID.fromString(parentTaskId));
			setParentTask(task);
		}
	}

	public TaskType getTaskType() {
		return taskType;
	}

	public void setTaskType(TaskType taskType) {
		this.taskType = taskType;
	}

	public void setTaskType(String id) {
		if (id != null && !id.isEmpty()) {
			TaskType tt = new TaskType();
			tt.setId(UUID.fromString(id));
			setTaskType(tt);
		}
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

	public boolean hasSearch() {
		return search != null && !search.isEmpty();
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public Long getAuthorId() {
		return authorId;
	}

	public void setAuthorId(Long authorId) {
		this.authorId = authorId;
	}

	public Long getAssigneeUserId() {
		return assigneeUserId;
	}

	public void setAssigneeUserId(Long assigneeUserId) {
		this.assigneeUserId = assigneeUserId;
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

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public boolean isParentOnly() {
		return isParentOnly;
	}

	public void setParentOnly(boolean parentOnly) {
		isParentOnly = parentOnly;
	}
}
