package audit.domain.impl;

import administrator.model.User;
import audit.domain.IObservationDomain;
import audit.model.Observation;
import audit.model.Project;
import audit.model.constants.ObservationStatusType;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.runtimeobj.ISimpleAppEntity;
import com.exponentus.user.IUser;
import reference.model.WorkType;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ObservationDomain implements IObservationDomain {

    @Override
    public Observation composeNew(User author, Project project, WorkType workType) {
        Observation entity = new Observation();

        entity.setStatus(ObservationStatusType.DRAFT);
        entity.setStartDate(new Date());
        entity.setProject(project);
        entity.setWorkType(workType);

        return entity;
    }

    @Override
    public void fillFromDto(Observation entity, Observation dto, User author) {
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

    @Override
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

    @Override
    public void changeStatus(Observation entity, ObservationStatusType statusType) {
        entity.setStatus(statusType);
        entity.setStatusDate(new Date());
    }

    @Override
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
