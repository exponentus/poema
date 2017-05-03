package workflow.dao.filter;

import staff.model.Employee;
import workflow.model.Assignment;

public class AssignmentFilter extends Assignment {
    // controlType

    private Employee assignee;

    public Employee getAssignee() {
        return assignee;
    }

    public void setAssignee(Employee assignee) {
        this.assignee = assignee;
    }
}
