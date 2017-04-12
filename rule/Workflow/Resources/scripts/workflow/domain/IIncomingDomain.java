package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import workflow.model.Incoming;

public interface IIncomingDomain {
	Incoming composeNew(IUser<Long> user);

	void fillFromDto(Incoming entity, Incoming dto, _Session ses);

	Outcome getOutcome(Incoming entity);
}
