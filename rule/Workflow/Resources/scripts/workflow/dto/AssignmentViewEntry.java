package workflow.dto;

import com.exponentus.runtimeobj.IAppEntity;
import reference.model.ControlType;
import workflow.init.AppConst;
import workflow.model.constants.ControlStatusType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class AssignmentViewEntry {

    public UUID id;
    public String kind = "assignment";

    public String appliedAuthor;
    public String body;
    public ControlType controlType;
    public Date startDate;
    public Date dueDate;
    public ControlStatusType status = ControlStatusType.UNKNOWN;
    public List<AssigneeEntryShort> assigneeEntries;

    public List<IAppEntity<UUID>> responses;

    public AssignmentViewEntry(UUID id, String appliedAuthor, String body, ControlType controlType, Date startDate, Date dueDate, ControlStatusType status) {
        this.id = id;
        this.appliedAuthor = appliedAuthor;
        this.body = body;
        this.controlType = controlType;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }

    public String getURL() {
        return AppConst.BASE_URL + "assignments/" + id;
    }
}
