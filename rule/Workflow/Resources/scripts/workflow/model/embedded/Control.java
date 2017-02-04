package workflow.model.embedded;

import com.exponentus.user.IUser;
import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;
import workflow.model.util.ControlStatusTypeConverter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Embeddable
public class Control {

    @NotNull
    @ManyToOne(optional = false)
    private ControlType controlType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "due_date")
    private Date dueDate;

    @Convert(converter = ControlStatusTypeConverter.class)
    private ControlStatusType status = ControlStatusType.UNKNOWN;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "control_assigneeentries")
    private List<AssigneeEntry> assigneeEntries;

    public ControlType getControlType() {
        return controlType;
    }

    public void setControlType(ControlType controlType) {
        this.controlType = controlType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
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

    public List<AssigneeEntry> getAssigneeEntries() {
        return assigneeEntries;
    }

    public void setAssigneeEntries(List<AssigneeEntry> assigneeEntries) {
        this.assigneeEntries = assigneeEntries;
    }

    public boolean assigneesContainsUser(IUser user) {
        for (AssigneeEntry ae : this.getAssigneeEntries()) {
            if (ae.getAssignee().equals((long) user.getId())) {
                return true;
            }
        }

        return false;
    }
}
