package helpdesk.services.demand;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._ColumnOptions;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;

import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import projects.dao.ProjectDAO;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;
import staff.dao.OrganizationDAO;

@Path("demands")
public class DemandService extends RestProvider {

	public DemandService() {
	}

	/*
	 * Get view
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getViewPage() {
		Outcome outcome = new Outcome();
		_Session session = getSession();
		int pageSize = session.pageSize;
		try {
			_SortParams sortParams = getRequestParameter().getSortParams(_SortParams.desc("regDate"));
			DemandDAO dao = new DemandDAO(session);
			ViewPage<Demand> vp = dao.findViewPage(sortParams, getRequestParameter().getPage(), pageSize);
			
			_ActionBar actionBar = new _ActionBar(session);
			_Action newDocAction = new _Action("add_new", "", "new_demand");
			actionBar.addAction(newDocAction);
			
			_ColumnOptions colOpts = new _ColumnOptions();
			colOpts.add("reg_number", "regNumber", "text", "both", "vw-reg-number");
			colOpts.add("title", "title", "text", "both", "vw-name");
			colOpts.add("", "hasAttachments", "attachment", "", "vw-icon");
			colOpts.add("status", "status", "translate", "", "vw-status");
			colOpts.add("status_date", "statusDate", "date", "", "vw-date");
			colOpts.add("demand_type", "demandType", "localizedName", "", "vw-demand-type");
			colOpts.add("customer", "customer", "localizedName", "", "vw-customer");
			colOpts.add("tags", "tags", "localizedName", "", "vw-tags");
			
			//
			
			outcome.setId("demands");
			outcome.setTitle("demands");
			outcome.addPayload(actionBar);
			outcome.addPayload(colOpts);
			outcome.addPayload(vp);
			
			return Response.ok(outcome).build();
		} catch (DAOException e) {
			logError(e);
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(outcome.setMessage(e.toString())).build();
		}
	}

	/*
	 * delete all selected
	 */
	//    @DELETE
	//    @Produces(MediaType.APPLICATION_JSON)
	//    public Response delete(_Session session, _WebFormData formData) {
	//        DemandDAO dao = new DemandDAO(session);
	//        for (String id : formData.getListOfValuesSilently("ids")) {
	//            Demand m = dao.findById(id);
	//            try {
	//                dao.delete(m);
	//            } catch (SecureException e) {
	//                return Response.status(Response.Status.BAD_REQUEST).build();
	//            }
	//        }
	//        return Response.ok().build();
	//    }

	/*
	 * Get entity by id
	 */
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id) {
		Outcome outcome = new Outcome();
		_Session session = getSession();
		Demand entity;
		try {
			boolean isNew = "new".equals(id);
			if (isNew) {
				entity = new Demand();
				entity.setAuthor(session.getUser());
				entity.setTitle("");
				entity.setBody("");
				entity.setStatus(DemandStatusType.DRAFT);
				try {
					DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
					entity.setDemandType(demandTypeDAO.findByName("bug"));
				} catch (DAOException e) {
					Server.logger.errorLogEntry(e);
				}
			} else {
				DemandDAO dao = new DemandDAO(session);
				entity = dao.findById(id);
			}

			outcome.setId(id);
			outcome.addPayload(entity);
			outcome.addPayload(getActionBar(session, entity));
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getRequestParameter().getFormSesId());
			if (!isNew) {
				outcome.addPayload(new ACL(entity));
			}
			
			return Response.ok(outcome).build();
		} catch (DAOException e) {
			logError(e);
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(outcome.setMessage(e.toString())).build();
		}
	}

	/*
	 * Save entity
	 */
	@POST
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(@PathParam("id") String id, Demand demandForm) {
		_Session session = getSession();

		_Validation validation = validate(demandForm);
		if (validation.hasError()) {
			// return error
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(validation).build();
		}

		Demand demand;
		try {
			ProjectDAO projectDAO = new ProjectDAO(session);
			OrganizationDAO organizationDAO = new OrganizationDAO(session);
			DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
			DemandDAO demandDAO = new DemandDAO(session);

			boolean isNew = "new".equals(id);
			if (isNew) {
				demand = new Demand();
			} else {
				demand = demandDAO.findById(id);
			}

			demand.setTitle(demandForm.getTitle());
			if (demandForm.getCustomer() != null) {
				demand.setCustomer(organizationDAO.findById(demandForm.getCustomer().getId()));
			} else {
				demand.setCustomer(null);
			}
			DemandType demandType = demandTypeDAO.findById(demandForm.getDemandType().getId());
			demand.setDemandType(demandType);
			if (demandForm.getProject() != null) {
				demand.setProject(projectDAO.findById(demandForm.getProject().getId()));
			} else {
				demand.setProject(null);
			}
			demand.setStatus(demandForm.getStatus());
			demand.setStatusDate(demandForm.getStatusDate());
			demand.setBody(demandForm.getBody());
			demand.setTags(demandForm.getTags());
			demand.setAttachments(getActualAttachments(demand.getAttachments()));

			if (isNew) {
				RegNum rn = new RegNum();
				demand.setRegNumber(demandType.getPrefix() + rn.getRegNumber(demandType.prefix));
				IUser<Long> user = session.getUser();
				demand.addReaderEditor(user);
				demand = demandDAO.add(demand);
			} else {
				demand = demandDAO.update(demand);
			}
		} catch (SecureException | DAOException e) {
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		}

		Outcome outcome = new Outcome();
		outcome.setId(id);
		outcome.addPayload(demand);

		return Response.ok(outcome).build();
	}

	/*
	 * Delete entity
	 */
	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") String id) {
		_Session ses = getSession();
		try {
			DemandDAO dao = new DemandDAO(ses);
			Demand entity = dao.findById(id);
			if (entity != null) {
				try {
					dao.delete(entity);
				} catch (SecureException | DAOException e) {
					return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
				}
			}
			return Response.noContent().build();
		} catch (DAOException e) {
			logError(e);
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
			DemandDAO demandDAO = new DemandDAO(getSession());
			Demand demand = demandDAO.findById(id);
			
			return getAttachment(demand, attachId);
		} catch (DAOException e) {
			logError(e);
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		}
	}

	/*
	 * Action bar
	 */
	private _ActionBar getActionBar(_Session session, Demand entity) {
		_ActionBar actionBar = new _ActionBar(session);
		// if (incoming.isEditable()) {
		actionBar.addAction(new _Action("close", "", _ActionType.CLOSE));
		actionBar.addAction(new _Action("save_close", "", _ActionType.SAVE_AND_CLOSE));
		if (!entity.isNew() && entity.isEditable()) {
			actionBar.addAction(new _Action("delete_document", "", _ActionType.DELETE_DOCUMENT));
		}
		// }

		return actionBar;
	}

	/*
	 * Validate entity
	 */
	private _Validation validate(Demand demandForm) {
		_Validation ve = new _Validation();

		if (demandForm.getTitle() == null || demandForm.getTitle().isEmpty()) {
			ve.addError("title", "required", "field_is_empty");
		}
		if (demandForm.getDemandType() == null) {
			ve.addError("demandType", "required", "field_is_empty");
		}

		return ve;
	}

	@Override
	public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
		sd.setName(getClass().getName());
		ServiceMethod m = new ServiceMethod();
		m.setMethod(HttpMethod.GET);
		m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/demands");
		sd.addMethod(m);
		return sd;
	}
}
