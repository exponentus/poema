package resourcereservations.services;

import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.constants.ApprovalType;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.rest.validation.exception.DTOExceptionType;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._ActionBar;
import resourcereservations.dao.ApplicationForVehicleDAO;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.domain.ApplicationForVehicleDomain;
import resourcereservations.model.ApplicationForVehicle;
import resourcereservations.ui.ActionFactory;
import resourcereservations.ui.ViewOptions;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.other.Messages;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("applications-for-vehicle")
@Produces(MediaType.APPLICATION_JSON)
public class ApplicationForVehicleService extends RestProvider {

    private ActionFactory action = new ActionFactory();

    @GET
    public Response getView() {
        _Session session = getSession();
        WebFormData params = getWebFormData();
        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        ApplicationFilter filter = new ApplicationFilter(params);

        try {
            ApplicationForVehicleDAO avDAO = new ApplicationForVehicleDAO(session);
            ViewPage vp = avDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getApplicationForVehicleOptions());
            vp.setFilter(viewOptions.getApplicationForVehicleFilter());

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newApplicationForVehicle);
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("applications_for_vehicle");
            outcome.setTitle("applications_for_vehicle");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        ApplicationForVehicle entity;
        ApplicationForVehicleDomain domain = new ApplicationForVehicleDomain();

        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(ses);
            boolean isNew = "new".equals(id);

            if (isNew) {
                entity = domain.composeNew(employeeDAO.findByUser(ses.getUser()));
            } else {
                ApplicationForVehicleDAO incomingDAO = new ApplicationForVehicleDAO(ses);
                entity = incomingDAO.findByIdentefier(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = domain.getOutcome(entity);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(ses, entity, domain));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(ApplicationForVehicle dto) {
        dto.setId(null);
        return saveRequest(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, ApplicationForVehicle dto) {
        dto.setId(UUID.fromString(id));
        return saveRequest(dto);
    }

    private Response saveRequest(ApplicationForVehicle dto) {
        try {
            ApplicationForVehicleDomain domain = new ApplicationForVehicleDomain();
            Outcome outcome = domain.getOutcome(save(dto));

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    public ApplicationForVehicle save(ApplicationForVehicle dto) throws DAOException, SecureException, DTOException {
        _Session ses = getSession();

        EmployeeDAO employeeDAO = new EmployeeDAO(ses);
        ApplicationForVehicleDAO avDAO = new ApplicationForVehicleDAO(ses);

        ApplicationForVehicle entity = null;
        if (dto.isNew()) {
            entity = new ApplicationForVehicle();
        } else {
            entity = avDAO.findById(dto.getId());
        }

        dto.setAppliedAuthor(employeeDAO.findById(dto.getAppliedAuthor().getId()));
        dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

        ApplicationForVehicleDomain domain = new ApplicationForVehicleDomain();
        domain.fillFromDto(entity, dto, employeeDAO.findByUser(ses.getUser()));

        if (dto.isNew()) {
            RegNum rn = new RegNum();
            entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
            entity = avDAO.add(entity, rn);
        } else {
            entity = avDAO.update(entity);
        }

        entity = avDAO.findById(entity.getId());

        return entity;
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        try {
            ApplicationForVehicleDAO dao = new ApplicationForVehicleDAO(ses);
            ApplicationForVehicle entity = dao.findByIdentefier(id);
            if (entity.getApprovalStatus() == ApprovalStatusType.DRAFT) {
                if (entity != null) {
                    dao.delete(entity);
                }
            } else {
                return responseException(new DTOException(DTOExceptionType.IMPROPER_CONDITION));
            }
            return Response.noContent().build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            ApplicationForVehicleDAO dao = new ApplicationForVehicleDAO(getSession());
            ApplicationForVehicle entity = dao.findByIdentefier(id);

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

    @POST
    @Path("action/startApproving")
    public Response startApproving(ApplicationForVehicle dto) {
        try {
            ApplicationForVehicle entity = save(dto);
            if (entity != null) {
                ApplicationForVehicleDAO afvDAO = new ApplicationForVehicleDAO(getSession());
                ApplicationForVehicleDomain domain = new ApplicationForVehicleDomain();

                domain.startApproving(entity);

                afvDAO.update(entity, false);
                new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
                Outcome outcome = domain.getOutcome(entity);
                outcome.setTitle("approving_started");
                outcome.setMessage("approving_start_successful");

                return Response.ok(outcome).build();
            } else {
                return responseValidationError(new DTOException(DTOExceptionType.NO_ENTITY));
            }
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/acceptApprovalBlock")
    public Response acceptApprovalBlock(ApplicationForVehicle dto) {
        try {
            ApplicationForVehicleDAO dao = new ApplicationForVehicleDAO(getSession());
            ApplicationForVehicle entity = dao.findById(dto.getId());
            if (entity != null) {
                ApplicationForVehicleDomain domain = new ApplicationForVehicleDomain();

                domain.acceptApprovalBlock(entity, getSession().getUser());

                dao.update(entity, false);
                new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
                Outcome outcome = domain.getOutcome(entity);
                outcome.setTitle("acceptApprovalBlock");
                outcome.setMessage("approval_block_accepted");

                return Response.ok(outcome).build();
            } else {
                return responseValidationError(new DTOException(DTOExceptionType.NO_ENTITY));
            }
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/declineApprovalBlock")
    public Response declineApprovalBlock(ApplicationForVehicle dto) {
        try {
            ApplicationForVehicleDAO dao = new ApplicationForVehicleDAO(getSession());
            ApplicationForVehicle entity = dao.findById(dto.getId());
            if (entity != null) {
                ApplicationForVehicleDomain domain = new ApplicationForVehicleDomain();

                String decisionComment = getWebFormData().getValueSilently("comment");

                domain.declineApprovalBlock(entity, getSession().getUser(), decisionComment);

                dao.update(entity, false);
                new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
                Outcome outcome = domain.getOutcome(entity);
                outcome.setTitle("declineApprovalBlock");
                outcome.setMessage("approval_block_declined");

                return Response.ok(outcome).build();
            } else {
                return responseValidationError(new DTOException(DTOExceptionType.NO_ENTITY));
            }
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, ApplicationForVehicle entity, ApplicationForVehicleDomain domain)
            throws DAOException {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }
        if (domain.approvalCanBeStarted(entity)) {
            actionBar.addAction(action.startApproving);
        }

        EmployeeDAO employeeDAO = new EmployeeDAO(getSession());
        if (domain.employeeCanDoDecisionApproval(entity, employeeDAO.findByUser(session.getUser()))) {
            if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
                actionBar.addAction(action.signApprovalBlock);
            } else {
                actionBar.addAction(action.acceptApprovalBlock);
            }
            actionBar.addAction(action.declineApprovalBlock);
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        return actionBar;
    }
}
