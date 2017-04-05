package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import workflow.domain.IIncomingDomain;
import workflow.model.Incoming;

import java.util.Date;

public class IncomingDomain implements IIncomingDomain {

    @Override
    public Incoming composeNew(User user) {
        Incoming entity = new Incoming();
        entity.setAuthor(user);
        entity.setAppliedRegDate(new Date());

        return entity;
    }

    @Override
    public void fillFromDto(Incoming entity, Incoming dto, User user) {
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
    public Outcome getOutcome(Incoming entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
