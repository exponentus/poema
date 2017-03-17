package workflow.services;

import java.util.Collection;
import java.util.LinkedList;

import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
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

		_Outline co = new _Outline("workflow", "common");

		co.addEntry(new _OutlineEntry("office_memo_plural", "", "office-memos", "office-memos"));
		co.addEntry(new _OutlineEntry("incoming_documents", "", "incomings", "incomings"));
		co.addEntry(new _OutlineEntry("outgoing_documents", "", "outgoings", "outgoings"));

		list.add(co);

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
