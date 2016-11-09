package workflow.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import workflow.model.constants.ControlStatusType;

@Converter(autoApply = true)
public class ControlStatusTypeConverter implements AttributeConverter<ControlStatusType, Integer> {
	
	@Override
	public Integer convertToDatabaseColumn(ControlStatusType issuePriority) {
		return issuePriority.getCode();
	}
	
	@Override
	public ControlStatusType convertToEntityAttribute(Integer priorityValue) {
		return ControlStatusType.getType(priorityValue);
	}
}
