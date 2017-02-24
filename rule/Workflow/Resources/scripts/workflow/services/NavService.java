package workflow.services;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting.outline._Outline;
import com.exponentus.scripting.outline._OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedList;

@Path("navigator")
public class NavService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        Collection<IOutcomeObject> list = new LinkedList<>();

        _Outline common_outline = new _Outline("workflow", "common");
        common_outline.addEntry(new _OutlineEntry("office_memo_plural", "", "office-memos", "office-memos"));
        common_outline.addEntry(new _OutlineEntry("incoming_documents", "", "incomings", "incomings"));
        common_outline.addEntry(new _OutlineEntry("outgoing_documents", "", "outgoings", "outgoings"));

        list.add(common_outline);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

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
