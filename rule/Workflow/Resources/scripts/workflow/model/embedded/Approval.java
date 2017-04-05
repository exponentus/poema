package workflow.model.embedded;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import staff.model.Employee;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalSchemaType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.constants.DecisionType;
import workflow.model.exception.ApprovalException;
import workflow.model.exception.ApprovalExceptionType;
import workflow.model.util.ApprovalResultTypeConverter;
import workflow.model.util.ApprovalSchemaTypeConverter;
import workflow.model.util.ApprovalStatusTypeConverter;

/**
 * @author Kayra created 07-04-2016
 */

@Embeddable
public class Approval {

	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;

	@Convert(converter = ApprovalSchemaTypeConverter.class)
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

	public ApprovalSchemaType getSchema() {
		return schema;
	}

	public void setSchema(ApprovalSchemaType schema) {
		this.schema = schema;
	}

	public ApprovalResultType getResult() {
		return result;
	}

	public void setResult(ApprovalResultType result) {
		this.result = result;
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
	public void start(SecureAppEntity<UUID> primeEntity) throws ApprovalException {

		if (status != ApprovalStatusType.DRAFT) {
			if (status == ApprovalStatusType.FINISHED) {
				throw new ApprovalException(ApprovalExceptionType.WRONG_STATUS, "approval_was_finished");
			}
			throw new ApprovalException(ApprovalExceptionType.WRONG_STATUS, "approval_is_not_draft");
		}

		Block block = getNextBlock();

		if (block.getType() == ApprovalType.SERIAL) {
			Approver approver = block.getNextApprover();
			approver.setCurrent(true);
			primeEntity.addReader(approver.getEmployee().getUser());

		} else if (block.getType() == ApprovalType.PARALLEL) {
			primeEntity.addReaders(block.getApprovers().stream()
					.map(approver -> approver.getEmployee().getUser().getId()).collect(Collectors.toList()));

		} else if (block.getType() == ApprovalType.SIGNING) {
			Approver approver = block.getNextApprover();
			approver.setCurrent(true);
			primeEntity.addReader(approver.getEmployee().getUser());

		} else {
			throw new ApprovalException(ApprovalExceptionType.BLOCK_ERROR, "block_type_error " + block.getType());
		}

		setStatus(ApprovalStatusType.PROCESSING);
		block.setStatus(ApprovalStatusType.PROCESSING);

		getBlocks().forEach(b -> {
			if (!block.getId().equals(b.getId())) {
				b.setStatus(ApprovalStatusType.AWAITING);
			}
		});

		primeEntity.setEditors(new HashSet<>());
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
