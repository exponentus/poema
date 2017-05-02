package workflow.domain;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Report;

import java.util.Date;

public class ReportDomain {

    public Report composeNew(Employee author, Assignment parent) {
        if (parent == null) {
            throw new IllegalArgumentException("parent null");
        }

        Report entity = new Report();
        entity.setAuthor(author.getUser());
        entity.setAppliedAuthor(author);
        entity.setAppliedRegDate(new Date());
        entity.setParent(parent);

        return entity;
    }

    public void fillFromDto(Report entity, Report dto, Employee author) throws DTOException {
        validate(dto);

        if (entity.isNew()) {
            if (dto.getParent() == null) {
                throw new IllegalArgumentException("parent null");
            }

            entity.setAuthor(author.getUser());
            entity.setParent(dto.getParent());

        }
        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setAppliedAuthor(dto.getAppliedAuthor());
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setObservers(dto.getObservers());
        entity.setAttachments(dto.getAttachments());
    }

    private void validate(Report entity) throws DTOException {
        DTOException ve = new DTOException();

        if (entity.getTitle() == null || entity.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }

        if (ve.hasError()) {
            throw ve;
        }
    }

    public Outcome getOutcome(Report entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);
        outcome.addPayload("assignment", entity.getParent());
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
