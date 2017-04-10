package audit.model.constants.convertor;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import audit.model.constants.ObservationStatusType;

@Converter(autoApply = true)
public class ObservationStatusConverter implements AttributeConverter<ObservationStatusType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ObservationStatusType type) {
		return type.getCode();
	}

	@Override
	public ObservationStatusType convertToEntityAttribute(Integer val) {
		return ObservationStatusType.getType(val);
	}
}
