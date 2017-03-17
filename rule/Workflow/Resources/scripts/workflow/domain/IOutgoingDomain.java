package workflow.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import workflow.model.Outgoing;

public interface IOutgoingDomain {
	void composeNew(User user);

	void fillFromDto(User user, Outgoing dto);

	Outcome getOutcome();
}
