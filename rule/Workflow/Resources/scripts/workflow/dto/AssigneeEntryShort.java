package workflow.dto;

import workflow.model.embedded.AssigneeEntry;

import java.util.Date;

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
        this.resetterInfo = ae.getResetterInfo();
        this.sort = ae.getSort();
    }
}
