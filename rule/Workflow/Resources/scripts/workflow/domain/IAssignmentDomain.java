package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.embedded.PrimaryDocument;

public interface IAssignmentDomain {
	Assignment composeNew(Employee author, PrimaryDocument primaryDocument, Assignment parent);

	void fillFromDto(Assignment entity, Assignment dto, Employee author);

	Outcome getOutcome(Assignment entity);
}
