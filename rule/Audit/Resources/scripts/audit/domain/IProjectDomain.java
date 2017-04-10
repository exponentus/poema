package audit.domain;

import administrator.model.User;
import audit.model.Project;
import com.exponentus.rest.outgoingdto.Outcome;

public interface IProjectDomain {
    Project composeNew(User author);

    void fillFromDto(Project entity, Project dto, User author);

    void calculateReaders(Project entity);

    void completeProject(Project entity);

    void activateProject(Project entity);

    void mergeProject(Project entity);

    Outcome getOutcome(Project entity);
}
