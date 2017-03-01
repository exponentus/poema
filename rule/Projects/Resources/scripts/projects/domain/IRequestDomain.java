package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
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
