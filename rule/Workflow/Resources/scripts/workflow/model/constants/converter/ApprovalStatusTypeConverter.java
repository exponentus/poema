package workflow.model.constants.converter;

import com.exponentus.log.Lg;
import workflow.model.constants.ApprovalStatusType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ApprovalStatusTypeConverter implements AttributeConverter<ApprovalStatusType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ApprovalStatusType issuePriority) {
		return issuePriority.getCode();
	}

	@Override
	public ApprovalStatusType convertToEntityAttribute(Integer priorityValue) {
		try {
			return ApprovalStatusType.getType(priorityValue);
		}catch (Exception e){
			Lg.error(this.getClass().getSimpleName(), e.toString());
			return ApprovalStatusType.UNKNOWN;
		}
	}
}
