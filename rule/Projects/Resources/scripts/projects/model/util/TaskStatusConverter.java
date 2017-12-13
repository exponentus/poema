package projects.model.util;

import com.exponentus.common.model.constants.StatusType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class TaskStatusConverter implements AttributeConverter<StatusType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(StatusType type) {
		return type.getCode();
	}

	@Override
	public StatusType convertToEntityAttribute(Integer val) {
		return StatusType.getType(val);
	}
}
