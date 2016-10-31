package workflow.services.incoming;

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

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.ACL;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IAppFile;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
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

import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.OrganizationDAO;
import workflow.dao.IncomingDAO;
import workflow.dao.OutgoingDAO;
import workflow.model.Incoming;

@Path("incomings/{id}")
public class IncomingService extends RestProvider {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id, @QueryParam(EnvConst.FSID_FIELD_NAME) String fsId) {
		_Session ses = getSession();
		Incoming entity;

		boolean isNew = "new".equals(id);
		if (isNew) {
			entity = new Incoming();
		} else {
			IncomingDAO incomingDAO = new IncomingDAO(ses);
			entity = incomingDAO.findById(id);
		}

		Outcome outcome = new Outcome();
		outcome.setId(id);
		outcome.addPayload(entity);
		outcome.addPayload(getActionBar(ses, entity));
		outcome.addPayload("fsId", fsId);
		if (!isNew) {
			outcome.addPayload(new ACL(entity));
		}

		return Response.ok(outcome).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(@PathParam("id") String id, @QueryParam(EnvConst.FSID_FIELD_NAME) String fsId, Incoming incomingForm) {
		_Session ses = getSession();

		_Validation validation = validate(incomingForm);
		if (validation.hasError()) {
			// return error
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
		}

		OrganizationDAO organizationDAO = new OrganizationDAO(ses);
		DocumentTypeDAO documentTypeDAO = new DocumentTypeDAO(ses);
		DocumentLanguageDAO documentLanguageDAO = new DocumentLanguageDAO(ses);
		OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
		IncomingDAO incomingDAO = new IncomingDAO(ses);
		Incoming entity;

		boolean isNew = "new".equals(id);
		if (isNew) {
			entity = new Incoming();
		} else {
			entity = incomingDAO.findById(id);
		}

		// TODO remove
		if (entity.getRegNumber() == null) {
			entity.setRegNumber("RG-I-" + Math.random());
		}
		//
		entity.setTitle(incomingForm.getTitle());
		entity.setAppliedRegDate(incomingForm.getAppliedRegDate());
		if (incomingForm.getDocLanguage() != null) {
			entity.setDocLanguage(documentLanguageDAO.findById(incomingForm.getDocLanguage().getId()));
		} else {
			entity.setDocLanguage(null);
		}
		if (incomingForm.getDocType() != null) {
			entity.setDocType(documentTypeDAO.findById(incomingForm.getDocType().getId()));
		} else {
			entity.setDocType(null);
		}
		if (incomingForm.getSender() != null) {
			entity.setSender(organizationDAO.findById(incomingForm.getSender().getId()));
		} else {
			entity.setSender(null);
		}
		if (incomingForm.getResponseTo() != null) {
			entity.setResponseTo(outgoingDAO.findById(incomingForm.getResponseTo().getId()));
		} else {
			entity.setResponseTo(null);
		}
		entity.setSenderRegNumber(incomingForm.getSenderRegNumber());
		entity.setSenderAppliedRegDate(incomingForm.getSenderAppliedRegDate());
		entity.setBody(incomingForm.getBody());

		// entity.setControl(incomingForm.getControl());
		entity.setAttachments(getActualAttachments(ses, fsId, entity.getAttachments()));

		try {
			if (isNew) {
				IUser<Long> user = ses.getUser();
				entity.addReaderEditor(user);
				entity = incomingDAO.add(entity);
			} else {
				entity = incomingDAO.update(entity);
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
		IncomingDAO dao = new IncomingDAO(ses);
		Incoming entity = dao.findById(id);
		if (entity != null) {
			try {
				dao.delete(entity);
			} catch (SecureException e) {
				return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
			}
		}
		return Response.noContent().build();
	}

	/*
	 * Attachment
	 */
	@GET
	@Path("attachments/{attachmentId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {

		// doGetAttachment(session, formData, entity);

		return Response.ok().build();
	}

	@DELETE
	@Path("attachments/{attachmentId}")
	public Response deleteAttachment(@PathParam("id") String incomingId, @PathParam("attachmentId") String attachmentId) {
		_Session ses = getSession();

		IncomingDAO dao = new IncomingDAO(ses);
		Incoming entity = dao.findById(incomingId);

		AttachmentDAO attachmentDAO = new AttachmentDAO(ses);
		Attachment attachment = attachmentDAO.findById(attachmentId);
		entity.getAttachments().remove(attachment);

		try {
			dao.update(entity);
		} catch (SecureException | DAOException e) {
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		}
		return Response.noContent().build();
	}

	/*
	 *
	 */
	private _ActionBar getActionBar(_Session session, Incoming entity) {
		_ActionBar actionBar = new _ActionBar(session);
		// if (incoming.isEditable()) {
		actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
		}
		// }

		return actionBar;
	}

	private _Validation validate(Incoming incomingForm) {
		_Validation ve = new _Validation();

		if (incomingForm.getTitle() == null || incomingForm.getTitle().isEmpty()) {
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
