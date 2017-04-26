package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.domain.IOutgoingDomain;
import workflow.exception.ApprovalException;
import workflow.model.Outgoing;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.domain.ApprovalLifecycle;

import java.util.Date;

public class OutgoingDomain implements IOutgoingDomain {

    @Override
    public Outgoing composeNew(User user) {
        Outgoing entity = new Outgoing();
        entity.setAppliedRegDate(new Date());
        return entity;
    }

    @Override
    public void fillFromDto(Outgoing entity, Outgoing dto, User user) {
        entity.setTitle(dto.getTitle());
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setDocSubject(dto.getDocSubject());
        entity.setDocLanguage(dto.getDocLanguage());
        entity.setDocType(dto.getDocType());
        entity.setRecipient(dto.getRecipient());
        entity.setBody(dto.getBody());
        entity.setObservers(dto.getObservers());
        entity.setAttachments(dto.getAttachments());
        entity.setTags(dto.getTags());

        entity.setBlocks(dto.getBlocks());
        entity.setSchema(dto.getSchema());
        entity.setStatus(ApprovalStatusType.FINISHED);
        entity.setResult(ApprovalResultType.WITHOUT_APPROVAL);

        if (entity.isNew()) {
            entity.setAuthor(user);
        }
    }

    @Override
    public boolean approvalCanBeStarted(Outgoing om) {
        return om.getStatus() == ApprovalStatusType.DRAFT;
    }

    @Override
    public void startApproving(Outgoing om) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.start();
    }

    @Override
    public boolean employeeCanDoDecisionApproval(Outgoing om, Employee employee) {
        return om.userCanDoDecision(employee);
    }

    @Override
    public void acceptApprovalBlock(Outgoing om, IUser<Long> user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.accept(user);
    }

    @Override
    public void declineApprovalBlock(Outgoing om, IUser<Long> user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.decline(user, decisionComment);
    }

    @Override
    public Outcome getOutcome(Outgoing entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
