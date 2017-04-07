package workflow.services;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.outline._Outline;
import com.exponentus.scripting.outline._OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedList;

@Path("navigator")
public class NavigatorService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNav() {
        Collection<IOutcomeObject> list = new LinkedList<>();

        _Outline odo = new _Outline("", "org_documents");
        odo.addEntry(new _OutlineEntry("incoming_documents", "", "fa fa-inbox", "incomings", "incomings"));
        odo.addEntry(new _OutlineEntry("outgoing_documents", "", "fa fa-envelope-o", "outgoings", "outgoings"));
        odo.addEntry(new _OutlineEntry("office_memo_plural", "", "fa fa-pencil-square-o", "office-memos", "office-memos"));

        list.add(odo);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
