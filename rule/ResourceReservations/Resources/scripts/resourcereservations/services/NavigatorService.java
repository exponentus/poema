package resourcereservations.services;

import java.util.Collection;
import java.util.LinkedList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.outline._Outline;
import com.exponentus.scripting.outline._OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;

@Path("navigator")
public class NavigatorService extends RestProvider {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getNav() {
		Collection<IOutcomeObject> list = new LinkedList<>();

		_Outline o = new _Outline("", "common");
		o.addEntry(new _OutlineEntry("all_applications", "", "fa fa-list", "applications", "applications"));
		o.addEntry(new _OutlineEntry("my_applications", "", "fa fa-user-o", "applications_my", "applications/my"));

		_Outline co = new _Outline("", "application_types");
		co.addEntry(new _OutlineEntry("applications_for_vehicle", "", "fa fa-car", "applications_for_vehicle",
				"applications_for_vehicle"));
		// co.addEntry(new _OutlineEntry("applications_for_meeting_room", "",
		// "fa fa-home",
		// "applications_for_meeting_room", "applications_for_meeting_room"));

		list.add(o);
		list.add(co);

		Outcome outcome = new Outcome();
		outcome.addPayload("nav", list);

		return Response.ok(outcome).build();
	}
}
