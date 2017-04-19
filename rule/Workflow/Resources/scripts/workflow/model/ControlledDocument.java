package workflow.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.common.model.SecureHierarchicalEntity;

@Entity
@Table(name = "wf_controlled_documents")
@NamedQuery(name = "ControlledDocument.findAll", query = "SELECT m FROM ControlledDocument AS m ORDER BY m.regDate")
public class ControlledDocument extends SecureHierarchicalEntity {

	@OneToMany
	private List<Assignment> assignments;

	public List<Assignment> getAssignments() {
		return assignments;
	}

	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
	}
}
