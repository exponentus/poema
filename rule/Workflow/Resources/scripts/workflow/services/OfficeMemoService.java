package workflow.services;

import administrator.model.User;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.OfficeMemoDAO;
import workflow.domain.impl.OfficeMemoDomain;
import workflow.model.OfficeMemo;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("office-memos")
public class OfficeMemoService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getView() {
        _Session session = getSession();
        int pageSize = session.pageSize;
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));

        try {
            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(session);
            ViewPage vp = officeMemoDAO.findViewPage(sortParams, getWebFormData().getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(new _Action("add_new", "", "new_office_memo"));
            actionBar.addAction(new _Action("", "", "refresh", "fa fa-refresh", ""));
            // actionBar.addAction(new _Action("del_document", "", _ActionType.DELETE_DOCUMENT));

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<UUID, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getId, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = new Outcome();
            outcome.setId("office-memo");
            outcome.setTitle("office_memo_plural");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            outcome.addPayload("employees", emps);

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        OfficeMemo entity;
        OfficeMemoDomain omd;
        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(ses);
            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new OfficeMemo();
                omd = new OfficeMemoDomain(entity);
                omd.composeNew((User) ses.getUser(), employeeDAO.findByUser(ses.getUser()));
            } else {
                OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
                entity = officeMemoDAO.findById(id);
                omd = new OfficeMemoDomain(entity);
            }

            EmployeeDAO empDao = new EmployeeDAO(ses);

            Outcome outcome = omd.getOutcome();
            outcome.addPayload("employees", empDao.findAll(false).getResult());
            outcome.addPayload(getActionBar(ses, entity, omd));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(OfficeMemo dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, OfficeMemo dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(OfficeMemo dto) {
        _Session ses = getSession();

        try {
            validate(dto);

            EmployeeDAO empDao = new EmployeeDAO(ses);
            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
            OfficeMemo entity;

            if (dto.isNew()) {
                entity = new OfficeMemo();
            } else {
                entity = officeMemoDAO.findById(dto.getId());
            }

            dto.setAppliedAuthor(empDao.findById(dto.getAppliedAuthor().getId()));
            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            OfficeMemoDomain omd = new OfficeMemoDomain(entity);
            omd.fillFromDto(empDao.findByUser(ses.getUser()), dto);

            if (dto.isNew()) {
                RegNum rn = new RegNum();
                entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
                entity = officeMemoDAO.add(entity, rn);
            } else {
                entity = officeMemoDAO.update(entity);
            }

            return Response.ok(omd.getOutcome()).build();
        } catch (SecureException | DAOException e) {
            return responseException(e);
        } catch (_Validation.VException e) {
            return responseValidationError(e.getValidation());
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        try {
            OfficeMemoDAO dao = new OfficeMemoDAO(ses);
            OfficeMemo entity = dao.findById(id);
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
            OfficeMemoDAO dao = new OfficeMemoDAO(getSession());
            OfficeMemo entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/actions/startApproving")
    public Response startApproving(@PathParam("id") String id) {
        try {
            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
            OfficeMemo om = officeMemoDAO.findById(id);
            OfficeMemoDomain omd = new OfficeMemoDomain(om);

            omd.startApproving();

            officeMemoDAO.update(om);

            Outcome outcome = omd.getOutcome();
            outcome.setTitle("approving_started");
            outcome.setMessage("approving_started");
            outcome.addPayload("result", "approving_started");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/actions/acceptApprovalBlock")
    public Response acceptApprovalBlock(@PathParam("id") String id) {
        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(getSession());
            Employee employee = employeeDAO.findByUser(getSession().getUser());

            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
            OfficeMemo om = officeMemoDAO.findById(id);
            OfficeMemoDomain omd = new OfficeMemoDomain(om);

            omd.acceptApprovalBlock(employee);

            officeMemoDAO.update(om, false);

            Outcome outcome = omd.getOutcome();
            outcome.setTitle("acceptApprovalBlock");
            outcome.setMessage("acceptApprovalBlock");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    @POST
    @Path("{id}/actions/declineApprovalBlock")
    public Response declineApprovalBlock(@PathParam("id") String id) {
        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(getSession());
            Employee employee = employeeDAO.findByUser(getSession().getUser());

            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
            OfficeMemo om = officeMemoDAO.findById(id);
            OfficeMemoDomain omd = new OfficeMemoDomain(om);

            String decisionComment = getWebFormData().getValueSilently("comment");

            omd.declineApprovalBlock(employee, decisionComment);

            officeMemoDAO.update(om, false);

            Outcome outcome = omd.getOutcome();
            outcome.setTitle("declineApprovalBlock");
            outcome.setMessage("declineApprovalBlock");

            return Response.ok(outcome).build();
        } catch (DAOException | SecureException e) {
            return responseException(e);
        }
    }

    private _ActionBar getActionBar(_Session session, OfficeMemo entity, OfficeMemoDomain omd) throws DAOException {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));

        if (entity.isEditable()) {
            actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        }

        if (omd.approvalCanBeStarted()) {
            actionBar.addAction(new _Action("start_approving", "", "start_approving"));
        }

        EmployeeDAO employeeDAO = new EmployeeDAO(getSession());

        if (omd.employeeCanDoDecisionApproval(employeeDAO.findByUser(session.getUser()))) {
            actionBar.addAction(new _Action("accept", "", "accept_approval_block"));
            actionBar.addAction(new _Action("decline", "", "decline_approval_block"));
        }

        actionBar.addAction(new _Action("sign", "", "sign"));

        if (omd.documentCanBeDeleted()) {
            actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private void validate(OfficeMemo entity) throws _Validation.VException {
        _Validation ve = new _Validation();

        if (entity.getTitle() == null || entity.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }
        if (entity.getAppliedAuthor() == null) {
            ve.addError("appliedAuthor", "required", "field_is_empty");
        }
        if (entity.getRecipient() == null) {
            ve.addError("recipient", "required", "field_is_empty");
        }

        ve.assertValid();
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping());
        sd.addMethod(m);
        return sd;
    }
}
