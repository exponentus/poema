package workflow.domain.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.stream.Collectors;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import staff.model.Employee;
import workflow.domain.IOfficeMemoDomain;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.embedded.Approval;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;

public class OfficeMemoDomain implements IOfficeMemoDomain {

	private OfficeMemo om;

	public OfficeMemoDomain(OfficeMemo officeMemo) {
		if (officeMemo == null) {
			throw new IllegalArgumentException("Error: officeMemo null");
		}

		this.om = officeMemo;
	}

	@Override
	public void composeNew(User user, Employee appliedAuthor) {
		if (!om.isNew()) {
			throw new IllegalStateException("entity_is_not_new");
		}

		om.setAuthor(user);
		om.setAppliedRegDate(new Date());
		om.setAppliedAuthor(appliedAuthor);

		Approval approval = new Approval();
		approval.setStatus(ApprovalStatusType.DRAFT);
		approval.setBlocks(new ArrayList<>());
		om.setApproval(approval);
	}

	@Override
	public void fillFromDto(Employee author, OfficeMemo dto) {
		om.setAppliedAuthor(dto.getAppliedAuthor());
		om.setAppliedRegDate(dto.getAppliedRegDate());
		om.setTitle(dto.getTitle());
		om.setBody(dto.getBody());
		om.setRecipient(dto.getRecipient());
		om.setAttachments(dto.getAttachments());

		if (dto.getApproval() != null) {
			om.setApproval(dto.getApproval());
		} else {
			om.setApproval(null);
		}

		if (om.isNew()) {
			om.setAuthor(author.getUser());
			om.addReaderEditor(om.getAuthor());
			om.addReaderEditor(dto.getAppliedAuthor().getUser());
		}
	}

	@Override
	public boolean approvalCanBeStarted() {
		return om.getApproval().getStatus() == ApprovalStatusType.DRAFT;
	}

	@Override
	public void startApproving() {
		/*
		 * DRAFT>PROCESSING. При статусе DRAFT должна быть кнопка “start
		 * approving”(Начать согласование). Берем первый блок, и выдаем права,
		 * на чтение: если последовательно - Первому согласователю, если
		 * Паралелльно - то всем согласователям в блоке . Документ меняет статус
		 * на PROCESSING и текущий блок меняет статус на PROCESSING, остальные
		 * блоки переходят в AWAITING. Кнопка “start approving” исчезает.
		 * Согласователи получают уведомления и открыв документ видят кнопки
		 * Согласен, Отклонить (Accept, Decline).
		 */
		if (om.getApproval() == null) {
			throw new IllegalStateException("Approval is null");
		} else if (om.getApproval().getStatus() != ApprovalStatusType.DRAFT) {
			if (om.getApproval().getStatus() == ApprovalStatusType.FINISHED) {
				throw new IllegalStateException("Approval status FINISHED");
			}
			throw new IllegalStateException("Approval is not Draft: " + om.getApproval().getStatus());
		}

		Block block = om.getApproval().getNextBlock();

		if (block.getType() == ApprovalType.SERIAL) {
			Approver approver = block.getNextApprover();
			approver.setCurrent(true);
			om.addReader(approver.getEmployee().getUser());

		} else if (block.getType() == ApprovalType.PARALLEL) {
			om.addReaders(block.getApprovers().stream().map(approver -> approver.getEmployee().getUser().getId())
					.collect(Collectors.toList()));

		} else if (block.getType() == ApprovalType.SIGNING) {
			Approver approver = block.getNextApprover();
			approver.setCurrent(true);
			om.addReader(approver.getEmployee().getUser());

		} else {
			throw new IllegalStateException("Block type error: " + block.getType());
		}

		om.getApproval().setStatus(ApprovalStatusType.PROCESSING);
		block.setStatus(ApprovalStatusType.PROCESSING);

		om.getApproval().getBlocks().forEach(b -> {
			if (!block.getId().equals(b.getId())) {
				b.setStatus(ApprovalStatusType.AWAITING);
			}
		});
	}

	@Override
	public boolean employeeCanDoDecisionApproval(Employee employee) {
		return om.getApproval().userCanDoDecision(employee);
	}

