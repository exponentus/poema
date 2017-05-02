package audit.domain;

import administrator.model.User;
import audit.model.Observation;
import audit.model.Project;
import audit.model.constants.ObservationStatusType;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.ISimpleAppEntity;
import com.exponentus.user.IUser;
import reference.model.WorkType;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ObservationDomain {

    public Observation composeNew(User author, Project project, WorkType workType) {
        Observation entity = new Observation();

        entity.setStatus(ObservationStatusType.DRAFT);
        entity.setStartDate(new Date());
        entity.setProject(project);
        entity.setWorkType(workType);

        return entity;
    }

    public void fillFromDto(Observation entity, Observation dto, User author) throws DTOException {
        validate(dto);

        entity.setTitle(dto.getTitle());
        entity.setProject(dto.getProject());
        entity.setWorkType(dto.getWorkType());
        entity.setBody(dto.getBody());
        entity.setContractor(dto.getContractor());
        entity.setStatus(dto.getStatus());
        entity.setStartDate(dto.getStartDate());
        entity.setDueDate(dto.getDueDate());
        entity.setTags(dto.getTags());
        entity.setPlaceOfOrigin(dto.getPlaceOfOrigin());
        entity.setObservers(dto.getObservers());
        entity.setAttachments(dto.getAttachments());

        calculateReaders(entity);
    }

    public void calculateReaders(Observation entity) {
        Set<IUser<Long>> readers = new HashSet<>();
        readers.add(entity.getAuthor());

        if (entity.getObservers() != null) {
            readers.addAll(entity.getObservers());
        }
        Set<Long> readersId = readers.stream().map(ISimpleAppEntity::getId).collect(Collectors.toSet());

        entity.setReaders(readersId);
        entity.addReaders(entity.getProject().getReaders());
    }

    public void changeStatus(Observation entity, ObservationStatusType statusType) {
        entity.setStatus(statusType);
        entity.setStatusDate(new Date());
    }

    private void validate(Observation entity) throws DTOException {
        DTOException ve = new DTOException();

        if (entity.getTitle() == null || entity.getTitle().trim().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (entity.getProject() == null) {
            ve.addError("project", "required", "field_is_empty");
        }
        if (entity.getWorkType() == null) {
            ve.addError("workType", "required", "field_is_empty");
        }
        if (entity.getBody() != null && entity.getBody().trim().length() > 5000) {
            ve.addError("body", "maxlen_5000", "field_is_too_long");
        }

        if (ve.hasError()) {
            throw ve;
        }
    }

    public Outcome getOutcome(Observation entity) {
        Outcome outcome = new Outcome();

        outcome.setTitle("observation");
        outcome.addPayload(entity);
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
        }

        return outcome;
    }
}
