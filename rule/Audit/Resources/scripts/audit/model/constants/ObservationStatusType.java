package audit.model.constants;

public enum ObservationStatusType {
	UNKNOWN(0), DRAFT(453), WAITING(454), PROCESSING(460), COMPLETED(461), CANCELLED(462), OPEN(463), PENDING(464);

	private int code;

	ObservationStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ObservationStatusType getType(int code) {
		for (ObservationStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}
}
