package workflow.dto;

import com.exponentus.common.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import workflow.init.ModuleConst;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OfficeMemoViewEntry {

    public UUID id;
    public String kind = "officeMemo";

    public ApprovalStatusType status = ApprovalStatusType.DRAFT;
    public ApprovalResultType result = ApprovalResultType.PROJECT;
    public String title;
    public String regNumber;
    public Date appliedRegDate;
    public String appliedAuthor; // Employee
    public String recipient; // Employee
    public String body;
    public boolean hasAttachments;

    public long responsesCount;
    public List<IDTO> responses;

    public OfficeMemoViewEntry(UUID id, ApprovalStatusType status, ApprovalResultType result, String title, String regNumber, Date appliedRegDate, String appliedAuthor, String recipient, String body, Long attachmentCount) {
        this.id = id;
        this.status = status;
        this.result = result;
        this.title = title;
        this.regNumber = regNumber;
        this.appliedRegDate = appliedRegDate;
        this.appliedAuthor = appliedAuthor;
        this.recipient = recipient;
        this.body = body;
        this.hasAttachments = attachmentCount > 0;
    }

    public String getURL() {
        return ModuleConst.BASE_URL + "office-memos/" + id;
    }

    public void setResponsesCount(long responsesCount) {
        this.responsesCount = responsesCount;
    }

    public void setResponses(List<IDTO> responses) {
        this.responses = responses;
    }
}
