package projects.domain.impl;

import administrator.model.User;
import com.exponentus.common.model.ACL;
import com.exponentus.env.EnvConst;
import com.exponentus.rest.outgoingpojo.Outcome;
import projects.domain.IProjectDomain;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;

import java.util.HashSet;
import java.util.Set;

public class ProjectDomain implements IProjectDomain {

    private Project project;

    public ProjectDomain(Project project) {
        this.project = project;
    }

    @Override
    public void composeProject(User author) {
        project.setAuthor(author);
        project.setComment("");
        project.setStatus(ProjectStatusType.DRAFT);
    }

    @Override
    public void fillFromDto(Project dto, User author) {
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

        calculateReaders();
    }

    @Override
    public void calculateReaders() {
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
    public Outcome getOutcome() {
        Outcome outcome = new Outcome();

        if (project.isNew()) {
            outcome.setTitle("new_project");
        } else {
            outcome.setTitle(project.getName());
        }

        outcome.addPayload(project);
        if (!project.isNew()) {
            outcome.addPayload(new ACL(project));
        }

        return outcome;
    }
}
