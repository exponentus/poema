package workflow.model.constants;

public enum ApprovalSchemaType {
	UNKNOWN(0), REJECT_IF_NO(456), ACCEPT_IN_ANY_CASE(457);

	private int code;

	ApprovalSchemaType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ApprovalSchemaType getType(int code) {
		for (ApprovalSchemaType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
