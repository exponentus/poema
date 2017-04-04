package workflow.domain.impl;

import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.domain.IApplicationForVehicleDomain;
import workflow.model.ApplicationForVehicle;

public class ApplicationForVehicleDomain implements IApplicationForVehicleDomain {

    private ApplicationForVehicle entity;

    public ApplicationForVehicleDomain(ApplicationForVehicle entity) {
        this.entity = entity;
    }

    @Override
    public void composeNew(Employee author) {

    }

    @Override
    public void fillFromDto(Employee author, ApplicationForVehicle dto) {

    }

    @Override
    public Outcome getOutcome() {
        return null;
    }
}
