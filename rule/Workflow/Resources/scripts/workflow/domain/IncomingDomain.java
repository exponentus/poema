package workflow.domain;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.model.Incoming;

import java.util.Date;

public class IncomingDomain {

    public Incoming composeNew(IUser<Long> user) {
        Incoming entity = new Incoming();
        entity.setAuthor(user);
        entity.setAppliedRegDate(new Date());

        return entity;
    }

    public void fillFromDto(Incoming entity, Incoming dto, _Session ses) throws DTOException {
        validate(dto);

        entity.setTitle(dto.getTitle());
        entity.setAppliedRegDate(new Date());
        entity.setDocLanguage(dto.getDocLanguage());
        entity.setDocType(dto.getDocType());
        try {
            entity.setDocSubject(dto.getDocSubject());
            entity.setSender(dto.getSender());

            EmployeeDAO eDao = new EmployeeDAO(ses);
            Employee emp = eDao.findById(dto.getAddressee().getId());
            entity.setAddressee(emp);
        } catch (DAOException e) {
            Server.logger.exception(e);
        }

        entity.setSenderRegNumber(dto.getSenderRegNumber());
        entity.setSenderAppliedRegDate(dto.getSenderAppliedRegDate());
        entity.setBody(dto.getBody());
        entity.setObservers(dto.getObservers());
        entity.setAttachments(dto.getAttachments());
        entity.setTags(dto.getTags());

        if (entity.isNew()) {
            entity.setAuthor(ses.getUser());
        }

    }

    public boolean canCreateAssignment(Incoming entity, User user) {
        return !entity.isNew()
                && (entity.getAddressee() != null && entity.getAddressee().getUser().getId().equals(user.getId())
                || user.getRoles().contains("chancellery"));
    }

    private void validate(Incoming model) throws DTOException {
        DTOException ve = new DTOException();

        if (model.getTitle() == null || model.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (model.getSender() == null) {
            ve.addError("sender", "required", "field_is_empty");
        }
        if (model.getAddressee() == null) {
            ve.addError("addressee", "required", "field_is_empty");
        }
        if (model.getDocLanguage() == null) {
            ve.addError("docLanguage", "required", "field_is_empty");
        }
        if (model.getSenderRegNumber() == null || model.getSenderRegNumber().isEmpty()) {
            ve.addError("senderRegNumber", "required", "field_is_empty");
        }
        if (model.getSenderAppliedRegDate() == null) {
            ve.addError("senderAppliedRegDate", "required", "field_is_empty");
        }
        if (model.getDocLanguage() == null) {
            ve.addError("docLanguage", "required", "field_is_empty");
        }
        if (model.getDocType() == null) {
            ve.addError("docType", "required", "field_is_empty");
        }

        if (model.getDocSubject() == null) {
            ve.addError("docSubject", "required", "field_is_empty");
        }

        if (ve.hasError()) {
            throw ve;
        }
    }

    public Outcome getOutcome(Incoming entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
