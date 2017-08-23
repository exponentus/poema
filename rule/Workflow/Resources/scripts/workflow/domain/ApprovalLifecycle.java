package workflow.domain;

import com.exponentus.user.IUser;
import reference.model.constants.ApprovalSchemaType;
import reference.model.constants.ApprovalType;
import staff.model.Employee;
import workflow.domain.exception.ApprovalException;
import workflow.domain.exception.ApprovalExceptionType;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.DecisionType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;

import java.util.*;
import java.util.stream.Collectors;

public class ApprovalLifecycle {
	private IApproval entity;

	public ApprovalLifecycle(IApproval entity) {
		this.entity = entity;
	}

	public IApproval start() throws ApprovalException {
		try {
			if (entity.getApprovalStatus() != ApprovalStatusType.DRAFT) {
				throw new ApprovalException(ApprovalExceptionType.WRONG_STATUS, entity.getApprovalStatus().name());
			} else if (entity.getBlocks() == null || entity.getBlocks().isEmpty()) {
				throw new ApprovalException(ApprovalExceptionType.BLOCK_NOT_FOUND);
			} else if (entity.getBlocks().get(0).getApprovers().size() == 0) {
				throw new ApprovalException(ApprovalExceptionType.APPROVER_IS_NOT_SET);
			}

			Block block = getNextBlock();
			Date currentTime = new Date();
			if (block != null) {
				if (block.getType() == ApprovalType.SERIAL) {
					Approver approver = block.getNextApprover();
					approver.setCurrent(true);
					approver.setStartTime(currentTime);
					entity.addReader(approver.getEmployee().getUser());
				} else if (block.getType() == ApprovalType.PARALLEL) {
					List<Approver> approvers = block.getApprovers();
					for (Approver approver : approvers) {
						approver.setStartTime(currentTime);
						approver.setCurrent(true);
						entity.addReader(approver.getEmployee().getUser());
					}
				} else if (block.getType() == ApprovalType.SIGNING) {
					Approver approver = block.getNextApprover();
					if (approver == null) {
						throw new ApprovalException(ApprovalExceptionType.APPROVER_IS_NOT_SET, block.getType().name());
					}
					approver.setCurrent(true);
					approver.setStartTime(currentTime);
					entity.addReader(approver.getEmployee().getUser());
				} else {
					throw new ApprovalException(ApprovalExceptionType.BLOCK_TYPE_ERROR, block.getType().name());
				}
			} else {
				throw new ApprovalException(ApprovalExceptionType.BLOCK_IS_NULL);
			}

			entity.setResult(ApprovalResultType.PROJECT);
			entity.setApprovalStatus(ApprovalStatusType.PENDING);
			block.setStatus(ApprovalStatusType.PENDING);

			entity.getBlocks().forEach(b -> {
				if (b.getStatus() != ApprovalStatusType.PENDING) {
					b.setStatus(ApprovalStatusType.AWAITING);
				}
			});
			entity.setEditors(new HashSet<>());
		} catch (Exception e) {
			throw new ApprovalException(ApprovalExceptionType.INTERNAL_ERROR, e);
		}
		return entity;
	}

