package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import workflow.model.Incoming;

public interface IIncomingDomain {
    Incoming composeNew(User user);

    void fillFromDto(Incoming entity, Incoming dto, User user);

    Outcome getOutcome(Incoming entity);
}
