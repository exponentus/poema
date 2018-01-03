package resourcereservations.services;

import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.dto.ActionPayload;
import com.exponentus.common.model.constants.ApprovalType;
import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.ActionBar;
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
import resourcereservations.dao.ApplicationForMeetingRoomDAO;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.domain.ApplicationForMeetingRoomDomain;
import resourcereservations.init.ModuleConst;
import resourcereservations.model.ApplicationForMeetingRoom;
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

@Path("applications-for-meeting-room")
@Produces(MediaType.APPLICATION_JSON)
public class ApplicationForMeetingRoomService extends RestProvider {

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
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getApplicationForMeetingRoomOptions());
            vp.setFilter(viewOptions.getApplicationForMeetingRoomFilter());

            ActionFactory action = new ActionFactory();
            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(action.newApplicationForMeetingRoom());
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("applications_for_meeting_room");
            outcome.setTitle("applications_for_meeting_room");
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
                entity = incomingDAO.findByIdentifier(id);
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
            ApplicationForMeetingRoom entity = dao.findByIdentifier(id);
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
            ApplicationForMeetingRoom entity = dao.findByIdentifier(id);

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
    @Path("startApproving")
    public Response startApproving(ActionPayload<ApplicationForMeetingRoom, ?> action) {
        try {
            ApplicationForMeetingRoom entity = save(action.getTarget());
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
    @Path("acceptApprovalBlock")
    public Response acceptApprovalBlock(ActionPayload<ApplicationForMeetingRoom, ?> action) {
        try {
            ApplicationForMeetingRoomDAO dao = new ApplicationForMeetingRoomDAO(getSession());
            ApplicationForMeetingRoom entity = dao.findById(action.getTarget().getId());
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
    @Path("declineApprovalBlock")
    public Response declineApprovalBlock(ActionPayload<ApplicationForMeetingRoom, String> action) {
        try {
            ApplicationForMeetingRoomDAO dao = new ApplicationForMeetingRoomDAO(getSession());
            ApplicationForMeetingRoom entity = dao.findById(action.getTarget().getId());
            ApplicationForMeetingRoomDomain domain = new ApplicationForMeetingRoomDomain();

            domain.declineApprovalBlock(entity, getSession().getUser(), action.getPayload());

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

    private ActionBar getActionBar(_Session session, ApplicationForMeetingRoom entity,
                                   ApplicationForMeetingRoomDomain domain) throws DAOException {
        ActionFactory action = new ActionFactory();
        ActionBar actionBar = new ActionBar(session);
        String actionUri = ModuleConst.BASE_URL + "api/applications-for-meeting-room/action/";

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }
        if (domain.approvalCanBeStarted(entity)) {
            actionBar.addAction(ConventionalActionFactory.Approving.startApproving(actionUri));
        }

        EmployeeDAO employeeDAO = new EmployeeDAO(getSession());
        if (domain.employeeCanDoDecisionApproval(entity, employeeDAO.findByUser(session.getUser()))) {
            if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
                actionBar.addAction(ConventionalActionFactory.Approving.signApprovalBlock(actionUri));
            } else {
                actionBar.addAction(ConventionalActionFactory.Approving.acceptApprovalBlock(actionUri));
            }
            actionBar.addAction(ConventionalActionFactory.Approving.declineApprovalBlock(actionUri));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        return actionBar;
    }
}
