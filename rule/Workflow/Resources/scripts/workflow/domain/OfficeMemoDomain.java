package workflow.domain;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.domain.exception.ApprovalException;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;

import java.util.Date;

public class OfficeMemoDomain {

    public OfficeMemo composeNew(User user, Employee appliedAuthor) throws ApprovalException {
        OfficeMemo om = new OfficeMemo();
        om.setAuthor(user);
        om.setAppliedRegDate(new Date());
        om.setAppliedAuthor(appliedAuthor);

        return om;
    }

    public void fillFromDto(OfficeMemo om, OfficeMemo dto, Employee author) throws DTOException {
        validate(dto);

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

    public boolean approvalCanBeStarted(OfficeMemo om) {
        return om.getStatus() == ApprovalStatusType.DRAFT;
    }

    public void startApproving(OfficeMemo om) throws ApprovalException, DTOException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.start();
    }

    public boolean employeeCanDoDecisionApproval(OfficeMemo om, Employee employee) {
        return om.userCanDoDecision(employee);
    }

    public void acceptApprovalBlock(OfficeMemo om, IUser<Long> user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.accept(user);
    }

    public void declineApprovalBlock(OfficeMemo om, IUser<Long> user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.decline(user, decisionComment);
    }

    public void skipApprovalBlock(OfficeMemo om) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.skip();
    }

    public boolean canCreateAssignment(OfficeMemo entity, User user) {
        return !entity.isNew()
                && entity.getRecipient().getUserID().equals(user.getId())
                && entity.getStatus() == ApprovalStatusType.FINISHED;
    }

    public void calculateReadersEditors(OfficeMemo entity) {
        entity.resetReadersEditors();
        if (entity.getStatus() == ApprovalStatusType.DRAFT) {
            entity.addReaderEditor(entity.getAuthor());
        } else {
            entity.addReader(entity.getAuthor());
        }
    }

    public boolean documentCanBeDeleted(OfficeMemo om) {
        return !om.isNew() && om.isEditable();
    }

    private void validate(OfficeMemo om) throws DTOException {
        DTOException e = new DTOException();
        if (om.getTitle() == null || om.getTitle().isEmpty()) {
            e.addError("title", "required", "field_is_empty");
        }
        if (om.getAppliedAuthor() == null) {
            e.addError("appliedAuthor", "required", "field_is_empty");
        }
        if (om.getRecipient() == null) {
            e.addError("recipient", "required", "field_is_empty");
        }
        if (e.hasError()) {
            throw e;
        }
    }

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
