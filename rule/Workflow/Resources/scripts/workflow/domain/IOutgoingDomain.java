package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.model.Outgoing;

public interface IOutgoingDomain {
    void composeNew(User user);

    void fillFromDto(User user, Outgoing dto);

    Outcome getOutcome();
}