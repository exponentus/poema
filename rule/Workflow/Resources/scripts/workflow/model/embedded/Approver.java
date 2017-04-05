package workflow.model.embedded;

import com.exponentus.dataengine.jpa.SimpleAppEntity;
import staff.model.Employee;
import workflow.model.constants.DecisionType;
import workflow.model.constants.converter.DecisionTypeConverter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * @author Kayra created 07-04-2016
 */

@Entity
@Table(name = "approvers")
public class Approver extends SimpleAppEntity {

    @JoinColumn(nullable = false)
    private Employee employee;

    @Convert(converter = DecisionTypeConverter.class)
    private DecisionType decisionType = DecisionType.UNKNOWN;

    @Column(name = "decision_time")
    private Date decisionTime;

    @Column(name = "decision_comment")
    private String decisionComment;

    @Column(name = "is_current")
    private boolean isCurrent;

    private int position;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Block> blocks;

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public DecisionType getDecisionType() {
        return decisionType;
    }

    public void setDecisionType(DecisionType type) {
        this.decisionType = type;
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

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public void agree() {
        if (employee == null) {
            throw new IllegalStateException("employee not set");
        }

        setDecisionType(DecisionType.YES);
        setDecisionTime(new Date());
        setCurrent(false);
    }

    public void disagree(String decisionComment) {
        if (employee == null) {
            throw new IllegalStateException("employee not set");
        }

        setDecisionType(DecisionType.NO);
        setDecisionTime(new Date());
        setDecisionComment(decisionComment);
        setCurrent(false);
    }
}
