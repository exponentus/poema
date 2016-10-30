package workflow.model.embedded;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;

@Embeddable
public class Control {

	private ControlType controlType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "control_start_date")
	private Date startDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "control_due_date")
	private Date dueDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "control_status", length = 16)
	private ControlStatusType status = ControlStatusType.UNKNOWN;

	@OneToMany
	@JoinColumn
	private List<AssigneeEntry> assignees;

	@Column(name = "lead_assignee")
	protected Long leadAssignee;

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
