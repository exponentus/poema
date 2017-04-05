package projects.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.env.EnvConst;
import com.exponentus.rest.outgoingdto.Outcome;
import projects.domain.IProjectDomain;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;

import java.util.HashSet;
import java.util.Set;

public class ProjectDomain implements IProjectDomain {

    @Override
    public Project composeNew(User author) {
        Project project = new Project();

        project.setAuthor(author);
        project.setComment("");
        project.setStatus(ProjectStatusType.DRAFT);

        return project;
    }

    @Override
    public void fillFromDto(Project project, Project dto, User author) {
        if (project.isNew()) {
            project.setAuthor(author);
        }
        project.setName(dto.getName());
        project.setCustomer(dto.getCustomer());
        project.setManager(dto.getManager());
        project.setProgrammer(dto.getProgrammer());
        project.setTester(dto.getTester());
        project.setObservers(dto.getObservers());
        project.setRepresentatives(dto.getRepresentatives());
        project.setComment(dto.getComment());
        project.setStatus(dto.getStatus());
        project.setFinishDate(dto.getFinishDate());
        project.setAttachments(dto.getAttachments());
        project.setPrimaryLanguage(EnvConst.getDefaultLang());

        calculateReaders(project);
    }

    @Override
    public void calculateReaders(Project project) {
        Set<Long> readers = new HashSet<>();
        readers.add(project.getAuthor().getId());
        readers.add(project.getManager());
        readers.add(project.getProgrammer());
        if (project.getTester() > 0) {
            readers.add(project.getTester());
        }
        if (project.getObservers() != null) {
            readers.addAll(project.getObservers());
        }

        project.setReaders(readers);
    }

    @Override
    public boolean projectCanBeDeleted(Project project) {
        return !project.isNew() && project.isEditable() && project.getStatus() == ProjectStatusType.DRAFT;
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
