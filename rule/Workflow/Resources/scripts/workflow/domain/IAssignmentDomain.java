package workflow.domain;

import com.exponentus.rest.outgoingpojo.Outcome;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Incoming;

public interface IAssignmentDomain {
    void compose(Employee author, Incoming incoming, Assignment parentAssignment);

    void fillFromDto(Assignment dto);

    Outcome getOutcome();
}
