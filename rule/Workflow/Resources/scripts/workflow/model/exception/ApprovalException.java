package workflow.model.exception;

public class ApprovalException extends Exception {
	private static final long serialVersionUID = 1L;
	private ApprovalExceptionType id;
	private String addInfo;

	public ApprovalException(ApprovalExceptionType type) {
		super(type.name() + ", addInfo=" + type.name());
		id = type;
		addInfo = type.name();
	}

	public ApprovalException(ApprovalExceptionType type, String text) {
		super(type.name() + ", addInfo=" + text);
		id = type;
		addInfo = text;
	}

	public ApprovalExceptionType getType() {
		return id;
	}

	public String getAddInfo() {
		return addInfo;
	}

}
