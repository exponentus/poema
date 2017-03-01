package workflow.domain;

import com.exponentus.rest.outgoingpojo.Outcome;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Incoming;

public interface IAssignmentDomain {
    void composeNew(Employee author, Incoming incoming, Assignment parentAssignment);

    void fillFromDto(Employee author, Assignment dto);

    Outcome getOutcome();
}
