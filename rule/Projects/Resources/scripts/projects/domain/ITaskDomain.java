package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import helpdesk.model.Demand;
import projects.exception.TaskException;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.model.TaskType;

import java.util.Date;

public interface ITaskDomain {

    Task composeNew(User user, Project project, Task parentTask, Demand demand, TaskType taskType, boolean initiative,
                    int dueDateRange);

    void fillFromDto(Task entity, Task dto);

    void changeStatus(Task entity, TaskStatusType status);

    void calculateStatus(Task entity);

    void changeAssignee(Task entity, User newAssignee);

    void calculateReaders(Task entity);

    void acknowledgedTask(Task entity, User user) throws TaskException;

    void completeTask(Task entity) throws TaskException;

    void prolongTask(Task entity, Date newDueDate) throws TaskException;

    void cancelTask(Task entity, String cancellationComment) throws TaskException;

    void returnToProcessing(Task entity);

    boolean taskIsEditable(Task entity);

    boolean taskCanBeDeleted(Task entity);

    boolean userCanDoAcknowledged(Task entity, User user);

    boolean userCanDoRequest(Task entity, User user);

    boolean userCanDoResolution(Task entity, User user);

    boolean userCanAddSubTask(Task entity, User user);

    Outcome getOutcome(Task entity);
}
