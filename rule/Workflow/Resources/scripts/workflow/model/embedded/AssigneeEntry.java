package workflow.model.embedded;

import com.exponentus.dataengine.jpa.SimpleAppEntity;
import com.exponentus.env.Environment;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.Converter;
import staff.model.Employee;
import staff.model.util.EmployeeConverter;

import javax.persistence.*;
import java.util.Date;

@JsonRootName("assigneeEntry")
@Entity
@Table(name = "wf__assignee_entities")
@Converter(name = "emp_conv", converterClass = EmployeeConverter.class)
public class AssigneeEntry extends SimpleAppEntity {

    private boolean isCoordinator;

    private Employee assignee;

    @Convert("emp_conv")
    @Basic(fetch = FetchType.LAZY, optional = true)
    private Employee resetBy;

    @Temporal(TemporalType.TIMESTAMP)
    private Date resetTime;

    private String resetterInfo;

    private int sort;

    public boolean isCoordinator() {
        return isCoordinator;
    }

    public void setCoordinator(boolean isCoordinator) {
        this.isCoordinator = isCoordinator;
    }

    public Employee getAssignee() {
        return (Employee) Environment.getExtUserDAO().getEmployee(assignee.getId());
    }

    public void setAssignee(Employee assignee) {
        this.assignee = assignee;
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

    public String getResetterInfo() {
        return resetterInfo;
    }

    public void setResetterInfo(String resetterInfo) {
        this.resetterInfo = resetterInfo;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }
}
