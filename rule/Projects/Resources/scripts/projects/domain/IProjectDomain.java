package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import projects.model.Project;

public interface IProjectDomain {
    void composeProject(User author);

    void fillFromDto(Project dto, User author);

    void calculateReaders();

    Outcome getOutcome();
}
