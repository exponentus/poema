package workflow.dto;

import com.exponentus.localization.constants.LanguageCode;
import workflow.init.AppConst;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class IncomingViewEntry implements IDTO {

    public UUID id;
    public String kind = "incoming";

    public String title;
    public String regNumber;
    public Date appliedRegDate;
    public String sender; // Organization
    public String senderRegNumber;
    public Date senderAppliedRegDate;
    public String addressee; // Employee
    public Map<LanguageCode, String> docLanguage;
    public Map<LanguageCode, String> docType;
    public Map<LanguageCode, String> docSubject;
    public String body;
    public boolean hasAttachments;

    public long responsesCount;
    public List<IDTO> responses;

    public IncomingViewEntry(UUID id, String title, String regNumber, Date appliedRegDate, String senderOrgName,
                             String senderRegNumber, Date senderAppliedRegDate, String addresseeEmpName, Map<LanguageCode, String> docLanguage,
                             Map<LanguageCode, String> docType, Map<LanguageCode, String> docSubject, String body, Long attachmentCount) {
        this.id = id;
        this.title = title;
        this.regNumber = regNumber;
        this.appliedRegDate = appliedRegDate;
        this.sender = senderOrgName;
        this.senderRegNumber = senderRegNumber;
        this.senderAppliedRegDate = senderAppliedRegDate;
        this.addressee = addresseeEmpName;
        this.docLanguage = docLanguage;
        this.docType = docType;
        this.docSubject = docSubject;
        this.body = body;
        this.hasAttachments = attachmentCount > 0;
    }

    public String getURL() {
        return AppConst.BASE_URL + "incomings/" + id;
    }

    public void setResponsesCount(long responsesCount) {
        this.responsesCount = responsesCount;
    }

    public void setResponses(List<IDTO> responses) {
        this.responses = responses;
    }
}
