package resourcereservations.services;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.outline.Outline;
import com.exponentus.scripting.outline.OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;
import resourcereservations.init.ModuleConst;

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

        Outline o = new Outline("", "common");
        o.addEntry(new OutlineEntry("all_applications", "", "fa fa-tasks", "applications", ModuleConst.BASE_URL + "applications"));
        o.addEntry(new OutlineEntry("my_applications", "", "fa fa-user-o", "applications_my", ModuleConst.BASE_URL + "applications/my"));

        Outline co = new Outline("", "application_types");
        co.addEntry(new OutlineEntry("applications_for_vehicle", "", "fa fa-car", "applications_for_vehicle",
                ModuleConst.BASE_URL + "applications-for-vehicle"));
        co.addEntry(new OutlineEntry("applications_for_meeting_room", "", "fa fa-home",
                "applications_for_meeting_room", ModuleConst.BASE_URL + "applications-for-meeting-room"));

        list.add(o);
        list.add(co);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
