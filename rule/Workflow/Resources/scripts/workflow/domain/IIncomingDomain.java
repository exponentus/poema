package workflow.domain;

import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.model.Incoming;

public interface IIncomingDomain {
    void compose();

    void fillFromDto(Incoming dto);

    Outcome getOutcome();
}
