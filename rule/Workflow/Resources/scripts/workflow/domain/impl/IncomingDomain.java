package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.domain.IIncomingDomain;
import workflow.model.Incoming;

import java.util.Date;

public class IncomingDomain implements IIncomingDomain {

    private Incoming entity;

    public IncomingDomain(Incoming entity) {
        this.entity = entity;
    }

    @Override
    public void composeNew(User user) {
        if (!entity.isNew()) {
            throw new IllegalStateException("entity_is_not_new");
        }

        entity.setAuthor(user);
        entity.setAppliedRegDate(new Date());
    }

    @Override
    public void fillFromDto(User user, Incoming dto) {
        entity.setTitle(dto.getTitle());
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setDocLanguage(dto.getDocLanguage());
        entity.setDocType(dto.getDocType());
        entity.setSender(dto.getSender());
        entity.setAddressee(dto.getAddressee());
        entity.setResponseTo(dto.getResponseTo());
        entity.setSenderRegNumber(dto.getSenderRegNumber());
        entity.setSenderAppliedRegDate(dto.getSenderAppliedRegDate());
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
