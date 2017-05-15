package workflow.dao.filter;

import reference.model.ControlType;
import staff.model.Employee;
import workflow.model.constants.ControlStatusType;

public class AssignmentFilter {

    private ControlStatusType controlStatusType;
    private ControlType controlType;
    private Employee appliedAuthor;
    private Employee assignee;

    public ControlStatusType getControlStatusType() {
        return controlStatusType;
    }

    public void setControlStatusType(ControlStatusType controlStatusType) {
        this.controlStatusType = controlStatusType;
    }

    public ControlType getControlType() {
        return controlType;
    }

    public void setControlType(ControlType controlType) {
        this.controlType = controlType;
    }

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
