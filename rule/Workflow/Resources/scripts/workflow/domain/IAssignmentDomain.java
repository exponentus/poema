package workflow.domain;

import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.model.Assignment;

public interface IAssignmentDomain {
    void compose();

    void fillFromDto(Assignment dto);

    Outcome getOutcome();
}
