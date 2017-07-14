package workflow.domain;

import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.exception.DAOExceptionType;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.ActionableDocumentDAO;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.model.ActionableDocument;
import workflow.model.Assignment;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class AssignmentDomain extends CommonDomain<Assignment> {

    public AssignmentDomain(_Session session) throws DAOException {
        super(session);
        dao = new AssignmentDAO(ses);
    }

    public Assignment composeNew(Employee author, ActionableDocument primary, Assignment parent) {
        Assignment entity = new Assignment();
        entity.setAuthor(author.getUser());
        entity.setAppliedAuthor(author);
        entity.setPrimary(primary);
        entity.setParent(parent);
        entity.setStartDate(new Date());
        entity.setStatus(ControlStatusType.DRAFT);
        return entity;
    }

    @Override
    public Assignment fillFromDto(Assignment dto, IValidation<Assignment> validation, String formSesId) throws DTOException, DAOException {
        validation.check(dto);
        Assignment entity;

        if (dto.isNew()) {
            entity = new Assignment();
        } else {
            entity = dao.findById(dto.getId());
        }
        EmployeeDAO eDao = new EmployeeDAO(ses);
        Employee appliedAuthor = dto.getAppliedAuthor();
        if (appliedAuthor != null) {
            appliedAuthor = eDao.findById(dto.getAppliedAuthor().getId());
        } else {
            appliedAuthor = eDao.findByUser(ses.getUser());
        }
        entity.setAppliedAuthor(appliedAuthor);
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());

        if (entity.isNew()) {
            Assignment parent = dto.getParent();
            if (parent != null) {
                parent = dao.findById(parent.getId());
                entity.setParent(parent);
                entity.setPrimary(parent.getPrimary());
            } else {
                UUID primaryId = dto.getPrimary().getId();
                IncomingDAO adDao = new IncomingDAO(ses);
                ActionableDocument actionableEntity = null;
                try {
                    actionableEntity = adDao.findById(primaryId);
                } catch (DAOException e) {
                    if (e.getType() == DAOExceptionType.ENTITY_NOT_FOUND) {
                        OfficeMemoDAO omDao = new OfficeMemoDAO(ses);
                        actionableEntity = omDao.findById(primaryId);
                    }
                }
                entity.setPrimary(actionableEntity);
            }
        }

        List<Observer> observers = new ArrayList<Observer>();
        for (Observer o : dto.getObservers()) {
            Observer observer = new Observer();
            observer.setEmployee(eDao.findById(o.getEmployee().getId()));
            observers.add(observer);
        }
        entity.setObservers(observers);
        entity.setTags(dto.getTags());
        entity.setStartDate(dto.getStartDate());
        entity.setDueDate(dto.getDueDate());
        entity.setStatus(dto.getStatus());
        entity.setAssigneeEntries(normalizeAssigneeEntries(eDao, dto.getAssigneeEntries()));
        entity.setControlType(dto.getControlType());

        if (entity.isNew()) {
            entity.setAuthor(ses.getUser());
        }

        dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), formSesId));
        calculateReadersEditors(entity);

        return entity;
    }

    @Override
    public void calculateReadersEditors(Assignment entity) {
        if (entity.getStatus() == ControlStatusType.DRAFT) {
            entity.addReaderEditor(entity.getAuthor());
        } else {
            entity.withdrawEditor(entity.getAuthor());
        }
        List<Observer> observers = entity.getObservers();
        if (observers != null) {
            for (Observer observer : observers) {
                entity.addReader(observer.getEmployee().getUserID());
            }
        }
        for (AssigneeEntry ae : entity.getAssigneeEntries()) {
            entity.addReader(ae.getAssignee().getUserID());
        }

        Assignment parent = entity.getParent();
        if (parent != null) {
            entity.addReaders(entity.getParent().getReaders());
        }
        entity.addReaders(entity.getPrimary().getReaders());
    }

    public void addReadersUp(Assignment entity) throws SecureException, DAOException {
        Assignment parent = entity.getParent();
        if (parent != null) {
            parent.resetEditors();
            parent.addReaders(entity.getReaders());
            dao.update(parent, false);
            addReadersUp(parent);
        }
    }

    public void addReadersToPrimary(Assignment entity) throws SecureException, DAOException {
        ActionableDocument primary = entity.getPrimary();
        if (primary != null) {
            primary.addReaders(entity.getReaders());
            primary.resetEditors();
            ActionableDocumentDAO adDao = new ActionableDocumentDAO(ses);
            adDao.update(primary, false);
        }
    }

    private List<AssigneeEntry> normalizeAssigneeEntries(EmployeeDAO eDao, List<AssigneeEntry> assigneeEntries) {
        int count = 0;
        for (AssigneeEntry entry : assigneeEntries) {
            entry.setSort(count);
            entry.setAssignee(eDao.findById(entry.getAssignee().getId()));
            count++;
        }
        return assigneeEntries;
    }

    public void startAssignee(Assignment entity) throws DAOException {
        ControlLifecycle cl = new ControlLifecycle(entity);
        cl.start();
    }

    public Assignment completeAssignee(Assignment dto, Employee resetEmployee) throws DAOException {
        Assignment entity = getEntity(dto.getId());
        List<AssigneeEntry> assigneeEntities = entity.getAssigneeEntries();
        List<AssigneeEntry> dtoAssigneeEntities = dto.getAssigneeEntries();
        for (AssigneeEntry dtoEntry : dtoAssigneeEntities) {
            for (AssigneeEntry entry : assigneeEntities) {
                if (dtoEntry.getAssignee().equals(entry.getAssignee())) {
                    entry.setResetBy(resetEmployee);
                    entry.setStatus(ControlStatusType.COMPLETED);
                    entry.setResetTime(new Date());
                }
            }
        }

        int completedAssignee = 0;
        for (AssigneeEntry entry : assigneeEntities) {
            if (entry.getResetTime() != null) {
                completedAssignee++;
            }
        }

        if (completedAssignee == assigneeEntities.size()) {
            entity.setStatus(ControlStatusType.COMPLETED);
        }
        return entity;
    }

    public Assignment completeEntireAssignment(Assignment dto, Employee resetEmployee) throws DAOException {
        Assignment entity = getEntity(dto.getId());
        List<AssigneeEntry> assigneeEntities = entity.getAssigneeEntries();
        List<AssigneeEntry> dtoAssigneeEntities = dto.getAssigneeEntries();
        for (AssigneeEntry dtoEntry : dtoAssigneeEntities) {
            for (AssigneeEntry entry : assigneeEntities) {
                if (entry.getStatus() != ControlStatusType.COMPLETED) {
                    entry.setResetBy(resetEmployee);
                    entry.setStatus(ControlStatusType.COMPLETED);
                    entry.setResetTime(new Date());
                }
            }
        }
        entity.setStatus(ControlStatusType.COMPLETED);
        return entity;
    }

    @Override
    public Outcome getOutcome(Assignment entity) {
        Outcome outcome = new Outcome();

        String entityKind = Environment.vocabulary.getWord("assignment", ses.getLang());
        if (StringUtil.isEmpty(entity.getTitle())) {
            outcome.setTitle(entityKind);
        } else {
            outcome.setTitle(entityKind + " " + entity.getTitle());
        }

        outcome.addPayload(entity);
        outcome.addPayload("contentTitle", "assignment");

        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
