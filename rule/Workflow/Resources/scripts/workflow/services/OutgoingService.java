package workflow.services;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.LifeCycle;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.user.IUser;
import reference.model.constants.ApprovalSchemaType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.OutgoingDAO;
import workflow.dao.filter.OutgoingFilter;
import workflow.domain.OutgoingDomain;
import workflow.domain.exception.ApprovalException;
import workflow.dto.action.DeclineApprovalBlockAction;
import workflow.model.Outgoing;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("outgoings")
@Produces(MediaType.APPLICATION_JSON)
public class OutgoingService extends ApprovalService<Outgoing,  OutgoingDomain> {

    private ActionFactory action = new ActionFactory();

    @GET
    public Response getView() {
        _Session session = getSession();
        WebFormData params = getWebFormData();

        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        OutgoingFilter filter = new OutgoingFilter(params);

        try {
            OutgoingDAO dao = new OutgoingDAO(session);
            ViewPage vp = dao.findViewPage(filter, sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newOutgoing.caption("new"));
            actionBar.addAction(action.refreshVew);

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
    @Path("{id}/responses")
    public Response getIncomingResponsesViewPage(@PathParam("id") String id) {
        _Session ses = getSession();
        try {
            OutgoingDAO dao = new OutgoingDAO(ses);
            ViewPage vp = dao.findResponsesViewPage(dao.findByIdentefier(id));

            Outcome outcome = new Outcome();
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
        try {
            OutgoingDomain outDomain = new OutgoingDomain(ses);
            IUser<Long> user = ses.getUser();
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = outDomain.composeNew((User) user);
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

            if (!isNew){
                outcome.addPayload(new LifeCycle(user, entity));
            }

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Outgoing dto) {
        try {
            OutgoingDomain domain = new OutgoingDomain(getSession());
            Outgoing entity = domain.fillFromDto(dto, new ValidationToSaveAsDraft(), getWebFormData().getFormSesId());
            Outcome outcome = domain.getOutcome(domain.save(entity));

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/startApproving")
    public Response startApproving(Outgoing dto) {
        _Session ses = getSession();
        try {
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.fillFromDto(dto, new ValidationToStartApprove(), getWebFormData().getFormSesId());
            if (entity.getStatus() == ApprovalStatusType.REGISTERED) {
                entity.setStatus(ApprovalStatusType.DRAFT);
                entity.setSchema(ApprovalSchemaType.REJECT_IF_NO);
            }
            domain.startApproving(entity);
            domain.superUpdate(entity);
            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            outcome.setTitle("approving_started");
            outcome.setMessage("approving_started");
            outcome.addPayload("result", "approving_started");
            return Response.ok(outcome).build();

        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/acceptApprovalBlock")
    public Response acceptApprovalBlock(Outgoing dto) {
        try {
            _Session ses = getSession();
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.getEntity(dto);
            domain.acceptApprovalBlock(entity, ses.getUser());
            domain.superUpdate(entity);

            Outcome outcome = domain.getOutcome(entity);
            if (entity.getStatus() == ApprovalStatusType.FINISHED) {
                if (entity.getResult() == ApprovalResultType.ACCEPTED) {
                    new Messages(getAppEnv()).notifyOfAccepting(entity, entity.getTitle());
                }
            }
            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            outcome.setTitle("acceptApprovalBlock");
            outcome.setMessage("approval_block_accepted");

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/declineApprovalBlock")
    public Response declineApprovalBlock(DeclineApprovalBlockAction<Outgoing> actionDto) {
        try {
            _Session ses = getSession();
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.getEntity(actionDto.getModel());
            domain.declineApprovalBlock(entity, ses.getUser(), actionDto.getComment());
            domain.superUpdate(entity);

            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            if (entity.getStatus() == ApprovalStatusType.FINISHED) {
                if (entity.getResult() == ApprovalResultType.REJECTED) {
                    new Messages(getAppEnv()).notifyOfRejecting(entity, entity.getTitle());
                }
            }
            outcome.setTitle("declineApprovalBlock");
            outcome.setMessage("declineApprovalBlock");

            if (entity.getStatus() == ApprovalStatusType.FINISHED && entity.getResult() == ApprovalResultType.REJECTED) {
                if (entity.isVersionsSupport()) {
                    entity = domain.backToRevise(entity);
                    domain.superUpdate(entity);
                }
            }

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("action/register")
    public Response register(Outgoing dto) {
        try {
            _Session ses = getSession();
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.register(dto, new DefaultValidation());
            domain.superUpdate(entity);

            //new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            outcome.setTitle("outgoingRegsitered");
            outcome.setMessage("outgoingRegsitered");

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Outgoing entity, OutgoingDomain outDomain) throws DAOException {
        _ActionBar actionBar = new _ActionBar(session);
        IUser<Long> user = session.getUser();

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }

        actionBar.addAction(getApprovalButtonSet(user, entity));

        if (entity.getStatus() == ApprovalStatusType.FINISHED && user.getRoles().contains("chancellery")) {
            actionBar.addAction(action.registerOutgoing);
        }

        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        //
        if (entity.getStatus() == ApprovalStatusType.REGISTERED && session.getUser().getRoles().contains("can_sign_outgoing")) {
            actionBar.addAction(new Action(ActionType.API_ACTION).id("sign").caption("eds_test"));
        }

        return actionBar;
    }

    private class ValidationToSaveAsDraft implements IValidation<Outgoing> {

        @Override
        public void check(Outgoing dto) throws DTOException {
            DTOException e = new DTOException();

            if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
                e.addError("title", "required", "field_is_empty");
            }
            if (dto.getRecipient() == null) {
                e.addError("recipient", "required", "field_is_empty");
            }
            if (dto.getDocSubject() == null) {
                e.addError("docSubject", "required", "field_is_empty");
            }
            if (dto.getDocLanguage() == null) {
                e.addError("docLanguage", "required", "field_is_empty");
            }
            if (dto.getDocType() == null) {
                e.addError("docType", "required", "field_is_empty");
            }
            if (e.hasError()) {
                throw e;
            }
        }
    }

    private class ValidationToStartApprove extends ValidationToSaveAsDraft {

        @Override
        public void check(Outgoing dto) throws DTOException {
            super.check(dto);
            DTOException e = new DTOException();

            List<Block> blocks = dto.getBlocks();
            if (blocks.size() == 0) {
                e.addError("blocks", "required", "field_is_empty");
            } else {
                List<Approver> approvers = blocks.get(0).getApprovers();
                if (approvers == null || approvers.size() == 0) {
                    e.addError("approvers", "required", "field_is_empty");
                }
            }

            if (e.hasError()) {
                throw e;
            }
        }
    }
}
