package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.model.ApplicationForVehicle;

public interface IApplicationForVehicleDomain {
    ApplicationForVehicle composeNew(Employee author);

    void fillFromDto(ApplicationForVehicle entity, ApplicationForVehicle dto, Employee author);

    Outcome getOutcome(ApplicationForVehicle entity);
}
