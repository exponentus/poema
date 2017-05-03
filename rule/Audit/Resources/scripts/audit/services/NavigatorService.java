package audit.services;

import audit.init.AppConst;
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
@Produces(MediaType.APPLICATION_JSON)
public class NavigatorService extends RestProvider {

    @GET
    public Response getNav() {
        Collection<IOutcomeObject> list = new LinkedList<>();

        _Outline co = new _Outline("observations", "observations");

        co.addEntry(new _OutlineEntry("observations_all", "", "fa fa-file-o", "observations", AppConst.BASE_URL + "observations"));
        co.addEntry(new _OutlineEntry("observations_draft", "", "fa fa-file-o", "observations/s/draft", AppConst.BASE_URL + "observations/s/draft"));
        co.addEntry(new _OutlineEntry("observations_open", "", "fa fa-file-o", "observations/s/open", AppConst.BASE_URL + "observations/s/open"));
        co.addEntry(new _OutlineEntry("observations_waiting", "", "fa fa-file-o", "observations/s/waiting", AppConst.BASE_URL + "observations/s/waiting"));
        co.addEntry(new _OutlineEntry("observations_pending", "", "fa fa-file-o", "observations/s/pending", AppConst.BASE_URL + "observations/s/pending"));
        co.addEntry(new _OutlineEntry("observations_processing", "", "fa fa-file-o", "observations/s/processing", AppConst.BASE_URL + "observations/s/processing"));
        co.addEntry(new _OutlineEntry("observations_completed", "", "fa fa-file-o", "observations/s/completed", AppConst.BASE_URL + "observations/s/completed"));
        co.addEntry(new _OutlineEntry("observations_cancelled", "", "fa fa-file-o", "observations/s/cancelled", AppConst.BASE_URL + "observations/s/cancelled"));

        _Outline po = new _Outline("", "projects");
        po.addEntry(new _OutlineEntry("projects", "", "fa fa-file-o", "projects", AppConst.BASE_URL + "projects"));

        _Outline sto = new _Outline("statistics", "statistics");
        sto.addEntry(new _OutlineEntry("statistics_by_status", "", "fa fa-file-o", "statistics/status", AppConst.BASE_URL + "statistics/status"));
        sto.addEntry(new _OutlineEntry("statistics_by_place", "", "fa fa-file-o", "statistics/place", AppConst.BASE_URL + "statistics/place"));
        sto.addEntry(new _OutlineEntry("statistics_by_inspector", "", "fa fa-file-o", "statistics/inspector", AppConst.BASE_URL + "statistics/inspector"));

        _Outline ro = new _Outline("", "reports");
        ro.addEntry(new _OutlineEntry("reports", "", "fa fa-file-o", "reports", AppConst.BASE_URL + "reports"));

        list.add(co);
        list.add(sto);
        list.add(ro);
        list.add(po);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
