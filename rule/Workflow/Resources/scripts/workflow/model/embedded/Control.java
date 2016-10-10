package workflow.model.embedded;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;

@Embeddable
public class Control {
	private ControlType controlType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "due_date")
	private Date dueDate;

	@Enumerated(EnumType.STRING)
	@Column(length = 16)
	private ControlStatusType status = ControlStatusType.UNKNOWN;

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
