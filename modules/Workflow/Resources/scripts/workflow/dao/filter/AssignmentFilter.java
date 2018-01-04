package workflow.dao.filter;

import com.exponentus.scripting.WebFormData;
import reference.model.ControlType;
import staff.model.Employee;
import workflow.model.constants.ControlStatusType;

import java.util.UUID;

public class AssignmentFilter {

    private ControlStatusType controlStatusType;
    private ControlType controlType;
    private Employee appliedAuthor;
    private Employee assignee;

    public AssignmentFilter() {
    }

    public AssignmentFilter(WebFormData formData) {

        if (!formData.getAnyValueSilently("status").isEmpty()) {
            ControlStatusType controlStatusType = ControlStatusType.valueOf(formData.getAnyValueSilently("status"));
            setControlStatusType(controlStatusType);
        }

        if (!formData.getAnyValueSilently("controlType").isEmpty()) {
            ControlType controlType = new ControlType();
            controlType.setId(UUID.fromString(formData.getAnyValueSilently("controlType")));
            setControlType(controlType);
        }
    }

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
