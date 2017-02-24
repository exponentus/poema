package workflow.domain;

import com.exponentus.rest.outgoingpojo.Outcome;
import workflow.model.Report;

public interface IReportDomain {
    void compose();

    void fillFromDto(Report dto);

    Outcome getOutcome();
}
