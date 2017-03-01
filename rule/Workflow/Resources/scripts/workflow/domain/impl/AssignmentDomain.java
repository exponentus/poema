package workflow.domain.impl;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingpojo.Outcome;
import staff.model.Employee;
import workflow.domain.IAssignmentDomain;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.embedded.Control;

import java.util.Date;

public class AssignmentDomain implements IAssignmentDomain {

    private Assignment entity;

    public AssignmentDomain(Assignment assignment) {
        this.entity = assignment;
    }

    @Override
    public void composeNew(Employee author, Incoming incoming, Assignment parent) {
        if (!entity.isNew()) {
            throw new IllegalStateException("entity_is_not_new");
        }

        entity.setAuthor(author.getUser());
        entity.setAppliedAuthor(author);

        if (parent == null) {
            entity.setIncoming(incoming);
        } else {
            entity.setParent(parent);
            entity.setIncoming(parent.getIncoming());
        }

        Control newControl = new Control();
        newControl.setStartDate(new Date());
        entity.setControl(newControl);
    }

    @Override
    public void fillFromDto(Employee author, Assignment dto) {
        if (entity.isNew()) {
            entity.setAuthor(author.getUser());
            entity.setIncoming(dto.getIncoming());
            entity.setParent(dto.getParent());

            entity.addReaderEditor(entity.getAuthor());
            if (dto.getAppliedAuthor() != null) {
                entity.addReaderEditor(dto.getAppliedAuthor().getUser());
            }
        }

        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setAppliedAuthor(dto.getAppliedAuthor());
        entity.setObservers(dto.getObservers());
        entity.setControl(dto.getControl());
        entity.setAttachments(dto.getAttachments());
    }

    @Override
    public Outcome getOutcome() {
        Outcome outcome = new Outcome();

        outcome.setTitle(entity.getTitle());
        outcome.addPayload(entity);
        outcome.addPayload("incoming", entity.getIncoming());
        if (entity.getParent() != null) {
            outcome.addPayload("parent", entity.getParent());
        }
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
