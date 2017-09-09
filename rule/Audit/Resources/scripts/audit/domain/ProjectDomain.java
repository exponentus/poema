package audit.domain;

import administrator.model.User;
import audit.model.Project;
import audit.model.constants.ProjectStatusType;
import com.exponentus.common.dto.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.dataengine.jpa.ISimpleAppEntity;
import com.exponentus.user.IUser;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ProjectDomain {

    public Project composeNew(User author) {
        Project project = new Project();

        project.setAuthor(author);
        project.setComment("");
        project.setStatus(ProjectStatusType.DRAFT);
        project.setStartDate(new Date());

        return project;
    }

    public void fillFromDto(Project project, Project dto, User author) throws DTOException {
        validate(dto);

        if (project.isNew()) {
            project.setAuthor(author);
        }

        project.setName(dto.getName().trim());
        project.setCode(dto.getCode().trim());
        project.setPrefix(dto.getPrefix().trim());
        project.setStatus(dto.getStatus());

        project.setManager(dto.getManager());
        project.setDeputyManager(dto.getDeputyManager());
        project.setInspector(dto.getInspector());
        project.setObservers(dto.getObservers());

        project.setStartDate(dto.getStartDate());
        project.setFinishDate(dto.getFinishDate());
        project.setComment(dto.getComment().trim());
        project.setAttachments(dto.getAttachments());

        calculateReaders(project);
    }

    public void calculateReaders(Project project) {
        Set<IUser> readers = new HashSet<>();
        readers.add(project.getAuthor());
        if (project.getManager() != null) {
            readers.add(project.getManager());
        }
        if (project.getDeputyManager() != null) {
            readers.add(project.getDeputyManager());
        }
        if (project.getInspector() != null) {
            readers.add(project.getInspector());
        }

        if (project.getObservers() != null) {
            readers.addAll(project.getObservers());
        }

        Set<Long> readersId = readers.stream().map(ISimpleAppEntity::getId).collect(Collectors.toSet());

        project.setReaders(readersId);
    }

    public void completeProject(Project project) {
        project.setStatus(ProjectStatusType.COMPLETED);
    }

    public void activateProject(Project project) {
        project.setStatus(ProjectStatusType.ACTIVE);
    }

    public void mergeProject(Project project) {
        project.setStatus(ProjectStatusType.MERGED);
    }

    private void validate(Project entity) throws DTOException {
        DTOException ve = new DTOException();

        if (entity.getName() == null || entity.getName().trim().isEmpty()) {
            ve.addError("name", "required", "field_is_empty");
        } else if (entity.getName().length() > 140) {
            ve.addError("name", "maxlen_140", "field_is_too_long");
        }

        if (entity.getManager() == null) {
            ve.addError("manager", "required", "field_is_empty");
        }

        if (entity.getFinishDate() == null) {
            ve.addError("finishDate", "date", "field_is_empty");
        }

        if (entity.getComment() != null && entity.getComment().trim().length() > 2048) {
            ve.addError("comment", "maxlen_2048", "field_is_too_long");
        }

        if (ve.hasError()) {
            throw ve;
        }
    }

    public Outcome getOutcome(Project project) {
        Outcome outcome = new Outcome();

        if (project.isNew()) {
            outcome.setTitle("new_project");
        } else {
            outcome.setTitle("project");
        }

        outcome.addPayload(project);
        if (!project.isNew()) {
            outcome.addPayload(new ACL(project));
        }

        return outcome;
    }
}
