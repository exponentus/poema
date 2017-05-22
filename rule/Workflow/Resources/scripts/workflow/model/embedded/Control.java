package workflow.model.embedded;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.exponentus.user.IUser;

import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;
import workflow.model.constants.converter.ControlStatusTypeConverter;

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

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "status_time")
	private Date statusTime;

	@OneToMany(cascade = CascadeType.ALL)
	@OrderBy("sort")
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
		statusTime = new Date();
	}

	public List<AssigneeEntry> getAssigneeEntries() {
		return assigneeEntries;
	}

	public void setAssigneeEntries(List<AssigneeEntry> assigneeEntries) {
		this.assigneeEntries = assigneeEntries;
	}

	public boolean assigneesContainsUser(IUser<Long> user) {
		if (this.getAssigneeEntries() == null) {
			return false;
		}

		for (AssigneeEntry ae : this.getAssigneeEntries()) {
			if (ae.getAssignee().getUser().getId().equals(user.getId())) {
				return true;
			}
		}

		return false;
	}
}
