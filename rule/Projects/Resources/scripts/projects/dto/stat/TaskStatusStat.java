package projects.dto.stat;

import projects.model.constants.TaskStatusType;

public class TaskStatusStat {
    public TaskStatusType status;
    public long count;

    public TaskStatusStat(TaskStatusType status, long count) {
        this.status = status;
        this.count = count;
    }
}
