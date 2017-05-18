package workflow.domain;

import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.model.Assignment;
import workflow.model.ControlledDocument;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AssignmentDomain {

    enum permissions {
        RESET_ASSIGNEE
    }

    public Assignment composeNew(Employee author, ControlledDocument parent) {
        Assignment entity = new Assignment();

        entity.setAuthor(author.getUser());
        entity.setAppliedAuthor(author);
        entity.setParent(parent);
        Control newControl = new Control();
        newControl.setStartDate(new Date());
        newControl.setStatus(ControlStatusType.DRAFT);
        entity.setControl(newControl);

        return entity;
    }

    public void fillFromDto(Assignment entity, Assignment dto, _Session ses) throws DTOException, DAOException {
        validate(dto);
        EmployeeDAO eDao = new EmployeeDAO(ses);
        Employee employee = eDao.findByUserId(ses.getUser().getId());
        if (entity.isNew()) {
            entity.setAuthor(employee.getUser());
            entity.setParent(dto.getParent());
        }

        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setAppliedAuthor(dto.getAppliedAuthor());

        List<Observer> observers = new ArrayList<Observer>();
        for (Observer o : dto.getObservers()) {
            Observer observer = new Observer();
            observer.setEmployee(eDao.findById(o.getEmployee().getId()));
            observers.add(observer);
        }
        entity.setObservers(observers);
        entity.setControl(dto.getControl());
        entity.setAttachments(dto.getAttachments());

    }

    public void resetAssignee(Assignment entity, Assignment dto, Employee resetEmployee) {
        Control control = entity.getControl();
        List<AssigneeEntry> assigneeEntities = control.getAssigneeEntries();
        Control dtoControl = dto.getControl();
        List<AssigneeEntry> dtoAssigneeEntities = dtoControl.getAssigneeEntries();
        for (AssigneeEntry dtoEntry : dtoAssigneeEntities) {
            for (AssigneeEntry entry : assigneeEntities) {
                if (dtoEntry.getAssignee().equals(entry.getAssignee())) {
                    entry.setResetBy(resetEmployee);
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
            control.setStatus(ControlStatusType.COMPLETED);
        }
    }

    private void validate(Assignment assignment) throws DTOException {
        DTOException ve = new DTOException();

        if (assignment.getTitle() == null || assignment.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (assignment.getControl().getControlType() == null) {
            ve.addError("control.controlType", "required", "field_is_empty");
        }
        if (assignment.getControl().getStartDate() == null) {
            ve.addError("control.startDate", "required", "field_is_empty");
        }
        if (assignment.getControl().getDueDate() == null) {
            ve.addError("control.dueDate", "required", "field_is_empty");
        }
        if (ve.hasError()) {
            throw ve;
        }
    }

    public Outcome getOutcome(Assignment entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);

        ControlledDocument parent = entity.getParent();
        if (parent != null) {
            outcome.addPayload("parent", parent);
        }

        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
