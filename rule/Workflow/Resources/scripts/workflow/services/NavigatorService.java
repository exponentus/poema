package workflow.services;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.outline._Outline;
import com.exponentus.scripting.outline._OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;
import workflow.init.AppConst;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedList;

@Path("navigator")
@Produces(MediaType.APPLICATION_JSON)
public class NavigatorService extends RestProvider {

    @GET
    public Response getNav() {
        Collection<IOutcomeObject> list = new LinkedList<>();

        _Outline t = new _Outline("", "wf_assignment");
        t.addEntry(new _OutlineEntry("assignments_all", "", "fa fa-tasks", "assignments_all", AppConst.BASE_URL + "assignments"));
        t.addEntry(new _OutlineEntry("assignments_my", "", "fa fa-pencil", "assignments_my", AppConst.BASE_URL + "assignments/my"));
        t.addEntry(new _OutlineEntry("assignments_inbox", "", "fa fa-inbox", "assignments_inbox", AppConst.BASE_URL + "assignments/inbox"));

        _Outline odo = new _Outline("", "org_documents");
        odo.addEntry(new _OutlineEntry("incoming_documents", "", "fa fa-file-text-o", "incomings", AppConst.BASE_URL + "incomings"));
        odo.addEntry(new _OutlineEntry("outgoing_documents", "", "fa fa-file-text-o", "outgoings", AppConst.BASE_URL + "outgoings"));
        odo.addEntry(new _OutlineEntry("office_memo_plural", "", "fa fa-file-text-o", "office-memos", AppConst.BASE_URL + "office-memos"));

        list.add(t);
        list.add(odo);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
