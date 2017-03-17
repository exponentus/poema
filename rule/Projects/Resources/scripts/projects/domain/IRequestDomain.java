package projects.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;

public interface IRequestDomain {
	void composeNew(User author, Task task);

	void fillFromDto(Request dto);

	boolean userCanDoResolution(User user);

	void doResolution(User resolutionUser, ResolutionType resolutionType, String decisionComment);

	Outcome getOutcome();
}
