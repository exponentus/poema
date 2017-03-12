package workflow.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import workflow.model.constants.ApprovalSchemaType;

@Converter(autoApply = true)
public class ApprovalSchemaTypeConverter implements AttributeConverter<ApprovalSchemaType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ApprovalSchemaType t) {
		return t.getCode();
	}

	@Override
	public ApprovalSchemaType convertToEntityAttribute(Integer v) {
		return ApprovalSchemaType.getType(v);
	}
}
