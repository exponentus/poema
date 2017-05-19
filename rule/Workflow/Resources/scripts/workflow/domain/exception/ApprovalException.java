package workflow.domain.exception;

import com.exponentus.env.Environment;
import com.exponentus.localization.constants.LanguageCode;

public class ApprovalException extends Exception {
	private static final long serialVersionUID = 1L;
	private ApprovalExceptionType id;
	private String addInfo;

	public ApprovalException(ApprovalExceptionType type) {
		super(type.name());
		id = type;
	}

	public ApprovalException(ApprovalExceptionType type, String text) {
		super(type.name());
		id = type;
		addInfo = text;
	}

	public ApprovalException(ApprovalExceptionType type, Exception e) {
		super(e);
		id = type;
	}

	public ApprovalExceptionType getType() {
		return id;
	}

	public String getAddInfo() {
		return addInfo;
	}

	public String getLocMessage(LanguageCode lang) {
		return Environment.vocabulary.getWord(id.name(), lang);
	}
}
