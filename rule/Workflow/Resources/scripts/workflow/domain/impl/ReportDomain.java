package workflow.domain.impl;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingpojo.Outcome;
import staff.model.Employee;
import workflow.domain.IReportDomain;
import workflow.model.Assignment;
import workflow.model.Report;

import java.util.Date;

public class ReportDomain implements IReportDomain {

    private Report entity;

    public ReportDomain(Report report) {
        this.entity = report;
    }

    @Override
    public void compose(Employee author, Assignment parent) {
        entity.setAuthor(author.getUser());
        entity.setAppliedAuthor(author);
        entity.setAppliedRegDate(new Date());
        entity.setParent(parent);
    }

    @Override
    public void fillFromDto(Employee author, Report dto) {
        if (entity.isNew()) {
            entity.setAuthor(author.getUser());
            entity.setParent(dto.getParent());

            entity.addReaderEditor(entity.getAuthor());
        }
        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setAppliedAuthor(dto.getAppliedAuthor());
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setAttachments(dto.getAttachments());
    }

    @Override
    public Outcome getOutcome() {
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
