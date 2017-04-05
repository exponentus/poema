package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Incoming;

public interface IAssignmentDomain {
    Assignment composeNew(Employee author, Incoming incoming, Assignment parentAssignment);

    void fillFromDto(Assignment entity, Assignment dto, Employee author);

    Outcome getOutcome(Assignment entity);
}
