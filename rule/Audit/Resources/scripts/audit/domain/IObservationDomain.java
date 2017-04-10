package audit.domain;

import administrator.model.User;
import audit.model.Observation;
import audit.model.Project;
import audit.model.constants.ObservationStatusType;
import com.exponentus.rest.outgoingdto.Outcome;
import reference.model.WorkType;

public interface IObservationDomain {
    Observation composeNew(User author, Project project, WorkType workType);

    void fillFromDto(Observation entity, Observation dto, User author);

    void calculateReaders(Observation entity);

    void changeStatus(Observation entity, ObservationStatusType statusType);

    Outcome getOutcome(Observation entity);
}
