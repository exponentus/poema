package workflow.model.embedded;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.exponentus.common.model.SecureHierarchicalEntity;
import com.fasterxml.jackson.annotation.JsonRootName;

import workflow.model.Assignment;

@JsonRootName("primaryDocument")
@Entity
@Table(name = "primary_docs")
@NamedQuery(name = "PrimaryDocument.findAll", query = "SELECT m FROM PrimaryDocument AS m ORDER BY m.regDate")
public abstract class PrimaryDocument extends SecureHierarchicalEntity {

	private List<Assignment> assignments;

	public List<Assignment> getAssignments() {
		return assignments;
	}

	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
	}

}
