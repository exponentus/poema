package resourcereservations.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import resourcereservations.model.ApplicationForMeetingRoom;
import staff.model.Employee;
import workflow.domain.exception.ApprovalException;

public interface IApplicationForMeetingRoomDomain {
    ApplicationForMeetingRoom composeNew(Employee author);

    void fillFromDto(ApplicationForMeetingRoom entity, ApplicationForMeetingRoom dto, Employee author);

    boolean approvalCanBeStarted(ApplicationForMeetingRoom entity);

    void startApproving(ApplicationForMeetingRoom entity) throws ApprovalException;

    boolean employeeCanDoDecisionApproval(ApplicationForMeetingRoom entity, Employee employee);

    void acceptApprovalBlock(ApplicationForMeetingRoom entity, IUser<Long> user) throws ApprovalException;

    void declineApprovalBlock(ApplicationForMeetingRoom entity, IUser<Long> user, String decisionComment) throws ApprovalException;

    Outcome getOutcome(ApplicationForMeetingRoom entity);
}
