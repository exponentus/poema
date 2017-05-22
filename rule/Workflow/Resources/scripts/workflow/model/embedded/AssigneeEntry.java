package workflow.model.embedded;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.Converter;

import com.exponentus.dataengine.jpa.SimpleAppEntity;
import com.fasterxml.jackson.annotation.JsonRootName;

import staff.model.Employee;
import staff.model.util.EmployeeConverter;

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

	@Column(name = "reset_info")
	private String resetInfo;

	private int sort;

	public boolean isCoordinator() {
		return isCoordinator;
	}

	public void setCoordinator(boolean isCoordinator) {
		this.isCoordinator = isCoordinator;
	}

	public Employee getAssignee() {
		//return (Employee) Environment.getExtUserDAO().getEmployee(assignee.getId());
		return assignee;
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
