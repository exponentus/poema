package workflow.model.embedded;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import reference.model.constants.ApprovalSchemaType;
import reference.model.constants.ApprovalType;
import reference.model.constants.converter.ApprovalSchemaTypeConverter;
import staff.model.Employee;
import workflow.model.ControlledDocument;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.DecisionType;
import workflow.model.constants.converter.ApprovalResultTypeConverter;
import workflow.model.constants.converter.ApprovalStatusTypeConverter;
import workflow.model.util.ApprovalLifecycle;

@MappedSuperclass
public class ApprovedControlledDocument extends ControlledDocument implements IApproval {

	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.DRAFT;

	@Convert(converter = ApprovalSchemaTypeConverter.class)
	private ApprovalSchemaType schema = ApprovalSchemaType.REJECT_IF_NO;

	@Convert(converter = ApprovalResultTypeConverter.class)
	private ApprovalResultType result = ApprovalResultType.PROJECT;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Block> blocks = new ArrayList<>();

	private int version = 1;

	public List<Block> getBlocks() {
		return blocks;
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

	public ApprovalResultType getResult() {
		return result;
	}

	public ApprovalSchemaType getSchema() {
		return schema;
	}

	public ApprovalStatusType getStatus() {
		return status;
	}

	public int getVersion() {
		return version;
	}

	public void setBlocks(List<Block> blocks) {
		this.blocks = blocks;
	}

	public void setResult(ApprovalResultType result) {
		this.result = result;
	}

	public void setSchema(ApprovalSchemaType schema) {
		this.schema = schema;
	}

	public void setStatus(ApprovalStatusType status) {
		this.status = status;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public boolean userCanDoDecision(Employee emp) {
		if (getStatus() == ApprovalStatusType.PROCESSING) {
			Block block = ApprovalLifecycle.getProcessingBlock(this);
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
