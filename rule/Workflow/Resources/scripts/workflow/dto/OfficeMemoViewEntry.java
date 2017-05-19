package workflow.dto;

import com.exponentus.runtimeobj.IAppEntity;
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
    public String appliedAuthor; // Employee
    public String recipient; // Employee
    public String body;
    public boolean hasAttachments;

    public List<IAppEntity<UUID>> responses;

    public OfficeMemoViewEntry(UUID id, ApprovalStatusType status, ApprovalResultType result, String regNumber, Date appliedRegDate, String appliedAuthor, String recipient, String body, Long attachmentCount) {
        this.id = id;
        this.status = status;
        this.result = result;
        this.regNumber = regNumber;
        this.appliedRegDate = appliedRegDate;
        this.appliedAuthor = appliedAuthor;
        this.recipient = recipient;
        this.body = body;
        this.hasAttachments = attachmentCount > 0;
    }

    public String getURL() {
        return AppConst.BASE_URL + "office-memos/" + id;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
