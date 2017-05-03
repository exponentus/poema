package workflow.dao.filter;

import staff.model.Employee;

public class AssignmentFilter {
    private Employee appliedAuthor;
    private Employee assignee;

    public Employee getAppliedAuthor() {
        return appliedAuthor;
    }

    public void setAppliedAuthor(Employee appliedAuthor) {
        this.appliedAuthor = appliedAuthor;
    }

    public Employee getAssignee() {
        return assignee;
    }

    public void setAssignee(Employee assignee) {
        this.assignee = assignee;
    }
}
