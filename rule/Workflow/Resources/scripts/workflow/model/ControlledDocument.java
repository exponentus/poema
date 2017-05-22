package workflow.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.common.model.SecureHierarchicalEntity;

import workflow.model.embedded.IControlled;

@Entity
@Table(name = "wf__controlled_documents")
public class ControlledDocument extends SecureHierarchicalEntity implements IControlled {

	@OneToMany
	private List<Assignment> assignments;

	@Override
	public List<Assignment> getAssignments() {
		return assignments;
	}

	@Override
	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
	}
}
