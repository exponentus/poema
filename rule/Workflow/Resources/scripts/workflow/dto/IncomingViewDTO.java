package workflow.dto;

import com.exponentus.runtimeobj.IAppEntity;
import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import staff.model.Employee;
import staff.model.Organization;
import workflow.init.AppConst;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class IncomingViewDTO {

    public UUID id;
    public String kind = "incoming";

    public String regNumber;
    public Date appliedRegDate;
    public Organization sender;
    public String senderRegNumber;
    public Date senderAppliedRegDate;
    public Employee addressee;
    public DocumentLanguage docLanguage;
    public DocumentType docType;
    public DocumentSubject docSubject;
    public String body;

    public String getURL() {
        return AppConst.BASE_URL + "incomings/" + id;
    }

    public List<IAppEntity<UUID>> responses;

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
