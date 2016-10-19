package workflow.services.incoming;

import com.exponentus.dataengine.jpa.ViewPage;
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
import workflow.dao.IncomingDAO;

import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.HashMap;
import java.util.Map;

@Path("incomings")
public class IncomingsService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@Context UriInfo uriInfo) {
        Map<String, Object> payload = new HashMap<>();

        _Session session = getSession();
        _WebFormData formData = new _WebFormData(uriInfo.getQueryParameters(), httpRequest.getHeader("referer"));
        int pageSize = session.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);

        IncomingDAO incomingDAO = new IncomingDAO(session);
        ViewPage vp = incomingDAO.findViewPage(pageNum, pageSize);

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
        colOpts.add("sender", "sender", "localizedName", "both", "vw-sender");
        colOpts.add("sender_applied_reg_date", "senderAppliedRegDate", "date", "both", "vw-date");
        colOpts.add("summary", "summary", "text", "", "vw-summary");

        payload.put("actionBar", actionBar);
        payload.put("columnOptions", colOpts);
        payload.put("view", vp);
        payload.put("title", "incoming_documents");

        Outcome outcome = new Outcome();
        outcome.setId("incomings");
        outcome.setPayload(payload);

        return Response.ok(outcome).build();
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/incomings");
        sd.addMethod(m);
        return sd;
    }
}
