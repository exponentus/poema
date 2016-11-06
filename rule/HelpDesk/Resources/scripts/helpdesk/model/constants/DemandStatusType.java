package helpdesk.model.constants;

/**
 * @author Kayra created 6-11-2016
 */
public enum DemandStatusType {
	UNKNOWN(0);

	private int code;

	DemandStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static DemandStatusType getType(int code) {
		for (DemandStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}
}
