package workflow.services.officememo;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IAppFile;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.IUser;

import workflow.dao.ApprovalDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.model.OfficeMemo;

@Path("office-memos/{id}")
public class OfficeMemoService extends RestProvider {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id) {
		_Session ses = getSession();
		OfficeMemo entity;

		if ("new".equals(id)) {
			entity = new OfficeMemo();
		} else {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
			entity = officeMemoDAO.findById(id);
		}

		Outcome outcome = new Outcome();
		outcome.setId(id);
		outcome.addPayload("officeMemo", entity);
		outcome.addPayload("actionBar", getActionBar(ses, entity));

		return Response.ok(outcome).build();
	}

	@GET
	@Path("attachments/{attachmentId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachId) {

		return Response.ok().build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(@PathParam("id") String id, @QueryParam("fsid") String fsId, OfficeMemo form) {
		_Session ses = getSession();

		_Validation validation = validate(form);
		if (validation.hasError()) {
			// return error
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
		}

		ApprovalDAO approvalDAO = new ApprovalDAO(ses);
		OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(ses);
		OfficeMemo entity;

		boolean isNew = "new".equals(id);
		if (isNew) {
			entity = new OfficeMemo();
		} else {
			entity = officeMemoDAO.findById(id);
		}

		// TODO remove
		if (entity.getRegNumber() == null) {
			entity.setRegNumber("RG-OM-" + Math.random());
		}
		//
		entity.setAppliedRegDate(form.getAppliedRegDate());
		if (form.getApproval() != null) {
			entity.setApproval(approvalDAO.findById(form.getApproval().getId()));
		} else {
			entity.setApproval(null);
		}
		entity.setSummary(form.getSummary());
		entity.setContent(form.getContent());
		entity.setAttachments(getActualAttachments(ses, fsId, entity.getAttachments()));

		try {
			if (isNew) {
				IUser<Long> user = ses.getUser();
				entity.addReaderEditor(user);
				entity = officeMemoDAO.add(entity);
			} else {
				entity = officeMemoDAO.update(entity);
			}

		} catch (SecureException | DAOException e) {
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		}
		return Response.ok(entity).build();
	}

	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") String id) {
		_Session ses = getSession();
		OfficeMemoDAO dao = new OfficeMemoDAO(ses);
		OfficeMemo entity = dao.findById(id);
		if (entity != null) {
			try {
				dao.delete(entity);
			} catch (SecureException e) {
				return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
			}
		}
		return Response.noContent().build();
	}

	private _ActionBar getActionBar(_Session session, OfficeMemo entity) {
		_ActionBar actionBar = new _ActionBar(session);
		// if (incoming.isEditable()) {
		actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
		}
		// }

		return actionBar;
	}

	private _Validation validate(OfficeMemo entity) {
		_Validation ve = new _Validation();

		if (entity.getSummary() == null || entity.getSummary().isEmpty()) {
			ve.addError("title", "required", "field_is_empty");
		}

		return ve;
	}

	// TODO refactor
	protected List<Attachment> getActualAttachments(_Session ses, String fsId, List<Attachment> atts) {
		_FormAttachments formFiles = ses.getFormAttachments(fsId);

		for (TempFile tmpFile : formFiles.getFiles()) {
			Attachment a = (Attachment) tmpFile.convertTo(new Attachment());
			a.setFieldName(a.getDefaultFormName());
			atts.add(a);
		}

		List<TempFile> toDelete = formFiles.getDeletedFiles();
		if (toDelete.size() > 0) {
			for (IAppFile fn : toDelete) {
				atts.remove(fn);
			}
		}

		return atts;
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
