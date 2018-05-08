package helpdesk.dto.converter;

import com.exponentus.common.dto.converter.ExtConverter;
import com.exponentus.user.IUser;
import helpdesk.model.Demand;

public class DemandDtoConverter extends ExtConverter<Demand, Demand> {

    public DemandDtoConverter(IUser user) {
        super(user);
    }

    @Override
    public Demand apply(Demand demand) {
        Demand dto = new Demand();
        dto.setId(demand.getId());
        dto.setRegNumber(demand.getRegNumber());
        dto.setTitle(demand.getTitle());
        dto.setStatus(demand.getStatus());
        dto.setDemandType(demand.getDemandType());
        dto.setWayOfInteraction(demand.getWayOfInteraction());
        dto.setProject(dto.getProject());
        dto.setTags(demand.getTags());
        dto.setHasAttachments(demand.getHasAttachments());
        dto.setWasRead(checkReadingState(demand.getReaders()));
        return dto;
    }
}
