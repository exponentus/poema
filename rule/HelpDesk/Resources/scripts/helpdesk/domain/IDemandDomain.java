package helpdesk.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingdto.Outcome;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import reference.model.DemandType;

public interface IDemandDomain {
    Demand composeNew(User user, DemandType demandType);

    void fillFromDto(Demand entity, Demand dto, User user);

    void changeStatus(Demand entity, DemandStatusType status);

    void registerTask(Demand entity);

    Outcome getOutcome(Demand entity);
}
