package workflow.model.embedded;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

/**
 * @author Kayra created 07-04-2016
 */

import com.fasterxml.jackson.annotation.JsonIgnore;

import staff.model.Employee;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalSchemaType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.constants.DecisionType;
import workflow.model.util.ApprovalResultTypeConverter;
import workflow.model.util.ApprovalStatusTypeConverter;

@Embeddable
public class Approval {

	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;

	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalSchemaType schema;

	@Convert(converter = ApprovalResultTypeConverter.class)
	private ApprovalResultType result;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Block> blocks;

	private int version;

	public ApprovalStatusType getStatus() {
		return status;
	}

	public void setStatus(ApprovalStatusType status) {
		this.status = status;
	}

	public List<Block> getBlocks() {
		return blocks;
	}

	public void setBlocks(List<Block> blocks) {
		this.blocks = blocks;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@JsonIgnore
	public Block getProcessingBlock() {
		if (getStatus() == ApprovalStatusType.FINISHED) {
			return null;
		}

		if (blocks == null || blocks.isEmpty()) {
			return null;
		}

		return blocks.stream().filter(block -> block.getStatus() == ApprovalStatusType.PROCESSING).findFirst()
				.orElse(null);
	}

	@JsonIgnore
	public Block getNextBlock() {
		if (getStatus() == ApprovalStatusType.FINISHED) {
			return null;
		}

		if (blocks == null || blocks.isEmpty()) {
			return null;
		}

		return blocks.stream().sorted((a, b) -> (a.getPosition() > b.getPosition() ? 1 : -1)).filter(block -> {
			if (getStatus() == ApprovalStatusType.DRAFT) {
				return block.getStatus() == ApprovalStatusType.DRAFT;
			} else {
				return block.getStatus() == ApprovalStatusType.AWAITING;
			}
		}).findFirst().orElse(null);
	}

	public boolean userCanDoDecision(Employee emp) {
		if (getStatus() == ApprovalStatusType.PROCESSING) {
			Block block = getProcessingBlock();
			if (block != null) {
				if (block.getType() == ApprovalType.SERIAL || block.getType() == ApprovalType.SIGNING) {
					return block.getCurrentApprover().getEmployee().getId().equals(emp.getId());
				} else if (block.getType() == ApprovalType.PARALLEL) {
					return block.getApprovers().stream().filter(it -> it.getEmployee().getId().equals(emp.getId())
							&& it.getDecisionType() == DecisionType.UNKNOWN).count() > 0;
				}
			}
		}

		return false;
	}
}
