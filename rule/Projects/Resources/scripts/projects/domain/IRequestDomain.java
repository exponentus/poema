package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;

public interface IRequestDomain {
    Request composeNew(User author, Task task);

    void fillFromDto(Request entity, Request dto);

    boolean userCanDoResolution(Request entity, User user);

    void doResolution(Request entity, User resolutionUser, ResolutionType resolutionType, String decisionComment);

    Outcome getOutcome(Request entity);
}
