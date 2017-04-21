package workflow.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import reference.dao.DocumentSubjectDAO;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.domain.IIncomingDomain;
import workflow.model.Incoming;

import java.util.Date;

public class IncomingDomain implements IIncomingDomain {

    @Override
    public Incoming composeNew(IUser<Long> user) {
        Incoming entity = new Incoming();
        entity.setAuthor(user);
        entity.setAppliedRegDate(new Date());

        return entity;
    }

    @Override
    public void fillFromDto(Incoming entity, Incoming dto, _Session ses) {
        entity.setTitle(dto.getTitle());
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setDocLanguage(dto.getDocLanguage());
        entity.setDocType(dto.getDocType());
        try {
            DocumentSubjectDAO dsDao = new DocumentSubjectDAO(ses);
            entity.setDocSubject(dsDao.findAll().getResult().get(0));
            entity.setSender(dto.getSender());

            EmployeeDAO eDao = new EmployeeDAO(ses);
            Employee emp = eDao.findById(dto.getAddressee().getId());
            entity.setAddressee(emp);
        } catch (DAOException e) {
            Server.logger.errorLogEntry(e);
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

    @Override
    public boolean canCreateAssignment(Incoming entity, User user) {
        return !entity.isNew() && (entity.getAddressee() != null
                && entity.getAddressee().getUser().getId().equals(user.getId())
                || user.getRoles().contains("chancellery"));
    }

    @Override
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
