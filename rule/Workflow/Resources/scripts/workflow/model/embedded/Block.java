package workflow.model.embedded;

import com.exponentus.common.model.SimpleAppEntity;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import reference.model.constants.ApprovalType;
import reference.model.constants.converter.ApprovalTypeConverter;
import workflow.domain.exception.ApprovalException;
import workflow.domain.exception.ApprovalExceptionType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import workflow.model.constants.DecisionType;
import com.exponentus.common.model.constants.converter.ApprovalStatusTypeConverter;

import javax.persistence.*;
import java.util.List;

/**
 * @author Kayra created 07-04-2016
 */

@Entity
@Table(name = "wf__blocks")
public class Block extends SimpleAppEntity {

	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "wf__block_approvers", uniqueConstraints = { @UniqueConstraint(columnNames = { "block_id", "sort" }),
			@UniqueConstraint(columnNames = { "block_id", "employee" }) })
	@OrderBy("sort")
	private List<Approver> approvers;

	@Convert(converter = ApprovalTypeConverter.class)
	private ApprovalType type = ApprovalType.UNKNOWN;

	@Column(name = "require_comment_if_no")
	private boolean requireCommentIfNo;

	@Column(name = "time_limit")
	private int timeLimit;

	private int version = 1;

	private int sort;

	public ApprovalStatusType getStatus() {
		return status;
	}

	public void setStatus(ApprovalStatusType status) {
		this.status = status;
	}

	public List<Approver> getApprovers() {
		return approvers;
	}

	public void setApprovers(List<Approver> approvers) {
		this.approvers = approvers;
	}

	public ApprovalType getType() {
		return type;
	}

	public void setType(ApprovalType type) {
		this.type = type;
	}

	public boolean isRequireCommentIfNo() {
		return requireCommentIfNo;
	}

	public void setRequireCommentIfNo(boolean requireCommentIfNo) {
		this.requireCommentIfNo = requireCommentIfNo;
	}

	public int getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	@JsonIgnore
	public Approver getCurrentApprover() {
		return approvers.stream().sorted((a, b) -> a.getSort() > b.getSort() ? 1 : -1).filter(Approver::isCurrent).findFirst().orElse(null);
	}

	@JsonIgnore
	public Approver getNextApprover() {
		return approvers.stream().sorted((a, b) -> a.getSort() > b.getSort() ? 1 : -1)
				.filter(approver -> approver.getDecisionType() == DecisionType.UNKNOWN).findFirst().orElse(null);
	}

	public Approver getApprover(IUser user) throws ApprovalException {
		Approver approver = approvers.stream().filter(a -> a.getEmployee().getUserID().equals(user.getId())).findFirst().orElse(null);

		if (approver == null) {
			throw new ApprovalException(ApprovalExceptionType.APPROVER_NOT_FOUND_IN_BLOCK, user.getLogin());
		}

		return approver;
	}
}
