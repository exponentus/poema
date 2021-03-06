package workflow.services;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.actions.constants.ActionType;
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
import workflow.dao.IncomingDAO;
import workflow.dao.filter.IncomingFilter;
import workflow.domain.IncomingDomain;
import workflow.init.ModuleConst;
import workflow.model.Incoming;
import workflow.other.Messages;
import workflow.ui.ActionFactory;
import workflow.ui.ViewOptions;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("incomings")
@Produces(MediaType.APPLICATION_JSON)
public class IncomingService extends EntityService<Incoming, IncomingDomain> {

    @GET
    public Response getViewPage() {
        _Session session = getSession();
        WebFormData params = getWebFormData();

        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        IncomingFilter filter = new IncomingFilter(params);

        try {
            IncomingDAO incomingDAO = new IncomingDAO(session);
            ViewPage vp = incomingDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getIncomingOptions());
            vp.setFilter(viewOptions.getIncomingFilter(session));

            ActionFactory action = new ActionFactory();
            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(action.newIncoming().caption("new"));
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("incomings");
            outcome.setTitle("incoming_documents");
            outcome.addPayload(getDefaultViewActionBar());
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
            Outcome outcome = new Outcome();
            if (id != null && !"null".equals(id)) {
                IncomingDAO incomingDAO = new IncomingDAO(ses);
                ViewPage vp = incomingDAO.findIncomingResponsesViewPage(incomingDAO.findById(id));
                vp.setViewPageOptions(new ViewOptions().getIncomingOptions());
                outcome.addPayload(vp);
            }
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        Incoming entity;
        try {
            IncomingDomain inDomain = new IncomingDomain(ses);
            IUser user = ses.getUser();
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = inDomain.composeNew(user);
            } else {
                IncomingDAO incomingDAO = new IncomingDAO(ses);
                entity = incomingDAO.findById(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = inDomain.getOutcome(entity);
            outcome.setFSID(getWebFormData().getFormSesId());
            outcome.addPayload(getActionBar(ses, entity, inDomain));
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
    public Response saveForm(Incoming dto) {
        try {
            IncomingDomain domain = new IncomingDomain(getSession());
            Incoming entity = domain.fillFromDto(dto, new Validation(), getWebFormData().getFormSesId());
            domain.save(entity);
            new Messages(getAppEnv()).notifyAddressee(entity);
            Outcome outcome = domain.getOutcome(entity);

            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private ActionBar getActionBar(_Session session, Incoming entity, IncomingDomain domain) {
        ActionBar actionBar = new ActionBar(session);
        ActionFactory action = new ActionFactory();

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }
        if (domain.canCreateAssignment(entity, (User) session.getUser())) {
            actionBar.addAction(new Action(ActionType.LINK).caption("new_assignment")
                    .url(ModuleConst.BASE_URL + "assignments/new?incoming=" + entity.getIdentifier()));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(action.deleteDocument);
        }

        return actionBar;
    }

    private class Validation implements IValidation<Incoming> {

        @Override
        public void check(Incoming dto) throws DTOException {
            DTOException ve = new DTOException();

            if (dto.getBody() == null || dto.getBody().isEmpty()) {
                ve.addError("body", "required", "field_is_empty");
            } else if (dto.getBody().length() > 5000) {
                ve.addError("body", "maxlen:5000", "field_is_too_long");
            }

            if (dto.getSender() == null) {
                ve.addError("sender", "required", "field_is_empty");
            }
            if (dto.getAddressee() == null) {
                ve.addError("addressee", "required", "field_is_empty");
            }
            if (dto.getDocLanguage() == null) {
                ve.addError("docLanguage", "required", "field_is_empty");
            }
            if (dto.getSenderRegNumber() == null || dto.getSenderRegNumber().isEmpty()) {
                ve.addError("senderRegNumber", "required", "field_is_empty");
            }
            if (dto.getSenderAppliedRegDate() == null) {
                ve.addError("senderAppliedRegDate", "required", "field_is_empty");
            }
            if (dto.getDocLanguage() == null) {
                ve.addError("docLanguage", "required", "field_is_empty");
            }
            if (dto.getDocType() == null) {
                ve.addError("docType", "required", "field_is_empty");
            }
            if (dto.getDocSubject() == null) {
                ve.addError("docSubject", "required", "field_is_empty");
            }
            if (ve.hasError()) {
                throw ve;
            }
        }
    }
}
