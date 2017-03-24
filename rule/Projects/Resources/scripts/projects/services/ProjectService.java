package projects.services;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.Selector;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.user.IUser;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.domain.impl.ProjectDomain;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import projects.other.Messages;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("projects")
public class ProjectService extends RestProvider {

    private Outcome outcome = new Outcome();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {

        _Session session = getSession();
        try {
            int pageSize = getWebFormData().getNumberValueSilently("limit", session.pageSize);
            SortParams sortParams = getWebFormData().getSortParams(SortParams.asc("name"));
            ProjectDAO projectDAO = new ProjectDAO(session);
            Selector<Project> select = projectDAO.getSelector();
            select.setPageNum(getWebFormData().getPage());
            select.setPageSize(pageSize);
            select.setSortParams(sortParams);
            select.addField("id");
            select.addField("regDate");
            select.addField("name");
            select.addField("status");
            select.addField(select.getRoot().get("customer").get("name"));
            select.addField("manager");
            select.addField("tester");
            select.addField("programmer");
            select.addField("finishDate");
            select.addField("comment");
            select.addAttachmentCount();

            ProjectStatusType status = null;
            if (!getWebFormData().getValueSilently("status").isEmpty()) {
                status = ProjectStatusType.valueOf(getWebFormData().getValueSilently("status"));
            }

            ViewPage<Project> vp = projectDAO.findViewPage1(sortParams, status, getWebFormData().getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(new _Action("new_project", "", "new_project"));

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

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
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session session = getSession();
        try {
            EmployeeDAO empDao = new EmployeeDAO(session);
            ProjectDAO dao = new ProjectDAO(session);
            Project project;
            ProjectDomain projectDomain;
            boolean isNew = "new".equals(id);

            if (isNew) {
                project = new Project();
                projectDomain = new ProjectDomain(project);
                projectDomain.composeNew((User) session.getUser());
            } else {
                project = dao.findById(id);
                if (project == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }

                projectDomain = new ProjectDomain(project);
            }

            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = projectDomain.getOutcome();
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(session, project, projectDomain));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Project dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
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
            ProjectDomain projectDomain;

            if (dto.isNew()) {
                project = new Project();
            } else {
                project = dao.findById(dto.getId());

                if (project == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            dto.setAttachments(getActualAttachments(project.getAttachments(), dto.getAttachments()));

            projectDomain = new ProjectDomain(project);
            projectDomain.fillFromDto(dto, (User) session.getUser());

            if (dto.isNew()) {
                project = dao.add(project);
                new Messages(getAppEnv()).sendOfNewProject(project);
            } else {
                project = dao.update(project);
            }

            project = dao.findById(project.getId());
            projectDomain = new ProjectDomain(project);

            return Response.ok(projectDomain.getOutcome()).build();
        } catch (SecureException | DatabaseException | DAOException e) {
            return responseException(e);
        } catch (_Validation.VException e) {
            return responseValidationError(e.getValidation());
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        try {
            ProjectDAO dao = new ProjectDAO(getSession());
            Project entity = dao.findById(id);
            if (entity != null) {
                entity.setAttachments(null); // if no on delete cascade
                dao.delete(entity);
            }
            return Response.noContent().build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            ProjectDAO dao = new ProjectDAO(getSession());
            Project entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Project project, ProjectDomain projectDomain) {
        _ActionBar actionBar = new _ActionBar(session);
        actionBar.addAction(new _Action("close", "", "close", "fa fa-chevron-left", "btn-back"));
        if (project.isEditable()) {
            actionBar.addAction(new _Action("save_close", "", "save_and_close", "", "btn-primary"));
            if (projectDomain.projectCanBeDeleted()) {
                actionBar.addAction(new _Action("delete", "", "delete_document", "", "btn-warning-effect"));
            }
        }
        return actionBar;
    }

    private void validate(_Session session, Project project) throws _Validation.VException {
        _Validation ve = new _Validation();

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
            ve.addError("managerUserId", "required", "field_is_empty");
        } else {
            IUser<Long> managerUser = userDAO.findById(project.getManager());
            if (managerUser == null) {
                ve.addError("managerUserId", "required", "user_not_found");
            }
        }
        if (project.getProgrammer() <= 0) {
            ve.addError("programmerUserId", "required", "field_is_empty");
        } else {
            IUser<Long> programmerUser = userDAO.findById(project.getProgrammer());
            if (programmerUser == null) {
                ve.addError("programmerUserId", "required", "user_not_found");
            }
        }
        if (project.getTester() > 0) {
            IUser<Long> testerUser = userDAO.findById(project.getTester());
            if (testerUser == null) {
                ve.addError("testerUserId", "required", "user_not_found");
            }
        }

        if (project.getObservers() != null && project.getObservers().size() > 0) {
            for (long uid : project.getObservers()) {
                IUser<Long> ou = userDAO.findById(uid);
                if (ou == null) {
                    ve.addError("observerUserIds", "required", "observer user not found");
                }
            }
        }

        if (project.getRepresentatives() != null && project.getRepresentatives().size() > 0) {
            for (long uid : project.getRepresentatives()) {
                IUser<Long> ou = userDAO.findById(uid);
                if (ou == null) {
                    ve.addError("representativesUserIds", "required", "representative user not found");
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

        ve.assertValid();
    }
}
