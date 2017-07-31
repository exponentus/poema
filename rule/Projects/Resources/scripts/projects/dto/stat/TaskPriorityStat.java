package projects.dto.stat;

import projects.model.constants.TaskPriorityType;

public class TaskPriorityStat {
    public TaskPriorityType priority;
    public long count;

    public TaskPriorityStat(TaskPriorityType priority, long count) {
        this.priority = priority;
        this.count = count;
    }
}
