package workflow.model.constants;

public enum ApprovalResultType {
	UNKNOWN(0), ACCEPTED(46), REJECTED(47), PROJECT(48), WITHOUT_APPROVAL(49);

	private int code;

	ApprovalResultType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ApprovalResultType getType(int code) {
		for (ApprovalResultType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
