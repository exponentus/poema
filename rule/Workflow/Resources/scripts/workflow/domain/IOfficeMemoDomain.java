package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;
import staff.model.Employee;
import workflow.model.OfficeMemo;
import workflow.model.exception.ApprovalException;

public interface IOfficeMemoDomain {
    OfficeMemo composeNew(User user, Employee appliedAuthor);

    void fillFromDto(OfficeMemo entity, OfficeMemo dto, Employee author);

    boolean approvalCanBeStarted(OfficeMemo entity);

    void startApproving(OfficeMemo entity) throws ApprovalException;

    boolean employeeCanDoDecisionApproval(OfficeMemo entity, Employee employee);

    void acceptApprovalBlock(OfficeMemo entity, IUser<Long> user) throws ApprovalException;

    void declineApprovalBlock(OfficeMemo entity, IUser<Long> user, String decisionComment) throws ApprovalException;

    boolean documentCanBeDeleted(OfficeMemo entity);

    Outcome getOutcome(OfficeMemo entity);
}
