package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Report;

public interface IReportDomain {
    Report composeNew(Employee author, Assignment parent);

    void fillFromDto(Report entity, Report dto, Employee author);

    Outcome getOutcome(Report entity);
}
