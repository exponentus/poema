package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.model.TaskType;

import java.util.Date;

public interface ITaskDomain {

    enum PERMISSIONS {
        SAVE, DELETE, ACKNOWLEDGED, COMPLETE, CANCEL, PROCESSING
    }

    enum Events {
        NotifyAssigneeOfNewTask, NotifyOfTaskAcknowledging, NotifyOfTaskCompleted, NotifyOfTaskCancelled
    }

    void composeNew(User user, Project project, Task parentTask, TaskType taskType, boolean initiative, int dueDateRange);

    void fillFromDto(Task dto);

    void changeStatus(TaskStatusType status);

    void calculateStatus();

    void changeAssignee(User newAssignee);

    void calculateReaders();

    void acknowledgedTask(User user) throws Exception;

    void completeTask();

    void prolongTask(Date newDueDate);

    void cancelTask(String cancellationComment);

    void returnToProcessing();

    boolean taskIsEditable();

    boolean taskCanBeDeleted();

    boolean userCanDoAcknowledged(User user);

    boolean userCanDoRequest(User user);

    boolean userCanDoResolution(User user);

    boolean userCanAddSubTask(User user);

    Outcome getOutcome();
}
