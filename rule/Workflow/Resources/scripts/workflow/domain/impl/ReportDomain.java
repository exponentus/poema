package workflow.domain.impl;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.domain.IReportDomain;
import workflow.model.Assignment;
import workflow.model.Report;

import java.util.Date;

public class ReportDomain implements IReportDomain {

    @Override
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

    @Override
    public void fillFromDto(Report entity, Report dto, Employee author) {
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

    @Override
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
