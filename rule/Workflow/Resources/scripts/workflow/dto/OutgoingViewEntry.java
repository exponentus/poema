package workflow.dto;

import com.exponentus.runtimeobj.IAppEntity;
import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import staff.model.Organization;
import workflow.init.AppConst;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OutgoingViewEntry {

    public UUID id;
    public String kind = "outgoing";

    public ApprovalStatusType status = ApprovalStatusType.DRAFT;
    public ApprovalResultType result = ApprovalResultType.PROJECT;
    public String regNumber;
    public Date appliedRegDate;
    public Organization recipient;
    public DocumentLanguage docLanguage;
    public DocumentType docType;
    public DocumentSubject docSubject;
    public String body;
    public boolean hasAttachments;

    public List<IAppEntity<UUID>> responses;

    public String getURL() {
        return AppConst.BASE_URL + "outgoings/" + id;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
