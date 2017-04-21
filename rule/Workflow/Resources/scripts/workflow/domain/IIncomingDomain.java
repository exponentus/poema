package workflow.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import workflow.model.Incoming;

public interface IIncomingDomain {
    Incoming composeNew(IUser<Long> user);

    void fillFromDto(Incoming entity, Incoming dto, _Session ses);

    boolean canCreateAssignment(Incoming entity, User user);

    Outcome getOutcome(Incoming entity);
}
