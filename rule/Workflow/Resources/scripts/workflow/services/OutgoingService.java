package workflow.services;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;

import administrator.model.User;
import workflow.dao.OutgoingDAO;
import workflow.domain.impl.OutgoingDomain;
import workflow.model.Outgoing;

@Path("outgoings")
public class OutgoingService extends RestProvider {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getView() {
		_Session session = getSession();
		int pageSize = session.pageSize;
		SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));
		String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
		List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
		try {
			OutgoingDAO dao = new OutgoingDAO(session);
			ViewPage vp = dao.findViewPage(sortParams, getWebFormData().getPage(), pageSize);

			//
			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(new _Action("add_new", "", "new_outgoing"));
			actionBar.addAction(new _Action("", "", "refresh", "fa fa-refresh", ""));
			// actionBar.addAction(new _Action("del_document", "",
			// _ActionType.DELETE_DOCUMENT));

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
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id) {
		_Session ses = getSession();
		Outgoing entity;
		OutgoingDomain outDomain;
		try {
			boolean isNew = "new".equals(id);
			if (isNew) {
				entity = new Outgoing();
				outDomain = new OutgoingDomain(entity);
				outDomain.composeNew((User) ses.getUser());
			} else {
				OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
				entity = outgoingDAO.findById(id);
				outDomain = new OutgoingDomain(entity);
			}

			Outcome outcome = outDomain.getOutcome();
			outcome.addPayload(getActionBar(ses, entity));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());

			return Response.ok(outcome).build();
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Outgoing dto) {
		dto.setId(null);
		return save(dto);
	}

	@PUT
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") String id, Outgoing dto) {
		dto.setId(UUID.fromString(id));
		return save(dto);
	}

	public Response save(Outgoing dto) {
		_Session ses = getSession();
		Outgoing entity;
		OutgoingDomain outDomain;

		try {
			validate(dto);

			OutgoingDAO outgoingDAO = new OutgoingDAO(ses);

			if (dto.isNew()) {
				entity = new Outgoing();
			} else {
				entity = outgoingDAO.findById(dto.getId());
			}

			dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

			outDomain = new OutgoingDomain(entity);
			outDomain.fillFromDto((User) ses.getUser(), dto);

			if (dto.isNew()) {
				RegNum rn = new RegNum();
				entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
				entity = outgoingDAO.add(entity);
			} else {
				entity = outgoingDAO.update(entity);
			}

			entity = outgoingDAO.findById(entity.getId());
			outDomain = new OutgoingDomain(entity);

			return Response.ok(outDomain.getOutcome()).build();
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
			OutgoingDAO dao = new OutgoingDAO(ses);
			Outgoing entity = dao.findById(id);
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
			Outgoing entity = dao.findById(id);

			return getAttachment(entity, attachId);
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	private _ActionBar getActionBar(_Session session, Outgoing entity) {
		_ActionBar actionBar = new _ActionBar(session);

		actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
		actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
		actionBar.addAction(new _Action("sign", "", "sign"));
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(new _Action("delete", "", _ActionType.DELETE_DOCUMENT));
		}

		return actionBar;
	}

	private void validate(Outgoing outgoingForm) throws _Validation.VException {
		_Validation ve = new _Validation();

		if (outgoingForm.getTitle() == null || outgoingForm.getTitle().isEmpty()) {
			ve.addError("title", "required", "field_is_empty");
		}

		ve.assertValid();
	}

}
