package resourcereservations.domain;

import com.exponentus.common.dto.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.user.IUser;
import com.exponentus.util.StringUtil;
import reference.model.constants.ApprovalType;
import resourcereservations.model.ApplicationForVehicle;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.exception.ApprovalException;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Block;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class ApplicationForVehicleDomain {

    public ApplicationForVehicle composeNew(Employee author) {
        ApplicationForVehicle entity = new ApplicationForVehicle();

        entity.setAuthor(author.getUser());
        entity.setAppliedRegDate(new Date());
        entity.setAppliedAuthor(author);
        entity.setRecipient(author);

        ArrayList<Block> blocks = new ArrayList<Block>();
        Block block = new Block();
        block.setType(ApprovalType.SIGNING);
        block.setSort(1);
        block.setStatus(ApprovalStatusType.DRAFT);
        block.setApprovers(new ArrayList<>());
        blocks.add(block);
        entity.setBlocks(blocks);

        return entity;
    }

    public void fillFromDto(ApplicationForVehicle entity, ApplicationForVehicle dto, Employee author)
            throws DTOException {
        validate(dto);

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
        entity.setBlocks(dto.getBlocks());
        entity.setSchema(dto.getSchema());
        entity.setObservers(dto.getObservers());

        if (entity.isNew()) {
            dto.setVersion(1);
        }
    }

    public boolean approvalCanBeStarted(ApplicationForVehicle entity) {
        return entity.getStatus() == ApprovalStatusType.DRAFT;
    }

    public void startApproving(ApplicationForVehicle om) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
        lifecycle.start();
    }

    public boolean employeeCanDoDecisionApproval(ApplicationForVehicle entity, Employee employee) {
        return entity.userCanDoDecision(employee);
    }

    public void acceptApprovalBlock(ApplicationForVehicle entity, IUser<Long> user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(entity);
        lifecycle.accept(user);
    }

    public void declineApprovalBlock(ApplicationForVehicle entity, IUser<Long> user, String decisionComment)
            throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(entity);
        lifecycle.decline(user, decisionComment);
    }

    private void validate(ApplicationForVehicle model) throws DTOException {
        DTOException fe = new DTOException();

        if (model.getTitle() == null || model.getTitle().isEmpty()) {
            fe.addError("title", "required", "field_is_empty");
        }
        if (model.getVehicle() == null) {
            fe.addError("vehicle", "required", "field_is_empty");
        }
        /*
         * if (model.getUseFrom() == null) { fe.addError("useFrom", "required",
		 * "field_is_empty"); }
		 */
        if (model.getUseTo() == null) {
            fe.addError("useTo", "required", "field_is_empty");
        }
        if (model.getRoute() == null || model.getRoute().trim().isEmpty()) {
            fe.addError("route", "required", "field_is_empty");
        }
        if (fe.hasError()) {
            throw fe;
        }
    }

    public Outcome getOutcome(ApplicationForVehicle entity) {
        Outcome outcome = new Outcome();

        if (StringUtil.isEmpty(entity.getTitle())) {
            outcome.setTitle("application_for_vehicle");
        } else {
            outcome.setTitle(entity.getTitle());
        }
        outcome.addPayload(entity.getEntityKind(), entity);
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
            Block block = ApprovalLifecycle.getProcessingBlock(entity);
            if (block != null) {
                Map<String, Boolean> flags = new HashMap<>();
                flags.put("approvalProcessingBlockRequireCommentIfNo", block.isRequireCommentIfNo());
                outcome.addPayload("flag", flags);
            }
        }

        return outcome;
    }
}
