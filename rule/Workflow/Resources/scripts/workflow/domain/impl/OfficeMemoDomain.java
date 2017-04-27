package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.IOfficeMemoDomain;
import workflow.domain.exception.ApprovalException;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;

public class OfficeMemoDomain implements IOfficeMemoDomain {

    @Override
    public OfficeMemo composeNew(User user, Employee appliedAuthor) throws ApprovalException {
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
        om.setObservers(dto.getObservers());

        if (om.isNew()) {
            om.setVersion(1);
            om.setAuthor(author.getUser());
        }
    }

    @Override
    public boolean approvalCanBeStarted(OfficeMemo om) {
        return om.getStatus() == ApprovalStatusType.DRAFT;
    }

    @Override
    public void startApproving(OfficeMemo om) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.start();
    }

    @Override
    public boolean employeeCanDoDecisionApproval(OfficeMemo om, Employee employee) {
        return om.userCanDoDecision(employee);
    }

    @Override
    public void acceptApprovalBlock(OfficeMemo om, IUser<Long> user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.accept(user);
    }

    @Override
    public void declineApprovalBlock(OfficeMemo om, IUser<Long> user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.decline(user, decisionComment);
    }

    @Override
    public void skipApprovalBlock(OfficeMemo om) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.skip();
    }

    @Override
    public boolean canCreateAssignment(OfficeMemo entity, User user) {
        return !entity.isNew()
                && entity.getRecipient().getUserID().equals(user.getId())
                && entity.getStatus() == ApprovalStatusType.FINISHED;
    }

    @Override
    public void calculateReadersEditors(OfficeMemo entity) {
        entity.resetReadersEditors();
        if (entity.getStatus() == ApprovalStatusType.DRAFT) {
            entity.addReaderEditor(entity.getAuthor());
        } else {
            entity.addReader(entity.getAuthor());
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
        outcome.addPayload(om.getEntityKind(), om);
        if (!om.isNew()) {
            outcome.addPayload(new ACL(om));
        }

        return outcome;
    }
}
