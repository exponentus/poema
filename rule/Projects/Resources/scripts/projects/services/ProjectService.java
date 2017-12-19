package projects.services;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.actions.constants.ActionType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
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
import projects.init.ModuleConst;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import projects.other.Messages;
import projects.ui.ActionFactory;
import projects.ui.ViewOptions;
import staff.dao.EmployeeDAO;
import staff.dto.converter.EmployeeDtoConverter;
import staff.model.Employee;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("projects")
@Produces(MediaType.APPLICATION_JSON)
public class ProjectService extends EntityService<Project, ProjectDomain> {

    private Outcome outcome = new Outcome();
    private ActionFactory action = new ActionFactory();

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

            ViewPage<Project> vp = projectDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);
            vp.setResult(new ProjectDtoConverter().convert(vp.getResult()));

            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getProjectOptions());
            vp.setFilter(viewOptions.getProjectFilter(session));

            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(
                    new Action(ActionType.LINK).caption("new_project").url(ModuleConst.BASE_URL + "projects/new"));
            actionBar.addAction(action.refreshVew);

            EmployeeDtoConverter converter = new EmployeeDtoConverter();
            EmployeeDAO empDao = new EmployeeDAO(session);
            List<Employee> empsResult = converter.convert(empDao.findAll(false).getResult());
            Map<Long, Employee> emps = empsResult.stream().collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

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
                project = dao.findByIdentifier(id);
                if (project == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = projectDomain.getOutcome(project);
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(session, project, projectDomain));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Project dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Project dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Project dto) {
        _Session session = getSession();

        try {
            validate(session, dto);

            ProjectDAO dao = new ProjectDAO(session);
            Project project;
            ProjectDomain projectDomain = new ProjectDomain(session);

            if (dto.isNew()) {
                project = new Project();
            } else {
                project = dao.findById(dto.getId());

                if (project == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            dto.setAttachments(getActualAttachments(project.getAttachments(), dto.getAttachments()));

            projectDomain.fillFromDto(project, dto, (User) session.getUser());

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

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        try {
            ProjectDAO dao = new ProjectDAO(getSession());
            Project entity = dao.findByIdentifier(id);
            if (entity != null) {
                entity.setAttachments(null);
                dao.delete(entity);
            }
            return Response.noContent().build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Project dto) {
        return null;
    }

    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            ProjectDAO dao = new ProjectDAO(getSession());
            Project entity = dao.findByIdentifier(id);

            return getAttachment(entity, attachId);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}/{fileName}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachmentFN(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        return getAttachment(id, attachId);
    }

    private ActionBar getActionBar(_Session session, Project project, ProjectDomain projectDomain) {
        ActionBar actionBar = new ActionBar(session);
        actionBar.addAction(action.close);
        if (project.isEditable()) {
            actionBar.addAction(action.saveAndClose);
            if (projectDomain.projectCanBeDeleted(project)) {
                actionBar.addAction(action.deleteDocument);
            }
        }
        return actionBar;
    }

    private void validate(_Session session, Project project) throws DTOException {
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
            ve.addError("comment", "maxlen_2048", "field_is_too_long");
        }

        if (ve.hasError()) {
            throw ve;
        }
    }
}
