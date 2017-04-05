package workflow.domain.impl;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.domain.IApplicationForVehicleDomain;
import workflow.model.ApplicationForVehicle;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalSchemaType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approval;

import java.util.ArrayList;
import java.util.Date;

public class ApplicationForVehicleDomain implements IApplicationForVehicleDomain {

    @Override
    public ApplicationForVehicle composeNew(Employee author) {
        ApplicationForVehicle entity = new ApplicationForVehicle();

        entity.setAuthor(author.getUser());
        entity.setAppliedRegDate(new Date());
        entity.setAppliedAuthor(author);

        Approval approval = new Approval();
        approval.setStatus(ApprovalStatusType.DRAFT);
        approval.setSchema(ApprovalSchemaType.REJECT_IF_NO);
        approval.setResult(ApprovalResultType.UNKNOWN);
        approval.setVersion(1);
        approval.setBlocks(new ArrayList<>());
        entity.setApproval(approval);

        return entity;
    }

    @Override
    public void fillFromDto(ApplicationForVehicle entity, ApplicationForVehicle dto, Employee author) {
        if (entity.isNew()) {
            entity.setAuthor(author.getUser());

            entity.addReaderEditor(entity.getAuthor());
            if (dto.getAppliedAuthor() != null) {
                entity.addReaderEditor(dto.getAppliedAuthor().getUser());
            }
        }

        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setAppliedAuthor(dto.getAppliedAuthor());
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setRecipient(dto.getRecipient());
        entity.setVehicle(dto.getVehicle());
        entity.setUseFrom(dto.getUseFrom());
        entity.setUseTo(dto.getUseTo());
        entity.setRoute(dto.getRoute());
        entity.setTags(dto.getTags());
        entity.setAttachments(dto.getAttachments());

        if (dto.getApproval() != null) {
            if (entity.isNew()) {
                dto.getApproval().setVersion(1);
            }
            entity.setApproval(dto.getApproval());
        } else {
            entity.setApproval(null);
        }
    }

    @Override
    public Outcome getOutcome(ApplicationForVehicle entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
