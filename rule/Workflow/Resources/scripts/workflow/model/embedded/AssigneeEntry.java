package workflow.model.embedded;

import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.Converter;
import staff.model.Employee;
import staff.model.util.EmployeeConverter;
import workflow.model.constants.ControlStatusType;
import workflow.model.constants.converter.ControlStatusTypeConverter;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

//@JsonRootName("assigneeEntry")
//@Entity
//@Table(name = "wf__assignee_entities")
@Embeddable
@Converter(name = "emp_conv", converterClass = EmployeeConverter.class)
public class AssigneeEntry { // extends SimpleAppEntity {

    @Column(name = "is_coordinator")
    private boolean isCoordinator;

    @Convert("emp_conv")
    @Column(name = "assignee")
    @Basic(fetch = FetchType.LAZY, optional = false)
    private Employee assignee;

    @javax.persistence.Convert(converter = ControlStatusTypeConverter.class)
    private ControlStatusType status = ControlStatusType.OPEN;

    @Convert("emp_conv")
    @Basic(fetch = FetchType.LAZY, optional = true)
    @Column(name = "reset_by")
    private Employee resetBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reset_time")
    private Date resetTime;

    @Column(name = "reset_info")
    private String resetInfo;

    private int sort;

    // для манипуляций списком
    public UUID getId() {
        return UUID.randomUUID();
    }

    public boolean isCoordinator() {
        return isCoordinator;
    }

    public void setCoordinator(boolean isCoordinator) {
        this.isCoordinator = isCoordinator;
    }

    public Employee getAssignee() {
        return assignee;
    }

    public void setAssignee(Employee assignee) {
        this.assignee = assignee;
    }

    public ControlStatusType getStatus() {
        return status;
    }

    public void setStatus(ControlStatusType status) {
        this.status = status;
    }

    public Employee getResetBy() {
        return resetBy;
    }

    public void setResetBy(Employee resetBy) {
        this.resetBy = resetBy;
    }

    public Date getResetTime() {
        return resetTime;
    }

    public void setResetTime(Date resetTime) {
        this.resetTime = resetTime;
    }

    public String getResetInfo() {
        return resetInfo;
    }

    public void setResetInfo(String resetInfo) {
        this.resetInfo = resetInfo;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }
}
