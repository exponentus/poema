package workflow.dao.filter;

import com.exponentus.scripting.WebFormData;
import staff.model.Employee;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.UUID;

public class OfficeMemoFilter extends OfficeMemo {
    // ApprovalStatusType status
    // ApprovalResultType result
    // appliedAuthor
    // recipient

    public OfficeMemoFilter() {
    }

    public OfficeMemoFilter(WebFormData formData) {
        setStatus(null);
        setResult(null);

        if (formData.containsField("status")) {
            setStatus(ApprovalStatusType.valueOf(formData.getValueSilently("status")));
        }

        if (formData.containsField("result")) {
            setResult(ApprovalResultType.valueOf(formData.getValueSilently("result")));
        }

        if (formData.containsField("appliedAuthor")) {
            Employee appliedAuthor = new Employee();
            appliedAuthor.setId(UUID.fromString(formData.getValueSilently("appliedAuthor")));

            setAppliedAuthor(appliedAuthor);
        }

        if (formData.containsField("recipient")) {
            Employee recipient = new Employee();
            recipient.setId(UUID.fromString(formData.getValueSilently("recipient")));

            setRecipient(recipient);
        }
    }
}
