package workflow.model.util;

import java.util.HashSet;
import java.util.stream.Collectors;

import com.exponentus.user.IUser;

import reference.model.constants.ApprovalSchemaType;
import reference.model.constants.ApprovalType;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;
import workflow.model.exception.ApprovalException;
import workflow.model.exception.ApprovalExceptionType;

public class ApprovalLifecycle {
	private IApproval entity;

	public ApprovalLifecycle(IApproval entity) {
		this.entity = entity;
	}

	public void start() throws ApprovalException {

		if (entity.getStatus() != ApprovalStatusType.DRAFT) {
			throw new ApprovalException(ApprovalExceptionType.WRONG_STATUS, entity.getStatus().name());
		}

		Block block = entity.getNextBlock();

		if (block.getType() == ApprovalType.SERIAL) {
			Approver approver = block.getNextApprover();
			approver.setCurrent(true);
			entity.addReader(approver.getEmployee().getUser());

		} else if (block.getType() == ApprovalType.PARALLEL) {
			entity.addReaders(block.getApprovers().stream().map(approver -> approver.getEmployee().getUserID())
					.collect(Collectors.toList()));

		} else if (block.getType() == ApprovalType.SIGNING) {
			Approver approver = block.getNextApprover();
			if (approver == null) {
				throw new ApprovalException(ApprovalExceptionType.APPROVER_IS_NOT_SET, block.getType().name());
			}
			approver.setCurrent(true);
			entity.addReader(approver.getEmployee().getUser());

		} else {
			throw new ApprovalException(ApprovalExceptionType.BLOCK_TYPE_ERROR, block.getType().name());
		}

		entity.setStatus(ApprovalStatusType.PROCESSING);
		block.setStatus(ApprovalStatusType.PROCESSING);

		entity.getBlocks().forEach(b -> {
			if (!block.getId().equals(b.getId())) {
				b.setStatus(ApprovalStatusType.AWAITING);
			}
		});

		entity.setEditors(new HashSet<>());
	}

	public void accept(IUser<Long> user) throws ApprovalException {

		Block processBlock = getCurrentBlock();
		processBlock.getApprover(user).agree();

		Approver nextApprover = processBlock.getNextApprover();
		if (nextApprover != null) {
			if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
				nextApprover.setCurrent(true);
				entity.addReader(nextApprover.getEmployee().getUser());
			}
		} else {
			processBlock.setStatus(ApprovalStatusType.FINISHED);

			Block nextBlock = entity.getNextBlock();
			if (nextBlock != null) {
				nextBlock.setStatus(ApprovalStatusType.PROCESSING);

				if (nextBlock.getType() == ApprovalType.SERIAL) {
					Approver _nextApprover = nextBlock.getNextApprover();
					_nextApprover.setCurrent(true);
					entity.addReader(_nextApprover.getEmployee().getUser());
				} else if (nextBlock.getType() == ApprovalType.PARALLEL) {
					entity.addReaders(nextBlock.getApprovers().stream()
							.map(approver -> approver.getEmployee().getUserID()).collect(Collectors.toList()));
				} else if (nextBlock.getType() == ApprovalType.SIGNING) {
					Approver approver = nextBlock.getNextApprover();
					approver.setCurrent(true);
					entity.addReader(approver.getEmployee().getUser());
				} else {
					throw new ApprovalException(ApprovalExceptionType.WRONG_BLOCK_TYPE);
				}
			} else {
				entity.setResult(ApprovalResultType.ACCEPTED);
				entity.setStatus(ApprovalStatusType.FINISHED);
			}
		}

	}

	public void decline(IUser<Long> user, String decisionComment) throws ApprovalException {

		Block processBlock = getCurrentBlock();
		if (processBlock.isRequireCommentIfNo() && (decisionComment == null || decisionComment.isEmpty())) {
			throw new ApprovalException(ApprovalExceptionType.THERE_IS_NO_COMMENT);
		}
		processBlock.getApprover(user).disagree(decisionComment);

		if (entity.getSchema() == ApprovalSchemaType.REJECT_IF_NO) {
			entity.setResult(ApprovalResultType.REJECTED);
			entity.setStatus(ApprovalStatusType.FINISHED);
			return;
		}

		Approver nextApprover = processBlock.getNextApprover();
		if (nextApprover != null) {
			if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
				nextApprover.setCurrent(true);
				entity.addReader(nextApprover.getEmployee().getUser());
			}
		} else {
			processBlock.setStatus(ApprovalStatusType.FINISHED);

			Block nextBlock = entity.getNextBlock();
			if (nextBlock != null) {
				nextBlock.setStatus(ApprovalStatusType.PROCESSING);

				if (nextBlock.getType() == ApprovalType.SERIAL) {
					Approver _nextApprover = nextBlock.getNextApprover();
					_nextApprover.setCurrent(true);
					entity.addReader(_nextApprover.getEmployee().getUser());
				} else if (nextBlock.getType() == ApprovalType.PARALLEL) {
					entity.addReaders(nextBlock.getApprovers().stream()
							.map(approver -> approver.getEmployee().getUser().getId()).collect(Collectors.toList()));
				} else if (nextBlock.getType() == ApprovalType.SIGNING) {
					Approver approver = nextBlock.getNextApprover();
					approver.setCurrent(true);
					entity.addReader(approver.getEmployee().getUser());
				} else {
					throw new ApprovalException(ApprovalExceptionType.WRONG_BLOCK_TYPE);
				}
			} else {
				entity.setResult(ApprovalResultType.ACCEPTED);
				entity.setStatus(ApprovalStatusType.FINISHED);
			}
		}
	}

	private Block getCurrentBlock() throws ApprovalException {
		if (entity.getStatus() != ApprovalStatusType.PROCESSING) {
			throw new ApprovalException(ApprovalExceptionType.WRONG_STATUS, entity.getStatus().name());
		}

		Block processBlock = entity.getProcessingBlock();
		if (processBlock == null) {
			throw new ApprovalException(ApprovalExceptionType.WRONG_BLOCK_TYPE);
		}
		return processBlock;
	}
}
