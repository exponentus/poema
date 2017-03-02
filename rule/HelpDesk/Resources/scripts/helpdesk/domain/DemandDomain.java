package helpdesk.domain;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingpojo.Outcome;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import reference.model.DemandType;

import java.util.Date;

public class DemandDomain implements IDemandDomain {

    private Demand demand;

    public DemandDomain(Demand demand) {
        this.demand = demand;
    }

    @Override
    public void composeNew(User user, DemandType demandType) {
        if (!demand.isNew()) {
            throw new IllegalStateException("entity_is_not_new");
        }

        demand.setAuthor(user);
        demand.setTitle("");
        demand.setBody("");
        demand.setStatus(DemandStatusType.DRAFT);
        demand.setDemandType(demandType);
    }

    @Override
    public void fillFromDto(User user, Demand dto) {
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
            demand.setAuthor(user);
            demand.addReaderEditor(demand.getAuthor());
        }
    }

    @Override
    public void changeStatus(DemandStatusType status) {
        demand.setStatus(status);
        demand.setStatusDate(new Date());
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
