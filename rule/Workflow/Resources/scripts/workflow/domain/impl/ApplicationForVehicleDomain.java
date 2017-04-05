package workflow.domain.impl;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.domain.IApplicationForVehicleDomain;
import workflow.model.ApplicationForVehicle;

public class ApplicationForVehicleDomain implements IApplicationForVehicleDomain {

    @Override
    public ApplicationForVehicle composeNew(Employee author) {
        return new ApplicationForVehicle();
    }

    @Override
    public void fillFromDto(ApplicationForVehicle entity, ApplicationForVehicle dto, Employee author) {

    }

    @Override
    public Outcome getOutcome(ApplicationForVehicle entity) {
        return null;
    }
}
