package workflow.model.embedded;

import java.util.Date;

import com.exponentus.env.Environment;

import staff.model.Employee;

public class AssigneeEntry {

	private boolean isCoordinator;

	private Employee assignee;

	private Employee resetBy;

	private Date resetTime;

	private String resetterInfo;

	public boolean isCoordinator() {
		return isCoordinator;
	}

	public void setCoordinator(boolean isCoordinator) {
		this.isCoordinator = isCoordinator;
	}

	public Employee getAssignee() {
		return (Employee) Environment.getExtUserDAO().getEmployee(assignee.getId());
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
