package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import projects.model.Project;

public interface IProjectDomain {
    Project composeNew(User author);

    void fillFromDto(Project entity, Project dto, User author);

    void calculateReaders(Project entity);

    boolean projectCanBeDeleted(Project entity);

    Outcome getOutcome(Project entity);
}
