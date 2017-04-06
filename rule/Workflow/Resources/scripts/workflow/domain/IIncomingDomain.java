package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;

import administrator.model.User;
import workflow.model.Incoming;

public interface IIncomingDomain {
	Incoming composeNew(User user);

	void fillFromDto(Incoming entity, Incoming dto, _Session ses);

	Outcome getOutcome(Incoming entity);
}
