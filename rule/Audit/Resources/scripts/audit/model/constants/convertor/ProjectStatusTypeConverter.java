package audit.model.constants.convertor;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import audit.model.constants.ProjectStatusType;

@Converter(autoApply = true)
public class ProjectStatusTypeConverter implements AttributeConverter<ProjectStatusType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ProjectStatusType type) {
		return type.getCode();
	}

	@Override
	public ProjectStatusType convertToEntityAttribute(Integer val) {
		return ProjectStatusType.getType(val);
	}
}
