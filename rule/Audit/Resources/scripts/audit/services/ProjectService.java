package audit.services;

import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.persistence.exceptions.DatabaseException;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;

import administrator.model.User;
import audit.dao.ProjectDAO;
import audit.dao.filter.ProjectFilter;
import audit.domain.impl.ProjectDomain;
import audit.model.Project;
import audit.model.constants.ProjectStatusType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

@Path("projects")
public class ProjectService extends RestProvider {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getViewPage() {

		_Session session = getSession();
		WebFormData params = getWebFormData();

		try {
			int pageSize = params.getNumberValueSilently("limit", session.pageSize);
			String projectStatusName = params.getValueSilently("status");

			SortParams sortParams = params.getSortParams(SortParams.asc("name"));
			ProjectFilter filter = new ProjectFilter();

			if (!projectStatusName.isEmpty()) {
				filter.setStatus(ProjectStatusType.valueOf(projectStatusName));
			}

			ProjectDAO projectDAO = new ProjectDAO(session);
			ViewPage<Project> vp = projectDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);

			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(new _Action("new_project", "", "new_project"));

			EmployeeDAO empDao = new EmployeeDAO(session);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = new Outcome();
			outcome.addPayload("employees", emps);
			outcome.setTitle("projects");
			outcome.addPayload(actionBar);
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
			ProjectDAO dao = new ProjectDAO(session);
			Project project;
			ProjectDomain projectDomain = new ProjectDomain();
			boolean isNew = "new".equals(id);

			if (isNew) {
				project = projectDomain.composeNew((User) session.getUser());
			} else {
				project = dao.findByIdentefier(id);
				if (project == null) {
					return Response.status(Response.Status.NOT_FOUND).build();
				}
			}

			EmployeeDAO empDao = new EmployeeDAO(session);
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
			ProjectDomain projectDomain = new ProjectDomain();

			if (dto.isNew()) {
				project = new Project();
				project.setStatus(ProjectStatusType.DRAFT);
			} else {
				project = dao.findById(dto.getId());

				if (project == null) {
					return Response.status(Response.Status.NOT_FOUND).build();
				}
			}

			dto.setAttachments(getActualAttachments(project.getAttachments(), dto.getAttachments()));

			projectDomain.fillFromDto(project, dto, (User) session.getUser());

			dao.save(project);

			if (dto.isNew()) {
				// new Messages(getAppEnv()).sendOfNewProject(project);}
			}

			project = dao.findById(project.getId());

			return Response.ok(projectDomain.getOutcome(project)).build();
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
			Project entity = dao.findByIdentefier(id);
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
			Project entity = dao.findByIdentefier(id);

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

	private _ActionBar getActionBar(_Session session, Project project, ProjectDomain domain) {
		_ActionBar actionBar = new _ActionBar(session);
		actionBar.addAction(new _Action("close", "", "close", "fa fa-chevron-left", "btn-back"));
		if (project.isEditable()) {
			actionBar.addAction(new _Action("save_close", "", "save_and_close", "", "btn-primary"));
		}
		return actionBar;
	}

	private void validate(_Session session, Project entity) throws _Validation.VException {
		_Validation ve = new _Validation();

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

		ve.assertValid();
	}
}
