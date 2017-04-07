package resourcereservations.services;

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

        _Outline co = new _Outline("", "common");
        co.addEntry(new _OutlineEntry("applications_for_vehicle", "", "fa fa-car", "applications_for_vehicle", "applications_for_vehicle"));

        list.add(co);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
