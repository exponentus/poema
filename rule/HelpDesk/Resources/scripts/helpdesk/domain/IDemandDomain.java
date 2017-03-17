package helpdesk.domain;

import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import reference.model.DemandType;

public interface IDemandDomain {
	void composeNew(User user, DemandType demandType);

	void fillFromDto(User user, Demand dto);

	void changeStatus(DemandStatusType status);

	void registerTask();

	Outcome getOutcome();
}
