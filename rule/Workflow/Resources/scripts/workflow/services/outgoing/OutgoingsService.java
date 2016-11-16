package workflow.services.outgoing;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._ColumnOptions;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import workflow.dao.OutgoingDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("outgoings")
public class OutgoingsService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getView(@Context UriInfo uriInfo, @DefaultValue("1") @QueryParam("page") int pageNum) {
        _Session session = getSession();
        int pageSize = session.pageSize;

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
        colOpts.add("", "attachment", "attachment", "", "vw-icon");
        colOpts.add("applied_reg_date", "appliedRegDate", "date", "both", "vw-reg-date");
        colOpts.add("doc_language", "docLanguage", "localizedName", "both", "vw-name");
        colOpts.add("doc_type", "docType", "localizedName", "both", "vw-doc-type");
        colOpts.add("recipient", "recipient", "localizedName", "both", "vw-recipient");
        colOpts.add("summary", "summary", "text", "", "vw-summary");

        Outcome outcome = new Outcome();
        outcome.setId("outgoings");
        outcome.setTitle("outgoing_documents");
        outcome.addPayload(actionBar);
        outcome.addPayload(colOpts);
        outcome.addPayload(vp);

        return Response.ok(outcome).build();
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