	@Override
	public void acceptApprovalBlock(Employee employee) {
		/*
		 * При согласен (у workflow.model.embedded.Approver DecisionType = YES)
		 * при последовательном отбираем права на кнопки “Согласен, Отклонить” И
		 * даем права на чтение следующему согласователю, при паралелльном,
		 * просто отбираем права на кнопки “Согласен, Отклонить”. Если
		 * согласователи “закончились” то закрываем блок
		 * (ApprovalStatusType=FINISHED) и переходим к следующему. Если блоки
		 * закончились то согласование завершено (ApprovalStatusType=FINISHED) у
		 * Approval...
		 */

		if (om.getApproval().getStatus() != ApprovalStatusType.PROCESSING) {
			throw new IllegalStateException("Approval not PROCESSING, current status: " + om.getApproval().getStatus());
		}

		Block processBlock = om.getApproval().getProcessingBlock();
		if (processBlock == null) {
			throw new IllegalStateException("Not found processing Block");
		}

		processBlock.getApprover(employee).agree();

		Approver nextApprover = processBlock.getNextApprover();
		if (nextApprover != null) {
			// add next approver for read
			if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
				nextApprover.setCurrent(true);
				om.addReader(nextApprover.getEmployee().getUser());
			}
		} else {
			processBlock.setStatus(ApprovalStatusType.FINISHED);

			Block nextBlock = om.getApproval().getNextBlock();
			if (nextBlock != null) {
				nextBlock.setStatus(ApprovalStatusType.PROCESSING);

				if (nextBlock.getType() == ApprovalType.SERIAL) {
					Approver _nextApprover = nextBlock.getNextApprover();
					_nextApprover.setCurrent(true);
					om.addReader(_nextApprover.getEmployee().getUser());
				} else if (nextBlock.getType() == ApprovalType.PARALLEL) {
					om.addReaders(nextBlock.getApprovers().stream()
							.map(approver -> approver.getEmployee().getUser().getId()).collect(Collectors.toList()));
				} else if (nextBlock.getType() == ApprovalType.SIGNING) {
					Approver approver = nextBlock.getNextApprover();
					approver.setCurrent(true);
					om.addReader(approver.getEmployee().getUser());
				} else {
					throw new IllegalStateException("Block type error: " + nextBlock.getType());
				}
			} else {
				om.getApproval().setStatus(ApprovalStatusType.FINISHED);
			}
		}
	}

	@Override
	public void declineApprovalBlock(Employee employee, String decisionComment) {
		if (om.getApproval().getStatus() != ApprovalStatusType.PROCESSING) {
			throw new IllegalStateException("Approval not PROCESSING, current status: " + om.getApproval().getStatus());
		}

		Block processBlock = om.getApproval().getProcessingBlock();
		if (processBlock == null) {
			throw new IllegalStateException("Not found processing Block");
		}

		processBlock.getApprover(employee).disagree(decisionComment);

		Approver nextApprover = processBlock.getNextApprover();
		if (nextApprover != null) {
			// add next approver for read
			if (processBlock.getType() == ApprovalType.SERIAL || processBlock.getType() == ApprovalType.SIGNING) {
				nextApprover.setCurrent(true);
				om.addReader(nextApprover.getEmployee().getUser());
			}
		} else {
			processBlock.setStatus(ApprovalStatusType.FINISHED);

			Block nextBlock = om.getApproval().getNextBlock();
			if (nextBlock != null) {
				nextBlock.setStatus(ApprovalStatusType.PROCESSING);

				if (nextBlock.getType() == ApprovalType.SERIAL) {
					Approver _nextApprover = nextBlock.getNextApprover();
					_nextApprover.setCurrent(true);
					om.addReader(_nextApprover.getEmployee().getUser());
				} else if (nextBlock.getType() == ApprovalType.PARALLEL) {
					om.addReaders(nextBlock.getApprovers().stream()
							.map(approver -> approver.getEmployee().getUser().getId()).collect(Collectors.toList()));
				} else if (nextBlock.getType() == ApprovalType.SIGNING) {
					Approver approver = nextBlock.getNextApprover();
					approver.setCurrent(true);
					om.addReader(approver.getEmployee().getUser());
				} else {
					throw new IllegalStateException("Block type error: " + nextBlock.getType());
				}
			} else {
				om.getApproval().setStatus(ApprovalStatusType.FINISHED);
			}
		}
	}

	@Override
	public boolean documentCanBeDeleted() {
		return !om.isNew() && om.isEditable();
	}

	@Override
	public Outcome getOutcome() {
		Outcome outcome = new Outcome();

		outcome.setTitle(om.getTitle());
		outcome.addPayload(om);
		if (!om.isNew()) {
			outcome.addPayload(new ACL(om));
		}

		return outcome;
	}
}
