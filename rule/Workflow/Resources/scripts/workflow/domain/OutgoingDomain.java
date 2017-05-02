package workflow.domain;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.domain.exception.ApprovalException;
import workflow.model.Outgoing;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;

public class OutgoingDomain {

    public Outgoing composeNew(User user) {
        Outgoing entity = new Outgoing();
        entity.setAppliedRegDate(new Date());
        return entity;
    }

    public void fillFromDto(Outgoing outgoing, Outgoing dto, User user) throws DTOException {
        validate(dto);

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

    public boolean approvalCanBeStarted(Outgoing outgoing) {
        return outgoing.getStatus() == ApprovalStatusType.DRAFT;
    }

    public void startApproving(Outgoing outgoing) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.start();
    }

    public boolean employeeCanDoDecisionApproval(Outgoing outgoing, Employee employee) {
        return outgoing.userCanDoDecision(employee);
    }

    public void acceptApprovalBlock(Outgoing outgoing, IUser<Long> user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.accept(user);
    }

    public void declineApprovalBlock(Outgoing outgoing, IUser<Long> user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.decline(user, decisionComment);
    }

    public void skipApprovalBlock(Outgoing outgoing) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
        lifecycle.skip();
    }

    private void validate(Outgoing m) throws DTOException {
        DTOException ve = new DTOException();

        if (m.getTitle() == null || m.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (m.getRecipient() == null) {
            ve.addError("recipient", "required", "field_is_empty");
        }

        if (m.getDocSubject() == null) {
            ve.addError("docSubject", "required", "field_is_empty");
        }

        if (m.getDocLanguage() == null) {
            ve.addError("docLanguage", "required", "field_is_empty");
        }

        if (m.getDocType() == null) {
            ve.addError("docType", "required", "field_is_empty");
        }
        if (ve.hasError()) {
            throw ve;
        }
    }

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
