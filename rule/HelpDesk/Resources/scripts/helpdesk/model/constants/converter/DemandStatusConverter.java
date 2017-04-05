package helpdesk.model.constants.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import helpdesk.model.constants.DemandStatusType;

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
