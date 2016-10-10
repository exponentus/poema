package workflow.model.constants;

/**
 * 
 * @author Kayra created 10-11-2016
 */
public enum ControlStatusType {
	UNKNOWN(0), DRAFT(80), OPEN(81), PROCESSING(82), PENDING(83), COMPLETED(84), CANCELLED(85);

	private int code;

	ControlStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ControlStatusType getType(int code) {
		for (ControlStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
