package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import workflow.model.Outgoing;

public interface IOutgoingDomain {
    Outgoing composeNew(User user);

    void fillFromDto(Outgoing entity, Outgoing dto, User user);

    Outcome getOutcome(Outgoing entity);
}
