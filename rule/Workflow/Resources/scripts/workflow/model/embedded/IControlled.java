package workflow.model.embedded;

import java.util.List;

import workflow.model.Assignment;

public interface IControlled {

	List<Assignment> getAssignments();

	void setAssignments(List<Assignment> assignments);

}
