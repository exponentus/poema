package audit.services;

import administrator.model.User;
import audit.dao.ProjectDAO;
import audit.dao.filter.ProjectFilter;
import audit.domain.ProjectDomain;
import audit.init.AppConst;
import audit.model.Project;
import audit.model.constants.ProjectStatusType;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.actions.constants.ActionType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import org.eclipse.persistence.exceptions.DatabaseException;
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
@Produces(MediaType.APPLICATION_JSON)
public class ProjectService extends RestProvider {

	@GET
	public Response getViewPage() {

		_Session session = getSession();
		WebFormData params = getWebFormData();

		try {
			int pageSize = params.getNumberValueSilently("limit", session.getPageSize());
			String projectStatusName = params.getValueSilently("status");

			SortParams sortParams = params.getSortParams(SortParams.asc("name"));
			ProjectFilter filter = new ProjectFilter();

			if (!projectStatusName.isEmpty()) {
				filter.setStatus(ProjectStatusType.valueOf(projectStatusName));
			}

			ProjectDAO projectDAO = new ProjectDAO(session);
			ViewPage<Project> vp = projectDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);

			ActionBar actionBar = new ActionBar(session);
			actionBar.addAction(
					new Action(ActionType.LINK).caption("new_project").url(AppConst.BASE_URL + "projects/new"));
			actionBar.addAction(new Action(ActionType.RELOAD).id("refresh").icon("fa fa-refresh"));

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
				project = dao.findByIdentifier(id);
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

	private ActionBar getActionBar(_Session session, Project project, ProjectDomain domain) {
		ActionBar actionBar = new ActionBar(session);
		actionBar.addAction(new Action(ActionType.CLOSE).caption("close").icon("fa fa-chevron-left").cls("btn-back"));
		if (project.isEditable()) {
			actionBar.addAction(new Action(ActionType.SAVE_AND_CLOSE).caption("save_close").cls("btn-primary"));
		}
		return actionBar;
	}
}
