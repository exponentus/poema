package projects.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.exponentus.common.model.constants.PriorityType;

@Converter(autoApply = true)
public class TaskPriorityTypeConverter implements AttributeConverter<PriorityType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(PriorityType type) {
		return type.getCode();
	}

	@Override
	public PriorityType convertToEntityAttribute(Integer val) {
		return PriorityType.getType(val);
	}
}
