package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.domain.exception.ApprovalException;
import workflow.model.Outgoing;

public interface IOutgoingDomain {
    Outgoing composeNew(User user);

    void fillFromDto(Outgoing entity, Outgoing dto, User user);

    boolean approvalCanBeStarted(Outgoing entity);

    void startApproving(Outgoing entity) throws ApprovalException;

    boolean employeeCanDoDecisionApproval(Outgoing entity, Employee employee);

    void acceptApprovalBlock(Outgoing entity, IUser<Long> user) throws ApprovalException;

    void declineApprovalBlock(Outgoing entity, IUser<Long> user, String decisionComment) throws ApprovalException;

    Outcome getOutcome(Outgoing entity);
}
