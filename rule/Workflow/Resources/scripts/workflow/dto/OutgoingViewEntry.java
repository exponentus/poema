package workflow.dto;

import com.exponentus.localization.constants.LanguageCode;
import workflow.init.AppConst;
import workflow.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalStatusType;

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

    public long responsesCount;
    public List<IDTO> responses;

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

    public void setResponsesCount(long responsesCount) {
        this.responsesCount = responsesCount;
    }

    public void setResponses(List<IDTO> responses) {
        this.responses = responses;
    }
}
