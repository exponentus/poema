package workflow.model.embedded;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;

/**
 *
 * @author Kayra created 07-04-2016
 */

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SimpleAppEntity;

import workflow.model.constants.DecisionType;
import workflow.model.util.DecisionTypeConverter;

@Entity
@Table(name = "approvers")
public class Approver extends SimpleAppEntity {

	@Column(name = "approver_user", nullable = false)
	protected Long approverUser;

	@Convert(converter = DecisionTypeConverter.class)
	private DecisionType type = DecisionType.UNKNOWN;

	@Column(name = "decision_time")
	private Date decisionTime;

	@Column(name = "decision_comment")
	private String decisionComment;
	
	@Column(name = "is_current")
	private boolean isCurrent;

	public Long getApproverUser() {
		return approverUser;
	}

	@OneToMany(cascade = CascadeType.ALL)
	private List<Block> blocks;
	
	public void setApproverUser(Long approverUser) {
		this.approverUser = approverUser;
	}

	public DecisionType getType() {
		return type;
	}

	public void setType(DecisionType type) {
		this.type = type;
	}

	public Date getDecisionTime() {
		return decisionTime;
	}

	public void setDecisionTime(Date decisionTime) {
		this.decisionTime = decisionTime;
	}

	public String getDecisionComment() {
		return decisionComment;
	}

	public void setDecisionComment(String decisionComment) {
		this.decisionComment = decisionComment;
	}
	
	public boolean isCurrent() {
		return isCurrent;
	}

	public void setCurrent(boolean isCurrent) {
		this.isCurrent = isCurrent;
	}
	
	public List<Block> getBlocks() {
		return blocks;
	}

	public void setBlocks(List<Block> blocks) {
		this.blocks = blocks;
	}
}
