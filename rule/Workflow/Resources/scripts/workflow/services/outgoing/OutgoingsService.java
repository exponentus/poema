package workflow.services.outgoing;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._ColumnOptions;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import workflow.dao.OutgoingDAO;
import workflow.model.Outgoing;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.HashMap;
import java.util.Map;

@Path("outgoings")
public class OutgoingsService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getView(@Context UriInfo uriInfo) {
        Map<String, Object> payload = new HashMap<>();

        _Session session = getSession();
        _WebFormData formData = new _WebFormData(uriInfo.getQueryParameters(), httpRequest.getHeader("referer"));
        int pageSize = session.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);

        OutgoingDAO dao = new OutgoingDAO(session);
        ViewPage vp = dao.findViewPage(pageNum, pageSize);

        //
        _ActionBar actionBar = new _ActionBar(session);
        _Action newDocAction = new _Action("add_new", "", "new_incoming");
        newDocAction.setURL("new");
        actionBar.addAction(newDocAction);
        actionBar.addAction(new _Action("del_document", "", _ActionType.DELETE_DOCUMENT));

        // column options
        _ColumnOptions colOpts = new _ColumnOptions();
        colOpts.add("reg_number", "regNumber", "text", "both", "vw-reg-number");
        colOpts.add("", "attachment", "icon", "", "vw-icon");
        colOpts.add("applied_reg_date", "appliedRegDate", "date", "both", "vw-reg-date");
        colOpts.add("doc_language", "docLanguage", "localizedName", "both", "vw-name");
        colOpts.add("doc_type", "docType", "localizedName", "both", "vw-doc-type");
        colOpts.add("recipient", "recipient", "localizedName", "both", "vw-recipient");
        colOpts.add("summary", "summary", "text", "", "vw-summary");

        payload.put("actionBar", actionBar);
        payload.put("columnOptions", colOpts);
        payload.put("view", vp);
        payload.put("title", "outgoing_documents");

        Outcome outcome = new Outcome();
        outcome.setId("outgoings");
        outcome.setPayload(payload);

        return Response.ok(outcome).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
        Outgoing entity = outgoingDAO.findById(id);
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Outgoing incoming) {
        _Session ses = getSession();
        OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
        Outgoing entity;
        try {
            entity = outgoingDAO.add(incoming);
        } catch (SecureException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Outgoing incoming) {

        System.out.println(incoming.getSummary());

        _Session ses = getSession();
        OutgoingDAO outgoingDAO = new OutgoingDAO(ses);
        Outgoing entity;
        try {
            entity = outgoingDAO.update(incoming);
        } catch (SecureException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        OutgoingDAO dao = new OutgoingDAO(ses);
        Outgoing entity = dao.findById(id);
        if (entity != null) {
            try {
                dao.delete(entity);
            } catch (SecureException e) {
                return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
            }
        }
        return Response.noContent().build();
    }

    @PUT
    @Path("{id}/action1")
    @Produces(MediaType.APPLICATION_JSON)
    public Response doAction(@PathParam("id") String id) {

        System.out.println(id);

        return Response.noContent().build();
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
