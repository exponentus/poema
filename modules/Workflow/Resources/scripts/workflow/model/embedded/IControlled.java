package workflow.model.embedded;

import workflow.model.Assignment;

import java.util.List;

public interface IControlled {

	List<Assignment> getAssignments();

	void setAssignments(List<Assignment> assignments);

}
