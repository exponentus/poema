package workflow.model.embedded;

import com.exponentus.dataengine.jpa.SimpleAppEntity;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import reference.model.constants.ApprovalType;
import reference.model.constants.converter.ApprovalTypeConverter;
import workflow.domain.exception.ApprovalException;
import workflow.domain.exception.ApprovalExceptionType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.DecisionType;
import workflow.model.constants.converter.ApprovalStatusTypeConverter;

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

    @OneToMany(cascade = CascadeType.ALL)
    private List<Approver> approvers;

    @Convert(converter = ApprovalTypeConverter.class)
    private ApprovalType type = ApprovalType.UNKNOWN;

    @Column(name = "require_comment_if_no")
    private boolean requireCommentIfNo;

    @Column(name = "time_limit")
    private int timeLimit;

    private int position;

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

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    @JsonIgnore
    public Approver getCurrentApprover() {
        return approvers.stream().sorted((a, b) -> a.getPosition() > b.getPosition() ? 1 : -1)
                .filter(Approver::isCurrent).findFirst().orElse(null);
    }

    @JsonIgnore
    public Approver getNextApprover() {
        return approvers.stream().sorted((a, b) -> a.getPosition() > b.getPosition() ? 1 : -1)
                .filter(approver -> approver.getDecisionType() == DecisionType.UNKNOWN).findFirst().orElse(null);
    }

    public Approver getApprover(IUser<Long> user) throws ApprovalException {
        Approver approver = approvers.stream().filter(a -> a.getEmployee().getUserID().equals(user.getId())).findFirst()
                .orElse(null);

        if (approver == null) {
            throw new ApprovalException(ApprovalExceptionType.APPROVER_NOT_FOUND_IN_BLOCK, user.getLogin());
        }

        return approver;
    }
}
