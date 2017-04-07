package resourcereservations.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.model.ApplicationForVehicle;
import workflow.model.exception.ApprovalException;

public interface IApplicationForVehicleDomain {
    ApplicationForVehicle composeNew(Employee author);

    void fillFromDto(ApplicationForVehicle entity, ApplicationForVehicle dto, Employee author);

    boolean approvalCanBeStarted(ApplicationForVehicle entity);

    void startApproving(ApplicationForVehicle entity) throws ApprovalException;

    boolean employeeCanDoDecisionApproval(ApplicationForVehicle entity, Employee employee);

    void acceptApprovalBlock(ApplicationForVehicle entity, IUser<Long> user) throws ApprovalException;

    void declineApprovalBlock(ApplicationForVehicle entity, IUser<Long> user, String decisionComment) throws ApprovalException;

    Outcome getOutcome(ApplicationForVehicle entity);
}
