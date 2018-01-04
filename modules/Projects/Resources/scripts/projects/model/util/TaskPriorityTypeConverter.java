package projects.model.util;

import com.exponentus.common.model.constants.PriorityType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

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