	public IApproval accept(IUser user) throws ApprovalException {
		try {
			Block processBlock = getCurrentBlock();
			Approver currentApprover = processBlock.getApprover(user);
			if (currentApprover.getEmployee() == null) {
				throw new ApprovalException(ApprovalExceptionType.APPROVER_IS_NOT_SET);
			}
			if (currentApprover.getDecisionType() != DecisionType.UNKNOWN) {
				throw new ApprovalException(ApprovalExceptionType.APPROVER_ALREADY_HAS_DECISION);
			}
			currentApprover.setDecisionType(DecisionType.YES);
			currentApprover.setDecisionTime(new Date());
			currentApprover.setCurrent(false);
			Date currentTime = new Date();
			Approver nextApprover = processBlock.getNextApprover();
			if (nextApprover != null) {
				if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
					nextApprover.setCurrent(true);
					nextApprover.setStartTime(currentTime);
					entity.addReader(nextApprover.getEmployee().getUser());
				}
			} else {
				next(processBlock, currentTime);
			}
		} catch (Exception e) {
			throw new ApprovalException(ApprovalExceptionType.INTERNAL_ERROR, e);
		}
		return entity;
	}

	public IApproval decline(IUser user, String decisionComment) throws ApprovalException {
		try {
			Block processBlock = getCurrentBlock();
			if (processBlock.isRequireCommentIfNo() && (decisionComment == null || decisionComment.isEmpty())) {
				throw new ApprovalException(ApprovalExceptionType.THERE_IS_NO_COMMENT);
			}
			Approver currentApprover = processBlock.getApprover(user);
			if (currentApprover.getEmployee() == null) {
				throw new ApprovalException(ApprovalExceptionType.APPROVER_IS_NOT_SET);
			}
			if (currentApprover.getDecisionType() != DecisionType.UNKNOWN) {
				throw new ApprovalException(ApprovalExceptionType.APPROVER_ALREADY_HAS_DECISION);
			}
			currentApprover.setDecisionType(DecisionType.NO);
			currentApprover.setDecisionTime(new Date());
			currentApprover.setCurrent(false);
			currentApprover.setDecisionComment(decisionComment);
			if (entity.getApprovalSchema() == ApprovalSchemaType.REJECT_IF_NO) {
				processBlock.setStatus(ApprovalStatusType.FINISHED);
				entity.setResult(ApprovalResultType.REJECTED);
				entity.setApprovalStatus(ApprovalStatusType.FINISHED);
				return entity;
			}
			Date currentTime = new Date();
			Approver nextApprover = processBlock.getNextApprover();
			if (nextApprover != null) {
				if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
					nextApprover.setCurrent(true);
					entity.addReader(nextApprover.getEmployee().getUser());
				}
			} else {
				next(processBlock, currentTime);
			}
		} catch (Exception e) {
			throw new ApprovalException(ApprovalExceptionType.INTERNAL_ERROR, e);
		}
		return entity;
	}

	public IApproval skip() throws ApprovalException {
		try {
			Date currentTime = new Date();
			Block processBlock = getCurrentBlock();
			List<Approver> currentApprovers = getCurrentApprovers(processBlock);
			for (Approver approver : currentApprovers) {
				approver.setDecisionType(DecisionType.SKIPPED);
				approver.setDecisionTime(currentTime);
				approver.setCurrent(false);
			}
			Approver nextApprover = processBlock.getNextApprover();
			if (nextApprover != null) {
				if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
					nextApprover.setCurrent(true);
					nextApprover.setStartTime(currentTime);
					entity.addReader(nextApprover.getEmployee().getUser());
				}
			} else {
				next(processBlock, currentTime);
			}
		} catch (Exception e) {
			throw new ApprovalException(ApprovalExceptionType.INTERNAL_ERROR, e);
		}
		return entity;
	}

	public IApproval backToRevise() throws ApprovalException {
		entity.setVersion(entity.getVersion() + 1);
		entity.setApprovalStatus(ApprovalStatusType.DRAFT);
		Set<Long> editors = new HashSet<Long>();
		editors.add(entity.getAuthor().getId());
		entity.setEditors(editors);
		entity.backupContent();
		List<Block> newBlocks = new ArrayList<Block>();
		List<Block> blocks = entity.getBlocks();
		int count = blocks.size() + 1;
		for (Block block : blocks) {
			Block newBlock = getClone(block);
			newBlock.setSort(count);
			newBlocks.add(newBlock);
			count++;
			block.setStatus(ApprovalStatusType.REJECTED);
		}
		entity.getBlocks().addAll(newBlocks);
		return entity;
	}

	private void next(Block processBlock, Date currentTime) throws ApprovalException {
		try {
			processBlock.setStatus(ApprovalStatusType.FINISHED);

			Block nextBlock = getNextBlock();
			if (nextBlock != null) {
				nextBlock.setStatus(ApprovalStatusType.PENDING);

				if (nextBlock.getType() == ApprovalType.SERIAL) {
					Approver _nextApprover = nextBlock.getNextApprover();
					_nextApprover.setCurrent(true);
					_nextApprover.setStartTime(currentTime);
					entity.addReader(_nextApprover.getEmployee().getUser());
				} else if (nextBlock.getType() == ApprovalType.PARALLEL) {

					entity.addReaders(nextBlock.getApprovers().stream().map(approver -> approver.getEmployee().getUserID())
							.collect(Collectors.toList()));
				} else if (nextBlock.getType() == ApprovalType.SIGNING) {
					Approver approver = nextBlock.getNextApprover();
					approver.setCurrent(true);
					approver.setStartTime(currentTime);
					entity.addReader(approver.getEmployee().getUser());
				} else {
					throw new ApprovalException(ApprovalExceptionType.WRONG_BLOCK_TYPE);
				}
			} else {
				entity.setResult(ApprovalResultType.ACCEPTED);
				entity.setApprovalStatus(ApprovalStatusType.FINISHED);
				for (Employee em : entity.getRecipientsAfterApproval()) {
					entity.addReader(em.getUser());
				}
			}
		} catch (Exception e) {
			throw new ApprovalException(ApprovalExceptionType.INTERNAL_ERROR, e);
		}
	}

	public Block getCurrentBlock() throws ApprovalException {
		if (entity.getApprovalStatus() != ApprovalStatusType.PENDING) {
			throw new ApprovalException(ApprovalExceptionType.WRONG_STATUS, entity.getApprovalStatus().name());
		}

		Block processBlock = getProcessingBlock();
		if (processBlock == null) {
			throw new ApprovalException(ApprovalExceptionType.WRONG_BLOCK_TYPE);
		}
		return processBlock;
	}

	public Block getProcessingBlock() {
		if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED) {
			return null;
		}

		if (entity.getBlocks() == null || entity.getBlocks().isEmpty()) {
			return null;
		}

		return entity.getBlocks().stream().filter(block -> block.getStatus() == ApprovalStatusType.PENDING).findFirst().orElse(null);
	}

	public static Block getProcessingBlock(IApproval entity) {
		if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED) {
			return null;
		}

		if (entity.getBlocks() == null || entity.getBlocks().isEmpty()) {
			return null;
		}

		return entity.getBlocks().stream().filter(block -> block.getStatus() == ApprovalStatusType.PENDING).findFirst().orElse(null);
	}

	public static List<Approver> getCurrentApprovers(Block block) {
		List<Approver> approvers = new ArrayList<Approver>();
		for (Approver approver : block.getApprovers()) {
			if (approver.isCurrent()) {
				approvers.add(approver);
			}
		}
		return approvers;
	}

	private Block getNextBlock() {
		if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED || entity.getApprovalStatus() == ApprovalStatusType.REJECTED) {
			return null;
		}

		List<Block> blocks = entity.getBlocks();

		if (blocks == null || blocks.isEmpty()) {
			return null;
		}

		return blocks.stream().sorted((a, b) -> (a.getSort() > b.getSort() ? 1 : -1)).filter(block -> {
			if (entity.getApprovalStatus() == ApprovalStatusType.DRAFT) {
				return block.getStatus() == ApprovalStatusType.DRAFT;
			} else {
				return block.getStatus() == ApprovalStatusType.AWAITING;
			}
		}).findFirst().orElse(null);
	}

	private Block getClone(Block block) {
		Block newBlock = new Block();
		newBlock.setRequireCommentIfNo(block.isRequireCommentIfNo());
		newBlock.setTimeLimit(block.getTimeLimit());
		newBlock.setStatus(ApprovalStatusType.DRAFT);
		newBlock.setType(block.getType());
		newBlock.setSort(block.getSort());
		List<Approver> newApprovers = new ArrayList<Approver>();
		List<Approver> approvers = block.getApprovers();
		int col = approvers.size() + 1;
		for (Approver approver : approvers) {
			Approver newApprover = new Approver();
			newApprover.setEmployee(approver.getEmployee());
			newApprover.setCurrent(false);
			newApprover.setDecisionComment("");
			newApprover.setDecisionTime(null);
			newApprover.setDecisionType(DecisionType.UNKNOWN);
			newApprover.setSort(col);
			newApprover.setStartTime(null);
			newApprovers.add(newApprover);
			col++;
		}
		newBlock.setApprovers(newApprovers);

		return newBlock;
	}
}
