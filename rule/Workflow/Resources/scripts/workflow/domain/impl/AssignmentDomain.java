package workflow.domain.impl;

import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import staff.model.Employee;
import workflow.domain.IAssignmentDomain;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.embedded.Control;

import java.util.Date;

public class AssignmentDomain implements IAssignmentDomain {

    @Override
    public Assignment composeNew(Employee author, Incoming incoming, Assignment parent) {
        Assignment entity = new Assignment();

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

        return entity;
    }

    @Override
    public void fillFromDto(Assignment entity, Assignment dto, Employee author) {
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
    public Outcome getOutcome(Assignment entity) {
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
