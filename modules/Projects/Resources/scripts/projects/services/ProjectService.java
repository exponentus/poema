package projects.services;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.BaseReferenceModel;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.dao.filter.ProjectFilter;
import projects.domain.ProjectDomain;
import projects.dto.converter.ProjectDtoConverter;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import projects.other.Messages;
import projects.ui.ActionFactory;
import projects.ui.ViewOptions;
import staff.dao.EmployeeDAO;
import staff.dto.converter.EmployeeToBaseRefUserDtoConverter;
import staff.model.Employee;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("projects")
@Produces(MediaType.APPLICATION_JSON)
public class ProjectService extends EntityService<Project, ProjectDomain> {

    @GET
    public Response getViewPage() {

        _Session session = getSession();
        try {
            WebFormData params = getWebFormData();
            int pageSize = params.getNumberValueSilently("limit", session.getPageSize());
            SortParams sortParams = SortParams.valueOf(params.getStringValueSilently("sort", "status,name"));
            ProjectDAO projectDAO = new ProjectDAO(session);

            ProjectFilter filter = new ProjectFilter();
            if (!params.getValueSilently("status").isEmpty()) {
                filter.setStatus(ProjectStatusType.valueOf(params.getValueSilently("status")));
            }

            ViewPage<Project> vp = projectDAO.findViewPage(filter, new ProjectDtoConverter(), sortParams, params.getPage(), pageSize);

            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getProjectOptions());
            vp.setFilter(viewOptions.getProjectFilter(session));

            ActionFactory action = new ActionFactory();
            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(action.newProject());
            actionBar.addAction(action.refreshVew);

            EmployeeToBaseRefUserDtoConverter converter = new EmployeeToBaseRefUserDtoConverter();
            EmployeeDAO empDao = new EmployeeDAO(session);
            List<BaseReferenceModel<Long>> empsResult = converter.convert(empDao.findAll(false).getResult());
            Map<Long, BaseReferenceModel> emps = empsResult.stream().collect(Collectors.toMap(BaseReferenceModel::getId, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = new Outcome();
            outcome.setId("projects");
            outcome.setTitle("projects");
            outcome.addPayload(actionBar);
            outcome.addPayload("employees", emps);
            outcome.addPayload(vp);

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();
        try {
            EmployeeDAO empDao = new EmployeeDAO(session);
            ProjectDAO dao = new ProjectDAO(session);
            Project project;
            ProjectDomain projectDomain = new ProjectDomain(session);
            boolean isNew = "new".equals(id);

            if (isNew) {
                project = projectDomain.composeNew((User) session.getUser());
            } else {
                project = dao.findById(id);
                if (project == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));
            Environment.database.markAsRead(session.getUser(), project);

            Outcome outcome = projectDomain.getOutcome(project);
            outcome.setFSID(getWebFormData().getFormSesId());
            outcome.addPayload(getActionBar(session, project, projectDomain));
            outcome.addPayload("employees", emps);
            outcome.addPayload("projectStatusTypes", ProjectStatusType.getActualValues());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Project dto) {
        _Session session = getSession();

        try {
            ProjectDAO dao = new ProjectDAO(session);
            ProjectDomain projectDomain = new ProjectDomain(session);
            Project project = projectDomain.fillFromDto(dto, new Validation(session), getWebFormData().getFormSesId());

            if (dto.isNew()) {
                project = dao.add(project);
                new Messages(getAppEnv()).sendOfNewProject(project);
            } else {
                project = dao.update(project);
            }

            project = dao.findById(project.getId());

            return Response.ok(projectDomain.getOutcome(project)).build();
        } catch (SecureException | DatabaseException | DAOException e) {
            return responseException(e);
        } catch (DTOException e) {
            return responseValidationError(e);
        }
    }

    private ActionBar getActionBar(_Session session, Project project, ProjectDomain projectDomain) {
        ActionFactory action = new ActionFactory();
        ActionBar actionBar = new ActionBar(session);
        actionBar.addAction(action.close);
        if (project.isEditable()) {
            actionBar.addAction(action.saveAndClose);
            if (projectDomain.documentCanBeDeleted(project)) {
                actionBar.addAction(action.deleteDocument);
            }
        }
        return actionBar;
    }

    private class Validation implements IValidation<Project> {

        private _Session session;

        public Validation(_Session session) {
            this.session = session;
        }

        @Override
        public void check(Project project) throws DTOException {
            DTOException ve = new DTOException();

            UserDAO userDAO = new UserDAO(session);

            if (project.getName() == null || project.getName().isEmpty()) {
                ve.addError("name", "required", "field_is_empty");
            } else if (project.getName().length() > 140) {
                ve.addError("name", "maxlen_140", "field_is_too_long");
            }
            if (project.getCustomer() == null) {
                ve.addError("customer", "required", "field_is_empty");
            }
            if (project.getManager() <= 0) {
                ve.addError("manager", "required", "field_is_empty");
            } else {
                IUser managerUser = userDAO.findById(project.getManager());
                if (managerUser == null) {
                    ve.addError("manager", "required", "user_not_found");
                }
            }
            if (project.getProgrammer() <= 0) {
                ve.addError("programmer", "required", "field_is_empty");
            } else {
                IUser programmerUser = userDAO.findById(project.getProgrammer());
                if (programmerUser == null) {
                    ve.addError("programmer", "required", "user_not_found");
                }
            }
            if (project.getTester() > 0) {
                IUser testerUser = userDAO.findById(project.getTester());
                if (testerUser == null) {
                    ve.addError("tester", "required", "user_not_found");
                }
            }
            if (project.getObservers() != null && project.getObservers().size() > 0) {
                for (long uid : project.getObservers()) {
                    IUser ou = userDAO.findById(uid);
                    if (ou == null) {
                        ve.addError("observers", "required", "observer user not found");
                    }
                }
            }
            if (project.getRepresentatives() != null && project.getRepresentatives().size() > 0) {
                for (long uid : project.getRepresentatives()) {
                    IUser ou = userDAO.findById(uid);
                    if (ou == null) {
                        ve.addError("representatives", "required", "representative user not found");
                    }
                }
            }
            if (project.getStatus() == null || project.getStatus() == ProjectStatusType.UNKNOWN) {
                ve.addError("status", "required", "field_is_empty");
            }
            if (project.getFinishDate() == null) {
                ve.addError("finishDate", "date", "field_is_empty");
            }
            if (project.getComment() != null && project.getComment().length() > 2048) {
                ve.addError("comment", "maxlen:2048", "field_is_too_long");
            }

            if (ve.hasError()) {
                throw ve;
            }
        }
    }
}
