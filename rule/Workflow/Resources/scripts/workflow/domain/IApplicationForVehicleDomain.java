package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.model.ApplicationForVehicle;

public interface IApplicationForVehicleDomain {
    void composeNew(Employee author);

    void fillFromDto(Employee author, ApplicationForVehicle dto);

    Outcome getOutcome();
}
