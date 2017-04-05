package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.domain.IOfficeMemoDomain;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalSchemaType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.embedded.Approval;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.stream.Collectors;

public class OfficeMemoDomain implements IOfficeMemoDomain {

    @Override
    public OfficeMemo composeNew(User user, Employee appliedAuthor) {
        OfficeMemo om = new OfficeMemo();

        om.setAuthor(user);
        om.setAppliedRegDate(new Date());
        om.setAppliedAuthor(appliedAuthor);

        Approval approval = new Approval();
        approval.setStatus(ApprovalStatusType.DRAFT);
        approval.setSchema(ApprovalSchemaType.REJECT_IF_NO);
        approval.setResult(ApprovalResultType.UNKNOWN);
        approval.setVersion(1);
        approval.setBlocks(new ArrayList<>());
        om.setApproval(approval);

        return om;
    }

    @Override
    public void fillFromDto(OfficeMemo om, OfficeMemo dto, Employee author) {
        om.setAppliedAuthor(dto.getAppliedAuthor());
        om.setAppliedRegDate(dto.getAppliedRegDate());
        om.setTitle(dto.getTitle());
        om.setBody(dto.getBody());
        om.setRecipient(dto.getRecipient());
        om.setAttachments(dto.getAttachments());

        if (dto.getApproval() != null) {
            if (om.isNew()) {
                dto.getApproval().setVersion(1);
            }
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
    public boolean approvalCanBeStarted(OfficeMemo om) {
        return om.getApproval().getStatus() == ApprovalStatusType.DRAFT;
    }

    @Override
    public void startApproving(OfficeMemo om) {
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

        om.setEditors(new HashSet<>());
    }

    @Override
    public boolean employeeCanDoDecisionApproval(OfficeMemo om, Employee employee) {
        return om.getApproval().userCanDoDecision(employee);
    }

    @Override
    public void acceptApprovalBlock(OfficeMemo om, Employee employee) {
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

        Approval approval = om.getApproval();

        if (approval.getStatus() != ApprovalStatusType.PROCESSING) {
            throw new IllegalStateException("Approval not PROCESSING, current status: " + om.getApproval().getStatus());
        }

        Block processBlock = approval.getProcessingBlock();
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

            Block nextBlock = approval.getNextBlock();
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
                approval.setResult(ApprovalResultType.ACCEPTED);
                approval.setStatus(ApprovalStatusType.FINISHED);
            }
        }
    }

    @Override
    public void declineApprovalBlock(OfficeMemo om, Employee employee, String decisionComment) {
        Approval approval = om.getApproval();
        if (approval.getStatus() != ApprovalStatusType.PROCESSING) {
            throw new IllegalStateException("Approval not PROCESSING, current status: " + om.getApproval().getStatus());
        }

        Block processBlock = approval.getProcessingBlock();
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

            Block nextBlock = approval.getNextBlock();
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
                if (approval.getSchema() == ApprovalSchemaType.IN_ANY_CASE_DECIDE_SIGNER) {

                }
                approval.setResult(ApprovalResultType.ACCEPTED);
                approval.setStatus(ApprovalStatusType.FINISHED);
            }
        }
    }

    @Override
    public boolean documentCanBeDeleted(OfficeMemo om) {
        return !om.isNew() && om.isEditable();
    }

    @Override
    public Outcome getOutcome(OfficeMemo om) {
        Outcome outcome = new Outcome();

        outcome.setTitle(om.getTitle());
        outcome.addPayload(om);
        if (!om.isNew()) {
            outcome.addPayload(new ACL(om));
        }

        return outcome;
    }
}
