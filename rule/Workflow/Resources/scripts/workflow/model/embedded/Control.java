package workflow.model.embedded;

import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Embeddable
public class Control {

    private ControlType controlType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "control_due_date", nullable = true)
    private Date dueDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "control_status", length = 16)
    private ControlStatusType status = ControlStatusType.UNKNOWN;

    @OneToMany
    @JoinColumn
    private List<AssigneeEntry> assignees;

    public ControlType getControlType() {
        return controlType;
    }

    public void setControlType(ControlType controlType) {
        this.controlType = controlType;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public ControlStatusType getStatus() {
        return status;
    }

    public void setStatus(ControlStatusType status) {
        this.status = status;
    }

    public List<AssigneeEntry> getAssignees() {
        return assignees;
    }

    public void setAssignees(List<AssigneeEntry> assignees) {
        this.assignees = assignees;
    }
}
