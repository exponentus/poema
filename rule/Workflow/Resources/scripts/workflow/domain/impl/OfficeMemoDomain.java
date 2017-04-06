package workflow.domain.impl;

import java.util.Date;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;

import administrator.model.User;
import staff.model.Employee;
import workflow.domain.IOfficeMemoDomain;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.exception.ApprovalException;
import workflow.model.util.ApprovalLifecycle;

public class OfficeMemoDomain implements IOfficeMemoDomain {

	@Override
	public OfficeMemo composeNew(User user, Employee appliedAuthor) {
		OfficeMemo om = new OfficeMemo();
		om.setAuthor(user);
		om.setAppliedRegDate(new Date());
		om.setAppliedAuthor(appliedAuthor);
		return om;
	}

	@Override
	public void fillFromDto(OfficeMemo om, OfficeMemo dto, Employee author) {
		om.setAppliedAuthor(dto.getAppliedAuthor());
		om.setAppliedRegDate(dto.getAppliedRegDate());
		om.setTitle(dto.getTitle());
		om.setBody(dto.getBody());
		om.setRecipient(dto.getRecipient());
		om.setAttachments(dto.getAttachments());
		om.setBlocks(dto.getBlocks());
		om.setSchema(dto.getSchema());

		if (om.isNew()) {
			dto.setVersion(1);
		}

		if (om.isNew()) {
			om.setAuthor(author.getUser());
			om.addReaderEditor(om.getAuthor());
			om.addReaderEditor(dto.getAppliedAuthor().getUser());
		}
	}

	@Override
	public boolean approvalCanBeStarted(OfficeMemo om) {
		return om.getStatus() == ApprovalStatusType.DRAFT;
	}

	@Override
	public void startApproving(OfficeMemo om) {
		try {
			ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
			lifecycle.start();
		} catch (ApprovalException e) {
			throw new IllegalStateException("Approval error");
		}
	}

	@Override
	public boolean employeeCanDoDecisionApproval(OfficeMemo om, Employee employee) {
		return om.userCanDoDecision(employee);
	}

	@Override
	public void acceptApprovalBlock(OfficeMemo om, IUser<Long> user) {
		try {
			ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
			lifecycle.accept(user);
		} catch (ApprovalException e) {
			throw new IllegalStateException("Approval error");
		}
	}

	@Override
	public void declineApprovalBlock(OfficeMemo om, IUser<Long> user, String decisionComment) {
		try {
			ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
			lifecycle.decline(user, decisionComment);
		} catch (ApprovalException e) {
			throw new IllegalStateException("Approval error");
		}

	}

	@Override
	public boolean documentCanBeDeleted(OfficeMemo om) {
		return !om.isNew() && om.isEditable();
	}

	@Override
	public Outcome getOutcome(OfficeMemo om) {
		Outcome outcome = new Outcome();

		outcome.setTitle(om.getTitle());
		outcome.addPayload(om);
		if (!om.isNew()) {
			outcome.addPayload(new ACL(om));
		}

		return outcome;
	}
}
