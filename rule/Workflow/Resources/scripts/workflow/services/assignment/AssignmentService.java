package workflow.services.assignment;

import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.model.Assignment;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("assignments")
public class AssignmentService extends RestProvider {

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            Assignment entity;

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Assignment();
                entity.setAuthor(ses.getUser());
                entity.setAppliedAuthor(ses.getUser().getId());

                IncomingDAO incomingDAO = new IncomingDAO(ses);
                entity.setIncoming(incomingDAO.findById(getWebFormData().getValue("incoming")));
            } else {
                AssignmentDAO assignmentDAO = new AssignmentDAO(ses);
                entity = assignmentDAO.findById(id);
            }

            //
            EmployeeDAO empDao = new EmployeeDAO(ses);
            Map<Long, Employee> emps = new HashMap<>();
            List<Long> empIds = new ArrayList<>();
            empIds.add(entity.getAuthor().getId());
            empIds.add(entity.getAppliedAuthor());
            for (Employee e : empDao.findAllByUserIds(empIds)) {
                emps.put(e.getUserID(), e);
            }
            //

            Outcome outcome = new Outcome();
            outcome.setId(id);
            outcome.addPayload(entity);
            outcome.addPayload(getActionBar(ses, entity));
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload("incoming", entity.getIncoming());
            if (entity.getParent() != null) {
                outcome.addPayload("parent", entity.getParent());
            }
            if (!isNew) {
                outcome.addPayload(new ACL(entity));
            }

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
    }

    @POST
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response save(@PathParam("id") String id, Assignment assignmentForm) {
        _Session ses = getSession();

        _Validation validation = validate(assignmentForm);
        if (validation.hasError()) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
        }
        Assignment entity;

        try {
            AssignmentDAO assignmentDAO = new AssignmentDAO(ses);

            boolean isNew = "new".equals(id);
            if (isNew) {
                entity = new Assignment();
                entity.setIncoming(assignmentForm.getIncoming());
            } else {
                entity = assignmentDAO.findById(id);
            }

            //
            entity.setTitle(assignmentForm.getTitle());
            entity.setBody(assignmentForm.getBody());
            entity.setAppliedAuthor(assignmentForm.getAppliedAuthor());
            entity.setObservers(assignmentForm.getObservers());
            entity.setAttachments(getActualAttachments(entity.getAttachments()));

            if (isNew) {
                IUser<Long> user = ses.getUser();
                entity.addReaderEditor(user);
                entity = assignmentDAO.add(entity);
            } else {
                entity = assignmentDAO.update(entity);
            }

        } catch (SecureException | DAOException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        try {
            _Session ses = getSession();
            AssignmentDAO dao = new AssignmentDAO(ses);
            Assignment entity = dao.findById(id);
            if (entity != null) {
                dao.delete(entity);
            }
            return Response.noContent().build();
        } catch (SecureException | DAOException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
    }

    /*
     * Get entity attachment or _thumbnail
     */
    @GET
    @Path("{id}/attachments/{attachId}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        try {
            AssignmentDAO dao = new AssignmentDAO(getSession());
            Assignment entity = dao.findById(id);

            return getAttachment(entity, attachId);
        } catch (DAOException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
    }

    @DELETE
    @Path("{id}/attachments/{attachmentId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {
        return deleteAttachmentFromSessionFormAttachments(attachmentId);
    }

    /*
     *
     */
    private _ActionBar getActionBar(_Session session, Assignment entity) {
        _ActionBar actionBar = new _ActionBar(session);

        actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
        if (entity.isNew() || entity.isEditable()) {
            actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(new _Action("delete_document", "", _ActionType.DELETE_DOCUMENT));
        }

        return actionBar;
    }

    private _Validation validate(Assignment assignmentForm) {
        _Validation ve = new _Validation();

        if (assignmentForm.getTitle() == null || assignmentForm.getTitle().isEmpty()) {
            ve.addError("title", "required", "field_is_empty");
        }

        return ve;
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
