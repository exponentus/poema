package helpdesk.model.constants.converter;

import helpdesk.model.constants.DemandStatusType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class DemandStatusConverter implements AttributeConverter<DemandStatusType, Integer> {
	
	@Override
	public Integer convertToDatabaseColumn(DemandStatusType type) {
		return type.getCode();
	}
	
	@Override
	public DemandStatusType convertToEntityAttribute(Integer val) {
		return DemandStatusType.getType(val);
	}
}
