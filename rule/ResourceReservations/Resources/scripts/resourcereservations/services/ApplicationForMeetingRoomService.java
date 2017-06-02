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
import reference.model.constants.ApprovalType;
import resourcereservations.constants.ActionFactory;
import resourcereservations.dao.ApplicationForMeetingRoomDAO;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.domain.ApplicationForMeetingRoomDomain;
import resourcereservations.model.ApplicationForMeetingRoom;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.exception.ApprovalException;
import workflow.other.Messages;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("applications_for_meeting_room")
@Produces(MediaType.APPLICATION_JSON)
public class ApplicationForMeetingRoomService extends RestProvider {

    private ActionFactory action = new ActionFactory();

    @GET
    public Response getView() {
        _Session session = getSession();
        WebFormData params = getWebFormData();
        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        ApplicationFilter filter = new ApplicationFilter(params);

        try {
            ApplicationForMeetingRoomDAO avDAO = new ApplicationForMeetingRoomDAO(session);
            ViewPage vp = avDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newApplicationForMeetingRoom);
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
        ApplicationForMeetingRoom entity;
        ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();

        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(ses);
            boolean isNew = "new".equals(id);

            if (isNew) {
                entity = domain.composeNew(employeeDAO.findByUser(ses.getUser()));
            } else {
                ApplicationForMeetingRoomDAO incomingDAO = new ApplicationForMeetingRoomDAO(ses);
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
    public Response add(ApplicationForMeetingRoom dto) {
        dto.setId(null);
        return saveRequest(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, ApplicationForMeetingRoom dto) {
        dto.setId(UUID.fromString(id));
        return saveRequest(dto);
    }

    private Response saveRequest(ApplicationForMeetingRoom dto) {
        try {
            ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();
            Outcome outcome = domain.getOutcome(save(dto));

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    public ApplicationForMeetingRoom save(ApplicationForMeetingRoom dto)
            throws SecureException, DAOException, DTOException {
        _Session ses = getSession();
        ApplicationForMeetingRoom entity;
        ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();

        EmployeeDAO employeeDAO = new EmployeeDAO(ses);
        ApplicationForMeetingRoomDAO avDAO = new ApplicationForMeetingRoomDAO(ses);

        if (dto.isNew()) {
            entity = new ApplicationForMeetingRoom();
        } else {
            entity = avDAO.findById(dto.getId());
        }

        dto.setAppliedAuthor(employeeDAO.findById(dto.getAppliedAuthor().getId()));
        dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

        domain.fillFromDto(entity, dto, employeeDAO.findByUser(ses.getUser()));

        if (dto.isNew()) {
            RegNum rn = new RegNum();
            entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
            entity = avDAO.add(entity, rn);
        } else {
            entity = avDAO.update(entity);
        }

        return avDAO.findById(entity.getId());
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        try {
            ApplicationForMeetingRoomDAO dao = new ApplicationForMeetingRoomDAO(ses);
            ApplicationForMeetingRoom entity = dao.findByIdentefier(id);
            if (entity != null) {
                dao.delete(entity);
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
            ApplicationForMeetingRoomDAO dao = new ApplicationForMeetingRoomDAO(getSession());
            ApplicationForMeetingRoom entity = dao.findByIdentefier(id);

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
    public Response startApproving(ApplicationForMeetingRoom dto) {
        try {
            ApplicationForMeetingRoom entity = save(dto);
            if (entity != null) {
                ApplicationForMeetingRoomDAO afvDAO = new ApplicationForMeetingRoomDAO(getSession());
                ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();

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
    public Response acceptApprovalBlock(ApplicationForMeetingRoom dto) {
        try {
            ApplicationForMeetingRoomDAO dao = new ApplicationForMeetingRoomDAO(getSession());
            ApplicationForMeetingRoom entity = dao.findById(dto.getId());
            ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();

            domain.acceptApprovalBlock(entity, getSession().getUser());

            dao.update(entity, false);
            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            outcome.setTitle("acceptApprovalBlock");
            outcome.setMessage("approval_block_accepted");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/declineApprovalBlock")
    public Response declineApprovalBlock(ApplicationForMeetingRoom dto) {
        try {
            ApplicationForMeetingRoomDAO dao = new ApplicationForMeetingRoomDAO(getSession());
            ApplicationForMeetingRoom entity = dao.findById(dto.getId());
            ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();

            String decisionComment = getWebFormData().getValueSilently("comment");

            domain.declineApprovalBlock(entity, getSession().getUser(), decisionComment);

            dao.update(entity, false);
            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            outcome.setTitle("declineApprovalBlock");
            outcome.setMessage("approval_block_declined");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, ApplicationForMeetingRoom entity,
                                    ApplicationForMeetingRoomDomain domain) throws DAOException {
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
