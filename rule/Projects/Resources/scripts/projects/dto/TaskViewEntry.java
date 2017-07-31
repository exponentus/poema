package projects.dto;

import com.exponentus.runtimeobj.IAppEntity;
import projects.init.AppConst;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class TaskViewEntry {

    public UUID id;
    public String kind = "task";

    public String title;
    public String regNumber;
    public TaskType taskType;
    public TaskStatusType status = TaskStatusType.UNKNOWN;
    public Date statusDate;
    public TaskPriorityType priority = TaskPriorityType.NORMAL;
    public String cancellationComment;
    public String body;
    public Long assignee;
    public Date startDate;
    public Date dueDate;
    public List<Tag> tags;
    public boolean hasAttachments;
    public Long responsesCount;
    public List<IAppEntity<UUID>> responses;

    public TaskViewEntry(UUID id, String regNumber, TaskType taskType, TaskStatusType status, Date statusDate, TaskPriorityType priority,
                         String cancellationComment, String body, Long assignee, Date startDate, Date dueDate, List<Tag> tags, Long attachmentCount) {
        this.id = id;
        this.regNumber = regNumber;
        this.taskType = taskType;
        this.status = status;
        this.statusDate = statusDate;
        this.priority = priority;
        this.cancellationComment = cancellationComment;
        this.body = body;
        this.assignee = assignee;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.tags = tags;
        this.hasAttachments = attachmentCount > 0;
    }

    public TaskViewEntry(UUID id, String regNumber, TaskType taskType, TaskStatusType status, Date statusDate, TaskPriorityType priority,
                         String cancellationComment, String body, Long assignee, Date startDate, Date dueDate, Tag tag, Long attachmentCount) {
        this.id = id;
        this.regNumber = regNumber;
        this.taskType = taskType;
        this.status = status;
        this.statusDate = statusDate;
        this.priority = priority;
        this.cancellationComment = cancellationComment;
        this.body = body;
        this.assignee = assignee;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.tags = new ArrayList<>();
        this.tags.add(tag);
        this.hasAttachments = attachmentCount > 0;
    }

    public TaskViewEntry(UUID id, String regNumber, TaskType taskType, TaskStatusType status, TaskPriorityType priority, Date startDate,
                         Date dueDate, Tag tag) {
        this.id = id;
        this.regNumber = regNumber;
        this.taskType = taskType;
        this.status = status;
        this.priority = priority;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.tags = new ArrayList<>();
        this.tags.add(tag);
    }

    public TaskViewEntry(UUID id, String title, String regNumber, TaskStatusType status, TaskPriorityType priority, Date startDate, Date dueDate) {
        this.id = id;
        this.title = title;
        this.regNumber = regNumber;
        this.status = status;
        this.priority = priority;
        this.startDate = startDate;
        this.dueDate = dueDate;
    }

    public String getURL() {
        return AppConst.BASE_URL + "tasks/" + id;
    }

    public void setResponsesCount(Long count) {
        responsesCount = count;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
