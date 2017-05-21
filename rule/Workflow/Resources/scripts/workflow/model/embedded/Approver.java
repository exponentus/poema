package workflow.model.embedded;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.eclipse.persistence.annotations.Converter;

import staff.model.Employee;
import staff.model.util.EmployeeConverter;
import workflow.model.constants.DecisionType;
import workflow.model.constants.converter.DecisionTypeConverter;

/**
 * @author Kayra created 07-04-2016
 */

//@Entity
//@Table(name = "wf__approvers")
@Embeddable
@Converter(name = "emp_conv", converterClass = EmployeeConverter.class)
public class Approver { //extends SimpleAppEntity {

	//@JoinColumn(nullable = false)
	@org.eclipse.persistence.annotations.Convert("emp_conv")
	@Basic(optional = false)
	private Employee employee;

	@Convert(converter = DecisionTypeConverter.class)
	private DecisionType decisionType = DecisionType.UNKNOWN;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_time")
	private Date startTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "decision_time")
	private Date decisionTime;

	@Column(name = "decision_comment")
	private String decisionComment;

	@Column(name = "is_current")
	private boolean isCurrent;

	private int sort;

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

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
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

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}
}
