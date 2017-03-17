package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import workflow.model.Incoming;

public interface IIncomingDomain {
	void composeNew(User user);

	void fillFromDto(User user, Incoming dto);

	Outcome getOutcome();
}
