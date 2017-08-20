package workflow.dto;

import com.exponentus.localization.constants.LanguageCode;
import workflow.init.AppConst;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;

import java.util.*;

public class AssignmentViewEntry implements IDTO {

    public UUID id;
    public String kind = "assignment";

    public String appliedAuthor;
    public String title;
    public String body;
    public Map<LanguageCode, String> controlType; // ControlType
    public Date startDate;
    public Date dueDate;
    public ControlStatusType status = ControlStatusType.UNKNOWN;
    public List<AssigneeEntryShort> assigneeEntriesShort;
    public Collection<AssigneeEntry> assigneeEntries;
    public String assigneeEntriesText;
    public long responsesCount;
    public List<IDTO> responses;

    public AssignmentViewEntry(UUID id, String appliedAuthor, String title, String body, Map<LanguageCode, String> controlType,
                               Date startDate, Date dueDate, ControlStatusType status) {
        this.id = id;
        this.appliedAuthor = appliedAuthor;
        this.title = title;
        this.body = body;
        this.controlType = controlType;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public AssignmentViewEntry(UUID id,  String title, String body, Map<LanguageCode, String> controlType,
                               Date startDate, Date dueDate, ControlStatusType status, Object ae) {
        this.id = id;
        this.appliedAuthor = appliedAuthor;
        this.title = title;
        this.body = body;
        this.controlType = controlType;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;

        if (ae != null) {
            System.out.println(id + " " + ae.toString());
          //  this.assigneeEntriesText = ae;
           // assigneeEntries = ae;
        }
    }

    public AssignmentViewEntry(UUID id,  String title, String body, Map<LanguageCode, String> controlType,
                               Date startDate, Date dueDate, ControlStatusType status) {
        this.id = id;
        this.appliedAuthor = appliedAuthor;
        this.title = title;
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
