package workflow.model.embedded;

import java.util.Date;

import javax.persistence.Column;

public class AssigneeEntry {
	private Long assignee;

	@Column(name = "reset_time")
	private Date resetTime;

	@Column(name = "resetter_info")
	private String resetterInfo;

	public Long getAssignee() {
		return assignee;
	}

	public void setAssignee(Long assignee) {
		this.assignee = assignee;
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
