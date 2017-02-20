package workflow.model.embedded;

/**
 * @author Kayra created 07-04-2016
 */

import com.exponentus.dataengine.jpa.SimpleAppEntity;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.constants.DecisionType;
import workflow.model.util.ApprovalStatusTypeConverter;
import workflow.model.util.ApprovalTypeConverter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "blocks")
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
    public Approver getNextApprover() {
        return approvers.stream()
                .sorted((a1, a2) -> a1.getPosition() > a2.getPosition() ? 1 : -1)
                .filter(approver -> approver.getDecisionType() == DecisionType.UNKNOWN)
                .findFirst().orElse(null);
    }

    public Approver doApproverAccept(IUser user) {
        Approver approver = approvers.stream()
                .filter(a -> user.getId().equals(a.approverUser))
                .findFirst().orElse(null);

        if (approver == null) {
            throw new IllegalArgumentException("approver not found");
        }

        approver.setDecisionType(DecisionType.YES);
        approver.setDecisionTime(new Date());

        return approver;
    }

    public Approver doApproverDecline(IUser user, String decisionComment) {
        Approver approver = approvers.stream()
                .filter(a -> user.getId().equals(a.approverUser))
                .findFirst().orElse(null);

        if (approver == null) {
            throw new IllegalArgumentException("approver not found");
        }

        approver.setDecisionType(DecisionType.NO);
        approver.setDecisionTime(new Date());
        approver.setDecisionComment(decisionComment);

        return approver;
    }
}
