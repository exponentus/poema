package workflow.dto;

import com.exponentus.runtimeobj.IAppEntity;
import staff.model.Employee;
import workflow.init.AppConst;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OfficeMemoViewEntry {

    public UUID id;
    public String kind = "officeMemo";

    public ApprovalStatusType status = ApprovalStatusType.DRAFT;
    public ApprovalResultType result = ApprovalResultType.PROJECT;
    public String regNumber;
    public Date appliedRegDate;
    public Employee appliedAuthor;
    public Employee recipient;
    public String body;
    public boolean hasAttachments;

    public List<IAppEntity<UUID>> responses;

    public String getURL() {
        return AppConst.BASE_URL + "office-memos/" + id;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
