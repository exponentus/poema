package workflow.services;

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

import com.exponentus.common.domain.IValidation;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._ActionBar;

import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.ReportDAO;
import workflow.domain.ReportDomain;
import workflow.model.Report;
import workflow.ui.ActionFactory;

@Path("reports")
@Produces(MediaType.APPLICATION_JSON)
public class ReportService extends RestProvider {

	private ActionFactory action = new ActionFactory();

	@GET
	@Path("{id}")
	public Response getById(@PathParam("id") String id) {
		try {
			_Session ses = getSession();
			Report entity;
			ReportDomain reportDomain = new ReportDomain(ses);

			boolean isNew = "new".equals(id);
			if (isNew) {
				EmployeeDAO employeeDAO = new EmployeeDAO(ses);
				AssignmentDAO aDAO = new AssignmentDAO(ses);
				String assignmentId = getWebFormData().getValueSilently("assignment");

				entity = reportDomain.composeNew(employeeDAO.findByUser(ses.getUser()),
						aDAO.findByIdentefier(assignmentId));
			} else {
				ReportDAO reportDAO = new ReportDAO(ses);
				entity = reportDAO.findByIdentefier(id);
			}

			EmployeeDAO empDao = new EmployeeDAO(ses);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

			Outcome outcome = reportDomain.getOutcome(entity);
			outcome.addPayload("employees", emps);
			outcome.addPayload(getActionBar(ses, entity));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

			return Response.ok(outcome).build();
		} catch (Exception e) {
			return responseException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Report dto) {
		dto.setId(null);
		return saveForm(dto);
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") String id, Report dto) {
		dto.setId(UUID.fromString(id));
		return saveForm(dto);
	}

	private Response saveForm(Report dto) {
		try {
			ReportDomain domain = new ReportDomain(getSession());
			Report entity = domain.fillFromDto(dto, new Validation(), getWebFormData().getFormSesId());
			Outcome outcome = domain.getOutcome(domain.save(entity));

			return Response.ok(outcome).build();
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException e) {
			return responseException(e);
		}
	}

	@DELETE
	@Path("{id}")
	public Response delete(@PathParam("id") String id) {
		try {
			_Session ses = getSession();
			ReportDAO dao = new ReportDAO(ses);
			Report entity = dao.findByIdentefier(id);
			if (entity != null) {
				dao.delete(entity);
			}
			return Response.noContent().build();
		} catch (SecureException | DAOException e) {
			return responseException(e);
		}
	}

	@Override
	@GET
	@Path("{id}/attachments/{attachId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		try {
			ReportDAO dao = new ReportDAO(getSession());
			Report entity = dao.findByIdentefier(id);

			return getAttachment(entity, attachId);
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	@GET
	@Path("{id}/attachments/{attachId}/{fileName}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachmentFN(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		return getAttachment(id, attachId);
	}

	private _ActionBar getActionBar(_Session session, Report entity) {
		_ActionBar actionBar = new _ActionBar(session);

		actionBar.addAction(action.close);
		actionBar.addAction(action.saveAndClose);
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(action.deleteDocument);
		}

		return actionBar;
	}

	private class Validation implements IValidation<Report> {

		@Override
		public void check(Report assignment) throws DTOException {
			DTOException ve = new DTOException();

			if (assignment.getTitle() == null || assignment.getTitle().isEmpty()) {
				ve.addError("title", "required", "field_is_empty");
			}

			if (ve.hasError()) {
				throw ve;
			}

		}

	}
}
