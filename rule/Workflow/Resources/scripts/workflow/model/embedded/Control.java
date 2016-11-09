package workflow.model.embedded;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.exponentus.dataengine.jpa.SimpleAppEntity;

import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;
import workflow.model.util.ControlStatusTypeConverter;

@Entity
@Table(name = "controls")
public class Control extends SimpleAppEntity {
	
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
	
}
