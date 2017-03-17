package projects.domain.impl;

import java.util.HashSet;
import java.util.Set;

import com.exponentus.common.model.ACL;
import com.exponentus.env.EnvConst;
import com.exponentus.rest.outgoingdto.Outcome;

import administrator.model.User;
import projects.domain.IProjectDomain;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;

public class ProjectDomain implements IProjectDomain {

	private Project project;

	public ProjectDomain(Project project) {
		if (project == null) {
			throw new IllegalArgumentException("Error: project null");
		}

		this.project = project;
	}

	@Override
	public void composeNew(User author) {
		if (!project.isNew()) {
			throw new IllegalStateException("entity_is_not_new");
		}

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
	public boolean projectCanBeDeleted() {
		return !project.isNew() && project.isEditable() && project.getStatus() == ProjectStatusType.DRAFT;
	}

	@Override
	public Outcome getOutcome() {
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
