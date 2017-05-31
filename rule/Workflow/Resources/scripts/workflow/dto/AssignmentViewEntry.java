package workflow.dto;

import com.exponentus.localization.constants.LanguageCode;
import workflow.init.AppConst;
import workflow.model.constants.ControlStatusType;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class AssignmentViewEntry implements IDTO {

    public UUID id;
    public String kind = "assignment";

    public String appliedAuthor;
    public String body;
    public Map<LanguageCode, String> controlType; // ControlType
    public Date startDate;
    public Date dueDate;
    public ControlStatusType status = ControlStatusType.UNKNOWN;
    public List<AssigneeEntryShort> assigneeEntries;

    public long responsesCount;
    public List<IDTO> responses;

    public AssignmentViewEntry(UUID id, String appliedAuthor, String body, Map<LanguageCode, String> controlType, Date startDate, Date dueDate, ControlStatusType status) {
        this.id = id;
        this.appliedAuthor = appliedAuthor;
        this.body = body;
        this.controlType = controlType;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public void setResponsesCount(long responsesCount) {
        this.responsesCount = responsesCount;
    }

    public void setResponses(List<IDTO> responses) {
        this.responses = responses;
    }

    public String getURL() {
        return AppConst.BASE_URL + "assignments/" + id;
    }
}
