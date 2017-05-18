package workflow.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.exponentus.runtimeobj.IAppEntity;

import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import workflow.init.AppConst;

public class IncomingViewEntry {

	public UUID id;
	public String kind = "incoming";

	public String regNumber;
	public Date appliedRegDate;
	public String senderOrgName;
	public String senderRegNumber;
	public Date senderAppliedRegDate;
	public String addresseeEmpName;
	public DocumentLanguage docLanguage;
	public DocumentType docType;
	public DocumentSubject docSubject;
	public String body;
	public boolean hasAttachments;

	public List<IAppEntity<UUID>> responses;

	public IncomingViewEntry(UUID id, String regNumber, Date appliedRegDate, String senderOrgName,
			String senderRegNumber, Date senderAppliedRegDate, String addresseeEmpName, DocumentLanguage docLanguage,
			DocumentType docType, DocumentSubject docSubject, String body, Long attachmentCount) {
		this.id = id;
		this.regNumber = regNumber;
		this.appliedRegDate = appliedRegDate;
		this.senderOrgName = senderOrgName;
		this.senderRegNumber = senderRegNumber;
		this.senderAppliedRegDate = senderAppliedRegDate;
		this.addresseeEmpName = addresseeEmpName;
		this.docLanguage = docLanguage;
		this.docType = docType;
		this.docSubject = docSubject;
		this.body = body;
		this.hasAttachments = attachmentCount > 0;
	}

	public String getURL() {
		return AppConst.BASE_URL + "incomings/" + id;
	}

	public void setResponses(List<IAppEntity<UUID>> responses) {
		this.responses = responses;
	}
}
