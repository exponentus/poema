package workflow.domain.impl;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import workflow.domain.IOutgoingDomain;
import workflow.model.Outgoing;

public class OutgoingDomain implements IOutgoingDomain {

	private Outgoing entity;

	public OutgoingDomain(Outgoing outgoing) {
		entity = outgoing;
	}

	@Override
	public void composeNew(User user) {
		if (!entity.isNew()) {
			throw new IllegalStateException("entity_is_not_new");
		}
	}

	@Override
	public void fillFromDto(User user, Outgoing dto) {
		entity.setTitle(dto.getTitle());
		entity.setAppliedRegDate(dto.getAppliedRegDate());
		entity.setDocSubject(dto.getDocSubject());
		entity.setDocLanguage(dto.getDocLanguage());
		entity.setDocType(dto.getDocType());
		entity.setRecipient(dto.getRecipient());
		entity.setBody(dto.getBody());
		entity.setAttachments(dto.getAttachments());

		if (entity.isNew()) {
			entity.setAuthor(user);
			entity.addReaderEditor(entity.getAuthor());
		}
	}

	@Override
	public Outcome getOutcome() {
		Outcome outcome = new Outcome();

		outcome.setTitle(entity.getTitle());
		outcome.addPayload(entity);
		if (!entity.isNew()) {
			outcome.addPayload(new ACL(entity));
		}

		return outcome;
	}
}
