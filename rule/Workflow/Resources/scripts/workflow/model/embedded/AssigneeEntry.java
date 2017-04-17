package workflow.model.embedded;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SimpleAppEntity;

import staff.model.Employee;

@Entity
@Table(name = "assignee_entries")
public class AssigneeEntry extends SimpleAppEntity {

	@Column(name = "is_coordinator")
	private boolean isCoordinator;

	private Employee assignee;

	private Employee resetBy;

	@Column(name = "reset_time")
	private Date resetTime;

	@Column(name = "resetter_info")
	private String resetterInfo;

	public boolean isCoordinator() {
		return isCoordinator;
	}

	public void setCoordinator(boolean isCoordinator) {
		this.isCoordinator = isCoordinator;
	}

	public Employee getAssignee() {
		return assignee;
	}

	public void setAssignee(Employee assignee) {
		this.assignee = assignee;
	}

	public Employee getResetBy() {
		return resetBy;
	}

	public void setResetBy(Employee resetBy) {
		this.resetBy = resetBy;
	}

	public Date getResetTime() {
		return resetTime;
	}

	public void setResetTime(Date resetTime) {
		this.resetTime = resetTime;
	}

	public String getResetterInfo() {
		return resetterInfo;
	}

	public void setResetterInfo(String resetterInfo) {
		this.resetterInfo = resetterInfo;
	}
}
