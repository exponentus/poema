package workflow.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._ActionBar;
import reference.model.constants.ApprovalType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.constants.Action;
import workflow.dao.OutgoingDAO;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.OutgoingDomain;
import workflow.domain.exception.ApprovalException;
import workflow.model.Outgoing;
import workflow.other.Messages;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("outgoings")
@Produces(MediaType.APPLICATION_JSON)
public class OutgoingService extends RestProvider {

    @GET
    public Response getView() {
        _Session session = getSession();
        int pageSize = session.pageSize;
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
        String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
        List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
        try {
            OutgoingDAO dao = new OutgoingDAO(session);
            ViewPage<Outgoing> vp = dao.findViewPage(sortParams, getWebFormData().getPage(), pageSize);

            //
            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(Action.newOutgoing);
            actionBar.addAction(Action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("outgoings");
            outcome.setTitle("outgoing_documents");
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
        Outgoing entity;
        OutgoingDomain outDomain = new OutgoingDomain();
        try {
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = outDomain.composeNew((User) ses.getUser());
            } else {
                OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
                entity = outgoingDAO.findByIdentefier(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = outDomain.getOutcome(entity);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(ses, entity, outDomain));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Outgoing dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Outgoing dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Outgoing dto) {
        _Session ses = getSession();
        Outgoing entity;
        OutgoingDomain outDomain = new OutgoingDomain();

        try {
            OutgoingDAO outgoingDAO = new OutgoingDAO(ses);

            if (dto.isNew()) {
                entity = new Outgoing();
            } else {
                entity = outgoingDAO.findById(dto.getId());
            }

            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            outDomain.fillFromDto(entity, dto, (User) ses.getUser());

            entity.addReaderEditor(entity.getAuthor());

            if (dto.isNew()) {
                RegNum rn = new RegNum();
                entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
                entity = outgoingDAO.add(entity, rn);
            } else {
                entity = outgoingDAO.update(entity);
            }

            entity = outgoingDAO.findById(entity.getId());

            return Response.ok(outDomain.getOutcome(entity)).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        } catch (DTOException e) {
            return responseValidationError(e);
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        try {
            OutgoingDAO dao = new OutgoingDAO(ses);
            Outgoing entity = dao.findByIdentefier(id);
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
            OutgoingDAO dao = new OutgoingDAO(getSession());
            Outgoing entity = dao.findByIdentefier(id);

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
    public Response startApproving(Outgoing dto) {
        try {
            OutgoingDAO officeMemoDAO = new OutgoingDAO(getSession());
            Outgoing om = officeMemoDAO.findById(dto.getId());
            OutgoingDomain omd = new OutgoingDomain();

            omd.startApproving(om);

            officeMemoDAO.update(om, false);
            new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
            Outcome outcome = omd.getOutcome(om);
            outcome.setTitle("approving_started");
            outcome.setMessage("approving_started");
            outcome.addPayload("result", "approving_started");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/acceptApprovalBlock")
    public Response acceptApprovalBlock(Outgoing dto) {
        try {
            OutgoingDAO officeMemoDAO = new OutgoingDAO(getSession());
            Outgoing om = officeMemoDAO.findById(dto.getId());
            OutgoingDomain omd = new OutgoingDomain();

            omd.acceptApprovalBlock(om, getSession().getUser());

            officeMemoDAO.update(om, false);
            new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
            Outcome outcome = omd.getOutcome(om);
            outcome.setTitle("acceptApprovalBlock");
            outcome.setMessage("acceptApprovalBlock");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/declineApprovalBlock")
    public Response declineApprovalBlock(Outgoing dto) {
        try {
            OutgoingDAO officeMemoDAO = new OutgoingDAO(getSession());
            Outgoing om = officeMemoDAO.findById(dto.getId());
            OutgoingDomain omd = new OutgoingDomain();

            String decisionComment = getWebFormData().getValueSilently("comment");

            omd.declineApprovalBlock(om, getSession().getUser(), decisionComment);

            officeMemoDAO.update(om, false);
            new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
            Outcome outcome = omd.getOutcome(om);
            outcome.setTitle("declineApprovalBlock");
            outcome.setMessage("declineApprovalBlock");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/skipApprovalBlock")
    public Response skipApprovalBlock(Outgoing dto) {
        try {
            OutgoingDAO dao = new OutgoingDAO(getSession());
            Outgoing entity = dao.findById(dto.getId());
            OutgoingDomain omd = new OutgoingDomain();

            omd.skipApprovalBlock(entity);

            dao.update(entity, false);
            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = omd.getOutcome(entity);
            outcome.setTitle("skipApprovalBlock");
            outcome.setMessage("skipApprovalBlock");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Outgoing entity, OutgoingDomain outDomain) throws DAOException {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(Action.close);
        if (entity.isEditable()) {
            actionBar.addAction(Action.saveAndClose);
        }
        if (outDomain.approvalCanBeStarted(entity)) {
            actionBar.addAction(Action.startApproving);
        }

        EmployeeDAO employeeDAO = new EmployeeDAO(session);

        if (outDomain.employeeCanDoDecisionApproval(entity, employeeDAO.findByUser(session.getUser()))) {
            if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
                actionBar.addAction(Action.signApprovalBlock);
            } else {
                actionBar.addAction(Action.acceptApprovalBlock);
            }
            actionBar.addAction(Action.declineApprovalBlock);
            actionBar.addAction(Action.skipApprovalBlock);
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(Action.deleteDocument);
        }

        return actionBar;
    }
}
