package resourcereservations.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
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
import reference.model.Tag;
import reference.model.Vehicle;
import reference.model.constants.ApprovalType;
import resourcereservations.constants.Action;
import resourcereservations.dao.ApplicationForVehicleDAO;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.domain.ApplicationForVehicleDomain;
import resourcereservations.model.ApplicationForVehicle;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.exception.ApprovalException;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.other.Messages;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("applications_for_vehicle")
@Produces(MediaType.APPLICATION_JSON)
public class ApplicationForVehicleService extends RestProvider {

    @GET
    public Response getView() {
        _Session session = getSession();
        WebFormData params = getWebFormData();
        int pageSize = session.pageSize;
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));

        try {
            ApplicationFilter filter = new ApplicationFilter();

            // setup filter
            String vehicleId = params.getValueSilently("vehicle");
            if (!vehicleId.isEmpty()) {
                Vehicle vehicle = new Vehicle();
                vehicle.setId(UUID.fromString(vehicleId));
                filter.setVehicle(vehicle);
            }

            String statusName = params.getValueSilently("status");
            if (!statusName.isEmpty()) {
                filter.setStatus(ApprovalStatusType.valueOf(statusName));
            }

            String resultName = params.getValueSilently("result");
            if (!resultName.isEmpty()) {
                filter.setResult(ApprovalResultType.valueOf(resultName));
            }

            if (params.containsField("tag")) {
                List<Tag> tags = new ArrayList<>();
                String[] tagIds = params.getListOfValuesSilently("tag");
                for (String tid : tagIds) {
                    Tag tag = new Tag();
                    tag.setId(UUID.fromString(tid));
                    tags.add(tag);
                }
                filter.setTags(tags);
            }
            //

            ApplicationForVehicleDAO avDAO = new ApplicationForVehicleDAO(session);
            ViewPage vp = avDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(Action.newApplicationForVehicle);
            actionBar.addAction(Action.refreshVew);

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
            if (entity.getStatus() == ApprovalStatusType.DRAFT) {
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
                outcome.setMessage("approving_started");
                outcome.addPayload("result", "approving_started");

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
                outcome.setMessage("acceptApprovalBlock");

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
                outcome.setMessage("declineApprovalBlock");

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

        actionBar.addAction(Action.close);
        if (entity.isEditable()) {
            actionBar.addAction(Action.saveAndClose);
        }
        if (domain.approvalCanBeStarted(entity)) {
            actionBar.addAction(Action.startApproving);
        }

        EmployeeDAO employeeDAO = new EmployeeDAO(getSession());
        if (domain.employeeCanDoDecisionApproval(entity, employeeDAO.findByUser(session.getUser()))) {
            if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
                actionBar.addAction(Action.signApprovalBlock);
            } else {
                actionBar.addAction(Action.acceptApprovalBlock);
            }
            actionBar.addAction(Action.declineApprovalBlock);
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(Action.deleteDocument);
        }

        return actionBar;
    }
}
