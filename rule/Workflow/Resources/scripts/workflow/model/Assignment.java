package workflow.model;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import projects.model.Task;
import reference.model.ControlType;

@Entity
@Table(name = "assignments")
@NamedQuery(name = "Assignment.findAll", query = "SELECT m FROM Assignment AS m ORDER BY m.regDate")
public class Assignment extends Task {
	private ControlType controlType;

	public ControlType getControlType() {
		return controlType;
	}

	public void setControlType(ControlType controlType) {
		this.controlType = controlType;
	}
}
