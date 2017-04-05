package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.user.IUser;

import administrator.model.User;
import staff.model.Employee;
import workflow.model.OfficeMemo;

public interface IOfficeMemoDomain {
	OfficeMemo composeNew(User user, Employee appliedAuthor);

	void fillFromDto(OfficeMemo entity, OfficeMemo dto, Employee author);

	boolean approvalCanBeStarted(OfficeMemo entity);

	void startApproving(OfficeMemo entity);

	boolean employeeCanDoDecisionApproval(OfficeMemo entity, Employee employee);

	void acceptApprovalBlock(OfficeMemo entity, IUser<Long> user);

	void declineApprovalBlock(OfficeMemo entity, IUser<Long> user, String decisionComment);

	boolean documentCanBeDeleted(OfficeMemo entity);

	Outcome getOutcome(OfficeMemo entity);
}
