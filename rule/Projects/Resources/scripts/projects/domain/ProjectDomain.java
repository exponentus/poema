package projects.domain;

import administrator.model.User;
import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.ACL;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import projects.init.AppConst;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static java.time.temporal.TemporalAdjusters.lastDayOfYear;

public class ProjectDomain extends CommonDomain<Project> {

    public ProjectDomain(_Session ses) {
        super(ses);
    }

    public Project composeNew(User author) {
        Project project = new Project();

        project.setAuthor(author);
        project.setComment("");
        project.setStatus(ProjectStatusType.DRAFT);
        LocalDate lastDay = LocalDate.now().with(lastDayOfYear());
        project.setFinishDate(Date.from(lastDay.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        return project;
    }

    @Override
    public Project fillFromDto(Project dto, IValidation<Project> validation, String formSesId) throws DTOException, DAOException {
        return null;
    }

    public void fillFromDto(Project project, Project dto, User author) throws DAOException {
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

    public void calculateReaders(Project project) throws DAOException {
        Set<Long> readers = new HashSet<>();
        try {
            readers.add(project.getAuthor().getId());
        } catch (Exception e) {

        }
        readers.add(project.getManager());
        readers.add(project.getProgrammer());
        if (project.getTester() > 0) {
            readers.add(project.getTester());
        }
        if (project.getObservers() != null) {
            readers.addAll(project.getObservers());
        }

        EmployeeDAO employeeDAO = new EmployeeDAO(ses);
        ViewPage<Employee> supervisors = employeeDAO.findByRole(AppConst.CODE + EnvConst.SUPERVISOR_ROLE_NAME);
        for(Employee sv:supervisors.getResult()){
            readers.add(sv.getUserID());
        }

        project.setReaders(readers);
    }

    public boolean projectCanBeDeleted(Project project) {
        return !project.isNew() && project.isEditable() && (project.getTasks() == null || project.getTasks().size() == 0);
    }

    public Outcome getOutcome(Project project) {
        Outcome outcome = new Outcome();

        if (project.isNew()) {
            outcome.setTitle(Environment.vocabulary.getWord("new_project", ses.getLang()));
            outcome.addPayload("contentTitle", "new_project");
        } else {
            outcome.setTitle(Environment.vocabulary.getWord("project", ses.getLang()) + " " + project.getTitle());
            outcome.addPayload("contentTitle", "project");
        }

        outcome.addPayload(project);
        if (!project.isNew()) {
            outcome.addPayload(new ACL(project));
        }

        return outcome;
    }
}
