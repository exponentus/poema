package workflow.model.constants.converter;

import com.exponentus.log.Lg;
import workflow.model.constants.ApprovalResultType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ApprovalResultTypeConverter implements AttributeConverter<ApprovalResultType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ApprovalResultType t) {
		return t.getCode();
	}

	@Override
	public ApprovalResultType convertToEntityAttribute(Integer v) {
		try{
		return ApprovalResultType.getType(v);
	}catch (Exception e){
		Lg.error(this.getClass().getSimpleName(), e.toString());
		return ApprovalResultType.UNKNOWN;
	}
	}
}
