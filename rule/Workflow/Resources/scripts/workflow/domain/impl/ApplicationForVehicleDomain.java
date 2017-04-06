package workflow.domain.impl;

import java.util.ArrayList;
import java.util.Date;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;

import reference.model.constants.ApprovalSchemaType;
import staff.model.Employee;
import workflow.domain.IApplicationForVehicleDomain;
import workflow.model.ApplicationForVehicle;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

public class ApplicationForVehicleDomain implements IApplicationForVehicleDomain {

	@Override
	public ApplicationForVehicle composeNew(Employee author) {
		ApplicationForVehicle entity = new ApplicationForVehicle();

		entity.setAuthor(author.getUser());
		entity.setAppliedRegDate(new Date());
		entity.setAppliedAuthor(author);

		entity.setStatus(ApprovalStatusType.DRAFT);
		entity.setSchema(ApprovalSchemaType.REJECT_IF_NO);
		entity.setResult(ApprovalResultType.UNKNOWN);
		entity.setVersion(1);
		entity.setBlocks(new ArrayList<>());

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

		if (entity.isNew()) {
			dto.setVersion(1);
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
