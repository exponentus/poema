package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.ControlledDocument;

public interface IAssignmentDomain {
    Assignment composeNew(Employee author, ControlledDocument parent);

    void fillFromDto(Assignment entity, Assignment dto, Employee author);

    void resetAssignee(Assignment entity, Assignment dto, Employee resetEmployee);

    Outcome getOutcome(Assignment entity);
}
