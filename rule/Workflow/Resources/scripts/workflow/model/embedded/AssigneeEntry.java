package workflow.model.embedded;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;

import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.Converter;

import com.exponentus.dataengine.jpa.SimpleAppEntity;
import com.exponentus.env.Environment;

import staff.model.Employee;
import staff.model.util.EmployeeConverter;

@Entity
@Table(name = "wf_assignee_entities")
@Converter(name = "emp_conv", converterClass = EmployeeConverter.class)
public class AssigneeEntry extends SimpleAppEntity {

	private boolean isCoordinator;

	private Employee assignee;

	@Convert("emp_conv")
	@Basic(fetch = FetchType.LAZY, optional = true)
	private Employee resetBy;

	private Date resetTime;

	private String resetterInfo;

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
}
