package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.model.Incoming;

public interface IIncomingDomain {
    void compose(User user);

    void fillFromDto(User user, Incoming dto);

    Outcome getOutcome();
}
