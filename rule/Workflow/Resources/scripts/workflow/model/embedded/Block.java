package workflow.model.embedded;

/**
 *
 * @author Kayra created 07-04-2016
 */

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SimpleAppEntity;

import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.util.ApprovalStatusTypeConverter;
import workflow.model.util.ApprovalTypeConverter;

@Entity
@Table(name = "blocks")
public class Block extends SimpleAppEntity {
	
	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;
	
	@OneToMany(cascade = CascadeType.PERSIST)
	private List<Approver> approvers;
	
	@Convert(converter = ApprovalTypeConverter.class)
	private ApprovalType type = ApprovalType.UNKNOWN;
	
	@Column(name = "require_comment_if_no")
	private boolean requireCommentIfNo;
	
	@Column(name = "time_limit")
	private int timeLimit;
	
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
	
}
