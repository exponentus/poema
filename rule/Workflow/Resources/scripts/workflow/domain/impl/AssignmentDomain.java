package workflow.domain.impl;

import java.util.Date;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;

import staff.model.Employee;
import workflow.domain.IAssignmentDomain;
import workflow.model.Assignment;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;
import workflow.model.embedded.PrimaryDocument;

public class AssignmentDomain implements IAssignmentDomain {

	@Override
	public Assignment composeNew(Employee author, PrimaryDocument primaryDocument, Assignment parent) {
		Assignment entity = new Assignment();

		entity.setAuthor(author.getUser());
		entity.setAppliedAuthor(author);
		if (primaryDocument != null) {
			entity.setPrimaryDocument(primaryDocument);
		} else {
			entity.setParent(parent);
		}
		Control newControl = new Control();
		newControl.setStartDate(new Date());
		entity.setControl(newControl);

		return entity;
	}

	@Override
	public void fillFromDto(Assignment entity, Assignment dto, Employee author) {
		if (entity.isNew()) {
			entity.setAuthor(author.getUser());
			// entity.setParent(dto.getParent());

			entity.addReaderEditor(entity.getAuthor());
			if (dto.getAppliedAuthor() != null) {
				entity.addReaderEditor(dto.getAppliedAuthor().getUser());
			}
		}

		entity.setTitle(dto.getTitle());
		entity.setBody(dto.getBody());
		entity.setAppliedAuthor(dto.getAppliedAuthor());
		entity.setObservers(dto.getObservers());
		// TODO fix, rm
		for (AssigneeEntry it : dto.getControl().getAssigneeEntries()) {
			it.setResetBy(author);
		}
		//
		entity.setControl(dto.getControl());
		entity.setAttachments(dto.getAttachments());
	}

	@Override
	public Outcome getOutcome(Assignment entity) {
		Outcome outcome = new Outcome();

		outcome.setTitle(entity.getTitle());
		outcome.addPayload(entity);
		PrimaryDocument parent = entity.getPrimaryDocument();
		if (parent != null) {
			outcome.addPayload("parent", parent);
		} else {
			outcome.addPayload("parent", entity.getParent());
		}
		if (!entity.isNew()) {
			outcome.addPayload(new ACL(entity));
		}

		return outcome;
	}
}
