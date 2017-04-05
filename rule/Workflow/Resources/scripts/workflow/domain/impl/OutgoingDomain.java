package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import workflow.domain.IOutgoingDomain;
import workflow.model.Outgoing;

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
        entity.setAttachments(dto.getAttachments());

        if (entity.isNew()) {
            entity.setAuthor(user);
            entity.addReaderEditor(entity.getAuthor());
        }
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
