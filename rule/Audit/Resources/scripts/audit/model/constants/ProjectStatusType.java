package audit.model.constants;

public enum ProjectStatusType {
	UNKNOWN(0), DRAFT(899), COMPLETED(901), ACTIVE(903), MERGED(904);

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
