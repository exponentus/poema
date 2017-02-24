package helpdesk.domain;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingpojo.Outcome;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import reference.model.DemandType;

public class DemandDomain implements IDemandDomain {

    private Demand demand;

    public DemandDomain(Demand demand) {
        this.demand = demand;
    }

    @Override
    public void composeDemand(User user, DemandType demandType) {
        demand.setAuthor(user);
        demand.setTitle("");
        demand.setBody("");
        demand.setStatus(DemandStatusType.DRAFT);
        demand.setDemandType(demandType);
    }

    @Override
    public void fillFromDto(Demand dto) {
        demand.setStatus(dto.getStatus());
        demand.setStatusDate(dto.getStatusDate());
        demand.setTitle(dto.getTitle());
        demand.setBody(dto.getBody());
        demand.setTags(dto.getTags());
        demand.setAttachments(dto.getAttachments());
        demand.setDemandType(dto.getDemandType());
        demand.setCustomer(dto.getCustomer());
        demand.setProject(dto.getProject());

        if (demand.isNew()) {
            demand.addReaderEditor(demand.getAuthor());
        }
    }

    @Override
    public void changeStatus(DemandStatusType status) {

    }

    @Override
    public void calculateStatus() {

    }

    @Override
    public Outcome getOutcome() {
        Outcome outcome = new Outcome();

        outcome.setTitle(demand.getTitle());
        outcome.addPayload(demand);

        if (!demand.isNew()) {
            outcome.addPayload(new ACL(demand));
        }

        return outcome;
    }
}
