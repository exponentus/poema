package projects.model.constants;

/**
 * 
 * @author Kayra created 21-04-2016
 */
public enum ProjectStatusType {
	UNKNOWN(0), DRAFT(899), @Deprecated PROCESSED(900), COMPLETED(901), PROCESSING(902);

	private int code;

	ProjectStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ProjectStatusType getType(int code) {
		for (ProjectStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
