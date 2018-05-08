package workflow.services;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.dto.ActionPayload;
import com.exponentus.common.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalSchemaType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.common.service.ApprovalService;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.lifecycle.LifeCycle;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.OutgoingDAO;
import workflow.dao.filter.OutgoingFilter;
import workflow.domain.OutgoingDomain;
import workflow.init.ModuleConst;
import workflow.model.Outgoing;
import workflow.other.Messages;
import workflow.ui.ActionFactory;
import workflow.ui.ViewOptions;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("outgoings")
@Produces(MediaType.APPLICATION_JSON)
public class OutgoingService extends ApprovalService<Outgoing, OutgoingDomain> {

    @GET
    public Response getViewPage() {
        _Session session = getSession();
        WebFormData params = getWebFormData();

        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        OutgoingFilter filter = new OutgoingFilter(params);

        try {
            OutgoingDAO dao = new OutgoingDAO(session);
            ViewPage vp = dao.findViewPage(filter, sortParams, params.getPage(), pageSize);
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getOutgoingOptions());
            vp.setFilter(viewOptions.getOutgoingFilter(session));

            ActionFactory action = new ActionFactory();
            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(action.newOutgoing());
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
            ViewPage vp = dao.findResponsesViewPage(dao.findByIdentifier(id));
            vp.setViewPageOptions(new ViewOptions().getOutgoingOptions());

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
            IUser user = ses.getUser();
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = outDomain.composeNew((User) user);
            } else {
                OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
                entity = outgoingDAO.findByIdentifier(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = outDomain.getOutcome(entity);
            outcome.setFSID(getWebFormData().getFormSesId());
            outcome.addPayload(getActionBar(ses, entity, outDomain));
            outcome.addPayload("employees", emps);

            if (!isNew) {
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
    @Path("startApproving")
    public Response startApproving(ActionPayload<Outgoing, Object> action) {
        _Session ses = getSession();
        try {
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.fillFromDto(action.getTarget(), new ValidationToStartApprove(), getWebFormData().getFormSesId());
            if (entity.getApprovalStatus() == ApprovalStatusType.REGISTERED) {
                entity.setApprovalStatus(ApprovalStatusType.DRAFT);
                entity.setApprovalSchema(ApprovalSchemaType.REJECT_IF_NO);
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
    @Path("acceptApprovalBlock")
    public Response acceptApprovalBlock(ActionPayload<Outgoing, Object> action) {
        try {
            _Session ses = getSession();
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.getEntity(action.getTarget());
            domain.acceptApprovalBlock(entity, ses.getUser());
            domain.superUpdate(entity);

            if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED) {
                if (entity.getApprovalResult() == ApprovalResultType.ACCEPTED) {
                    new Messages(getAppEnv()).notifyOfAccepting(entity, entity.getTitle());
                }
            }
            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());

            Outcome outcome = domain.getOutcome(entity);
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
    @Path("declineApprovalBlock")
    public Response declineApprovalBlock(ActionPayload<Outgoing, String> action) {
        try {
            _Session ses = getSession();
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.getEntity(action.getTarget());
            domain.declineApprovalBlock(entity, ses.getUser(), action.getPayload());
            domain.superUpdate(entity);

            new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED) {
                if (entity.getApprovalResult() == ApprovalResultType.REJECTED) {
                    new Messages(getAppEnv()).notifyOfRejecting(entity, entity.getTitle());
                }
            }

            Outcome outcome = domain.getOutcome(entity);
            outcome.setTitle("declineApprovalBlock");
            outcome.setMessage("declineApprovalBlock");

            if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED && entity.getApprovalResult() == ApprovalResultType.REJECTED) {
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
    @Path("register")
    public Response register(ActionPayload<Outgoing, Object> action) {
        try {
            _Session ses = getSession();
            OutgoingDomain domain = new OutgoingDomain(ses);
            Outgoing entity = domain.register(action.getTarget(), new EmptyValidation());
            domain.superUpdate(entity);

            //new Messages(getAppEnv()).notifyApprovers(entity, entity.getTitle());
            Outcome outcome = domain.getOutcome(entity);
            outcome.setTitle("outgoing_registered");
            outcome.setMessage("outgoing_registered");

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private ActionBar getActionBar(_Session session, Outgoing entity, OutgoingDomain outDomain) throws DAOException {
        ActionBar actionBar = new ActionBar(session);
        ActionFactory action = new ActionFactory();
        IUser user = session.getUser();

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }

        actionBar.addAction(getApprovalButtonSet(user, entity, ModuleConst.BASE_URL + "api/outgoings/"));

        if (entity.getApprovalStatus() == ApprovalStatusType.FINISHED && user.getRoles().contains("chancellery")) {
            actionBar.addAction(action.registerOutgoing());
        }

        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        //
        if (entity.getApprovalStatus() == ApprovalStatusType.REGISTERED && session.getUser().getRoles().contains("can_sign_outgoing")) {
            actionBar.addAction(new Action().id("sign").caption("eds_test"));
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
