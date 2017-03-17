package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Report;

public interface IReportDomain {
	void composeNew(Employee author, Assignment parent);

	void fillFromDto(Employee author, Report dto);

	Outcome getOutcome();
}
