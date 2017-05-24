package workflow.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.exponentus.dataengine.jpa.AppEntity;
import com.exponentus.runtimeobj.IAppEntity;

import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

public class AsProjectViewEntry extends AppEntity<UUID> {
	public String regNumber;
	public Date appliedRegDate;
	public ApprovalStatusType status;
	public ApprovalResultType result;
	public int version = 1;
	public boolean hasAttachments;

	public List<IAppEntity<UUID>> responses;

	public AsProjectViewEntry(UUID id, String title, String regNumber, Date appliedRegDate, int version) {
		this.id = id;
		this.title = title;
		this.regNumber = regNumber;
		this.appliedRegDate = appliedRegDate;
		this.status = status;
		this.result = result;
		this.version = version;
		//this.hasAttachments = attachmentCount > 0;
	}

}
