package audit.domain.impl;

import administrator.model.User;
import audit.domain.IProjectDomain;
import audit.model.Project;
import audit.model.constants.ProjectStatusType;
import com.exponentus.common.model.ACL;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.runtimeobj.ISimpleAppEntity;
import com.exponentus.user.IUser;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ProjectDomain implements IProjectDomain {

    @Override
    public Project composeNew(User author) {
        Project project = new Project();

        project.setAuthor(author);
        project.setComment("");
        project.setStatus(ProjectStatusType.DRAFT);
        project.setStartDate(new Date());

        return project;
    }

    @Override
    public void fillFromDto(Project project, Project dto, User author) {
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

    @Override
    public void calculateReaders(Project project) {
        Set<IUser<Long>> readers = new HashSet<>();
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

    @Override
    public void completeProject(Project project) {
        project.setStatus(ProjectStatusType.COMPLETED);
    }

    @Override
    public void activateProject(Project project) {
        project.setStatus(ProjectStatusType.ACTIVE);
    }

    @Override
    public void mergeProject(Project project) {
        project.setStatus(ProjectStatusType.MERGED);
    }

    @Override
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
