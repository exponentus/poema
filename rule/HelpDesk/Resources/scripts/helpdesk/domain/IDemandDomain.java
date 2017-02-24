package helpdesk.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import reference.model.DemandType;

public interface IDemandDomain {
    void composeDemand(User user, DemandType demandType);

    void fillFromDto(Demand dto);

    void changeStatus(DemandStatusType status);

    void calculateStatus();

    Outcome getOutcome();
}
