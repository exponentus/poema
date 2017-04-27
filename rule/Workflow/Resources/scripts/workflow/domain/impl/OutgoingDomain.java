package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.IOutgoingDomain;
import workflow.domain.exception.ApprovalException;
import workflow.model.Outgoing;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;

public class OutgoingDomain implements IOutgoingDomain {

    @Override
    public Outgoing composeNew(User user) {
        Outgoing entity = new Outgoing();
        entity.setAppliedRegDate(new Date());
        return entity;
    }

    @Override
    public void fillFromDto(Outgoing outgoing, Outgoing dto, User user) {
        outgoing.setTitle(dto.getTitle());
        outgoing.setAppliedRegDate(dto.getAppliedRegDate());
        outgoing.setDocSubject(dto.getDocSubject());
        outgoing.setDocLanguage(dto.getDocLanguage());
        outgoing.setDocType(dto.getDocType());
        outgoing.setRecipient(dto.getRecipient());
        outgoing.setBody(dto.getBody());
        outgoing.setObservers(dto.getObservers());
        outgoing.setAttachments(dto.getAttachments());
        outgoing.setTags(dto.getTags());

        outgoing.setBlocks(dto.getBlocks());
        outgoing.setSchema(dto.getSchema());
        outgoing.setStatus(ApprovalStatusType.FINISHED);
        outgoing.setResult(ApprovalResultType.WITHOUT_APPROVAL);

        if (outgoing.isNew()) {
            outgoing.setAuthor(user);
        }
    }

    @Override
    public boolean approvalCanBeStarted(Outgoing outgoing) {
        return outgoing.getStatus() == ApprovalStatusType.DRAFT;
    }

    @Override
    public void startApproving(Outgoing outgoing) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.start();
    }

    @Override
    public boolean employeeCanDoDecisionApproval(Outgoing outgoing, Employee employee) {
        return outgoing.userCanDoDecision(employee);
    }

    @Override
    public void acceptApprovalBlock(Outgoing outgoing, IUser<Long> user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.accept(user);
    }

    @Override
    public void declineApprovalBlock(Outgoing outgoing, IUser<Long> user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.decline(user, decisionComment);
    }

    @Override
    public void skipApprovalBlock(Outgoing outgoing) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.skip();
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
