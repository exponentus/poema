package workflow.dto;

import java.util.Date;

import workflow.model.embedded.AssigneeEntry;

public class AssigneeEntryShort {

	public Long id;

	public boolean isCoordinator;
	public String assignee;
	public String resetBy;
	public Date resetTime;
	public String resetterInfo;
	public int sort;

	public AssigneeEntryShort(AssigneeEntry ae) {
		this.id = ae.getId();
		this.isCoordinator = ae.isCoordinator();
		this.assignee = ae.getAssignee().getName();
		this.resetBy = ae.getResetBy().getName();
		this.resetTime = ae.getResetTime();
		this.resetterInfo = ae.getResetInfo();
		this.sort = ae.getSort();
	}
}
