package workflow.services;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.LifeCycle;
import com.exponentus.common.service.EntityService;
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
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.IncomingDAO;
import workflow.dao.filter.IncomingFilter;
import workflow.domain.IncomingDomain;
import workflow.init.AppConst;
import workflow.model.Incoming;
import workflow.other.Messages;
import workflow.ui.ActionFactory;

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

    private ActionFactory action = new ActionFactory();

    @GET
    public Response getView() {
        _Session session = getSession();
        WebFormData params = getWebFormData();

        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        IncomingFilter filter = new IncomingFilter(params);

        try {
            IncomingDAO incomingDAO = new IncomingDAO(session);
            ViewPage vp = incomingDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newIncoming.caption("new"));
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("incomings");
            outcome.setTitle("incoming_documents");
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
            IncomingDAO incomingDAO = new IncomingDAO(ses);
            ViewPage vp = incomingDAO.findIncomingResponsesViewPage(incomingDAO.findByIdentefier(id));

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
        Incoming entity;
        try {
            IncomingDomain inDomain = new IncomingDomain(ses);
            IUser<Long> user = ses.getUser();
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = inDomain.composeNew(user);
            } else {
                IncomingDAO incomingDAO = new IncomingDAO(ses);
                entity = incomingDAO.findByIdentefier(id);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = inDomain.getOutcome(entity);
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(ses, entity, inDomain));
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

    private _ActionBar getActionBar(_Session session, Incoming entity, IncomingDomain domain) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(action.close);
        if (entity.isEditable()) {
            actionBar.addAction(action.saveAndClose);
        }
        if (domain.canCreateAssignment(entity, (User) session.getUser())) {
            actionBar.addAction(new Action(ActionType.LINK).caption("new_assignment")
                    .url(AppConst.BASE_URL + "assignments/new?incoming=" + entity.getIdentifier()));
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

            if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
                ve.addError("title", "required", "field_is_empty");
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
