package projects.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import projects.model.Project;

public interface IProjectDomain {
	void composeNew(User author);

	void fillFromDto(Project dto, User author);

	void calculateReaders();

	boolean projectCanBeDeleted();

	Outcome getOutcome();
}
