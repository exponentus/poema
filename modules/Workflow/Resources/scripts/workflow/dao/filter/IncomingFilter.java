package workflow.dao.filter;

import com.exponentus.scripting.WebFormData;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import staff.model.Employee;
import staff.model.Organization;
import workflow.model.Incoming;

import java.util.UUID;

public class IncomingFilter extends Incoming {
    // sender
    // addressee
    // docType
    // docSubject

    public IncomingFilter() {
    }

    public IncomingFilter(WebFormData formData) {
        if (!formData.getAnyValueSilently("sender").isEmpty()) {
            Organization sender = new Organization();
            sender.setId(UUID.fromString(formData.getAnyValueSilently("sender")));
            setSender(sender);
        }

        if (!formData.getAnyValueSilently("addressee").isEmpty()) {
            Employee addressee = new Employee();
            addressee.setId(UUID.fromString(formData.getAnyValueSilently("addressee")));
            setAddressee(addressee);
        }

        if (!formData.getAnyValueSilently("docType").isEmpty()) {
            DocumentType documentType = new DocumentType();
            documentType.setId(UUID.fromString(formData.getAnyValueSilently("docType")));
            setDocType(documentType);
        }

        if (!formData.getAnyValueSilently("docSubject").isEmpty()) {
            DocumentSubject documentSubject = new DocumentSubject();
            documentSubject.setId(UUID.fromString(formData.getAnyValueSilently("docSubject")));
            setDocSubject(documentSubject);
        }
    }
}
