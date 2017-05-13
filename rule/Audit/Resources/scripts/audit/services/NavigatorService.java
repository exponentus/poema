package audit.services;

import audit.init.AppConst;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.outline.Outline;
import com.exponentus.scripting.outline.OutlineEntry;
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

        Outline co = new Outline("observations", "observations");

        co.addEntry(new OutlineEntry("observations_all", "", "fa fa-file-o", "observations", AppConst.BASE_URL + "observations"));
        co.addEntry(new OutlineEntry("observations_draft", "", "fa fa-file-o", "observations/s/draft", AppConst.BASE_URL + "observations/s/draft"));
        co.addEntry(new OutlineEntry("observations_open", "", "fa fa-file-o", "observations/s/open", AppConst.BASE_URL + "observations/s/open"));
        co.addEntry(new OutlineEntry("observations_waiting", "", "fa fa-file-o", "observations/s/waiting", AppConst.BASE_URL + "observations/s/waiting"));
        co.addEntry(new OutlineEntry("observations_pending", "", "fa fa-file-o", "observations/s/pending", AppConst.BASE_URL + "observations/s/pending"));
        co.addEntry(new OutlineEntry("observations_processing", "", "fa fa-file-o", "observations/s/processing", AppConst.BASE_URL + "observations/s/processing"));
        co.addEntry(new OutlineEntry("observations_completed", "", "fa fa-file-o", "observations/s/completed", AppConst.BASE_URL + "observations/s/completed"));
        co.addEntry(new OutlineEntry("observations_cancelled", "", "fa fa-file-o", "observations/s/cancelled", AppConst.BASE_URL + "observations/s/cancelled"));

        Outline po = new Outline("", "projects");
        po.addEntry(new OutlineEntry("projects", "", "fa fa-file-o", "projects", AppConst.BASE_URL + "projects"));

        Outline sto = new Outline("statistics", "statistics");
        sto.addEntry(new OutlineEntry("statistics_by_status", "", "fa fa-file-o", "statistics/status", AppConst.BASE_URL + "statistics/status"));
        sto.addEntry(new OutlineEntry("statistics_by_place", "", "fa fa-file-o", "statistics/place", AppConst.BASE_URL + "statistics/place"));
        sto.addEntry(new OutlineEntry("statistics_by_inspector", "", "fa fa-file-o", "statistics/inspector", AppConst.BASE_URL + "statistics/inspector"));

        Outline ro = new Outline("", "reports");
        ro.addEntry(new OutlineEntry("reports", "", "fa fa-file-o", "reports", AppConst.BASE_URL + "reports"));

        list.add(co);
        list.add(sto);
        list.add(ro);
        list.add(po);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
