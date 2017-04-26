package workflow.domain.exception;

import com.exponentus.env.Environment;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.rest.IAppError;

public class ApprovalException extends Exception implements IAppError {
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

    public String getLocMessage(LanguageCode lang) {
        return Environment.vocabulary.getWord(id.name(), lang);
    }
}
