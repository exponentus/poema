package workflow.dto;

import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.runtimeobj.IAppEntity;
import workflow.init.AppConst;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class OutgoingViewEntry {

    public UUID id;
    public String kind = "outgoing";

    public ApprovalStatusType status = ApprovalStatusType.DRAFT;
    public ApprovalResultType result = ApprovalResultType.PROJECT;
    public String title;
    public String regNumber;
    public Date appliedRegDate;
    public String recipient; // Organization
    public Map<LanguageCode, String> docLanguage;
    public Map<LanguageCode, String> docType;
    public Map<LanguageCode, String> docSubject;
    public String body;
    public boolean hasAttachments;

    public List<IAppEntity<UUID>> responses;

    public OutgoingViewEntry(UUID id, ApprovalStatusType status, ApprovalResultType result, String title, String regNumber, Date appliedRegDate, String recipient, Map<LanguageCode, String> docLanguage, Map<LanguageCode, String> docType, Map<LanguageCode, String> docSubject, String body, Long attachmentCount) {
        this.id = id;
        this.status = status;
        this.result = result;
        this.title = title;
        this.regNumber = regNumber;
        this.appliedRegDate = appliedRegDate;
        this.recipient = recipient;
        this.docLanguage = docLanguage;
        this.docType = docType;
        this.docSubject = docSubject;
        this.body = body;
        this.hasAttachments = attachmentCount > 0;
    }

    public String getURL() {
        return AppConst.BASE_URL + "outgoings/" + id;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
