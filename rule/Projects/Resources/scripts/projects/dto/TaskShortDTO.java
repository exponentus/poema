package projects.dto;

import com.exponentus.runtimeobj.IAppEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import projects.init.AppConst;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("task")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskShortDTO {

    public UUID id;

    public String kind = "task";

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

    public Long responsesCount;

    public List<IAppEntity<UUID>> responses;

    public TaskShortDTO(UUID id, String regNumber, TaskType taskType, TaskStatusType status, Date statusDate, TaskPriorityType priority, String cancellationComment, String body, Long assignee, Date startDate, Date dueDate, List<Tag> tags) {
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
    }

    public TaskShortDTO(UUID id, String regNumber, TaskType taskType, TaskStatusType status, Date statusDate, TaskPriorityType priority, String cancellationComment, String body, Long assignee, Date startDate, Date dueDate, Tag tag) {
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
