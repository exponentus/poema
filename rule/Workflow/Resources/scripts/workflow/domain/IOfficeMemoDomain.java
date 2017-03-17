package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import staff.model.Employee;
import workflow.model.OfficeMemo;

public interface IOfficeMemoDomain {
	void composeNew(User user, Employee appliedAuthor);

	void fillFromDto(Employee author, OfficeMemo dto);

	boolean approvalCanBeStarted();

	void startApproving();

	boolean employeeCanDoDecisionApproval(Employee employee);

	void acceptApprovalBlock(Employee employee);

	void declineApprovalBlock(Employee employee, String decisionComment);

	boolean documentCanBeDeleted();

	Outcome getOutcome();
}
