package workflow.dto;

import staff.model.Employee;
import workflow.init.AppConst;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;
import java.util.UUID;

public class OfficeMemoViewEntryDTO {

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

    public String getURL() {
        return AppConst.BASE_URL + "office-memos/" + id;
    }
}
