package workflow.services;

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

		_Outline co = new _Outline("projects", "common");
		co.addEntry(new _OutlineEntry("office_memo_plural", "", "office-memos", "office-memos/projects"));
		co.addEntry(new _OutlineEntry("application_for_vehicle", "", "applications_for_vehicle_prj",
				"applications_for_vehicle/projects"));

		_Outline odo = new _Outline("org_documents", "org_documents");

		odo.addEntry(new _OutlineEntry("incoming_documents", "", "incomings", "incomings"));
		odo.addEntry(new _OutlineEntry("outgoing_documents", "", "outgoings", "outgoings"));
		odo.addEntry(new _OutlineEntry("office_memo_plural", "", "office-memos", "office-memos"));
		odo.addEntry(new _OutlineEntry("applications_for_vehicle", "", "applications_for_vehicle",
				"applications_for_vehicle"));

		list.add(co);
		list.add(odo);

		Outcome outcome = new Outcome();
		outcome.addPayload("nav", list);

		return Response.ok(outcome).build();
	}
}
