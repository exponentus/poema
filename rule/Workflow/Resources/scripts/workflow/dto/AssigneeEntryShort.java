package workflow.dto;

import staff.model.Employee;
import workflow.model.embedded.AssigneeEntry;

import java.util.Date;
import java.util.List;

public class AssigneeEntryShort implements IDTO {

    public Long id;

    public boolean isCoordinator;
    public String assignee;
    public String resetBy;
    public Date resetTime;
    public String resetterInfo;
    public int sort;

    public AssigneeEntryShort(List<AssigneeEntry> entry) {
        //this.id = ae.getId();
        System.out.println(entry.getClass().getSimpleName() + " " + entry.toString());
        /*this.isCoordinator = ae.isCoordinator();
        this.assignee = ae.getAssignee().getName();
        this.resetBy = ae.getResetBy().getName();
        this.resetTime = ae.getResetTime();
        this.resetterInfo = ae.getResetInfo();
        this.sort = ae.getSort();*/
    }

    public AssigneeEntryShort(Employee entry) {
        System.out.println(entry.getClass().getSimpleName() + " " + entry.getTitle());

    }


}
