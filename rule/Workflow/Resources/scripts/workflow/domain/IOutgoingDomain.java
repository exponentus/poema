package workflow.domain;

import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.model.Outgoing;

public interface IOutgoingDomain {
    void compose();

    void fillFromDto(Outgoing dto);

    Outcome getOutcome();
}
