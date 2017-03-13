package workflow.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import workflow.model.constants.ApprovalResultType;

@Converter(autoApply = true)
public class ApprovalResultTypeConverter implements AttributeConverter<ApprovalResultType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ApprovalResultType t) {
		return t.getCode();
	}

	@Override
	public ApprovalResultType convertToEntityAttribute(Integer v) {
		return ApprovalResultType.getType(v);
	}
}
