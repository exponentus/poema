package helpdesk.dto.converter;

import com.exponentus.common.converter.GenericConverter;
import helpdesk.model.Demand;
import staff.model.Organization;

public class DemandDtoConverter implements GenericConverter<Demand, Demand> {

    @Override
    public Demand apply(Demand demand) {

        Demand dto = new Demand();
        dto.setId(demand.getId());
        dto.setRegNumber(demand.getRegNumber());
        dto.setTitle(demand.getTitle());
        dto.setStatus(demand.getStatus());
        dto.setDemandType(demand.getDemandType());
        if (demand.getCustomer() != null) {
            Organization customer = new Organization();
            customer.setName(demand.getCustomer().getName());
            customer.setLocName(demand.getCustomer().getLocName());
            dto.setCustomer(customer);
        }
        dto.setTags(demand.getTags());
        dto.setAttachments(demand.getAttachments());

        return dto;
    }
}
