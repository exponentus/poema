package workflow.services;

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
import workflow.constants.Action;
import workflow.dao.AssignmentDAO;
import workflow.dao.ReportDAO;
import workflow.domain.ReportDomain;
import workflow.model.Report;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("reports")
@Produces(MediaType.APPLICATION_JSON)
public class ReportService extends RestProvider {

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            Report entity;
            ReportDomain reportDomain = new ReportDomain();

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
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Report dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Report dto) {
        _Session ses = getSession();
        Report entity;
        ReportDomain reportDomain = new ReportDomain();

        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(ses);
            ReportDAO reportDAO = new ReportDAO(ses);

            if (dto.isNew()) {
                entity = new Report();
            } else {
                entity = reportDAO.findById(dto.getId());
            }

            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            reportDomain.fillFromDto(entity, dto, employeeDAO.findByUser(ses.getUser()));

            entity.addReaderEditor(entity.getAuthor());

            if (dto.isNew()) {
                entity = reportDAO.add(entity);
            } else {
                entity = reportDAO.update(entity);
            }

            return Response.ok(reportDomain.getOutcome(entity)).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        } catch (DTOException e) {
            return responseValidationError(e);
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

        actionBar.addAction(Action.close);
        actionBar.addAction(Action.saveAndClose);
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(Action.deleteDocument);
        }

        return actionBar;
    }
}
