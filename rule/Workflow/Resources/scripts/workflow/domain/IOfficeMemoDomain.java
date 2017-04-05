package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.model.OfficeMemo;

public interface IOfficeMemoDomain {
    OfficeMemo composeNew(User user, Employee appliedAuthor);

    void fillFromDto(OfficeMemo entity, OfficeMemo dto, Employee author);

    boolean approvalCanBeStarted(OfficeMemo entity);

    void startApproving(OfficeMemo entity);

    boolean employeeCanDoDecisionApproval(OfficeMemo entity, Employee employee);

    void acceptApprovalBlock(OfficeMemo entity, Employee employee);

    void declineApprovalBlock(OfficeMemo entity, Employee employee, String decisionComment);

    boolean documentCanBeDeleted(OfficeMemo entity);

    Outcome getOutcome(OfficeMemo entity);
}
