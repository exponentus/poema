package helpdesk.dto.converter;

import com.exponentus.common.dto.converter.GenericConverter;
import helpdesk.model.Demand;

public class DemandDtoConverter implements GenericConverter<Demand, Demand> {

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

        return dto;
    }
}
