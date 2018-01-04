package workflow.model.constants.converter;

import workflow.model.constants.ControlStatusType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

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
