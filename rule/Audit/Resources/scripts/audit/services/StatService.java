package audit.services;

import audit.dao.StatDAO;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("stat")
@Produces(MediaType.APPLICATION_JSON)
public class StatService extends RestProvider {

    @GET
    @Path("status")
    public Response getByStatus() {
        _Session session = getSession();
        try {
            StatDAO dao = new StatDAO(session);

            Outcome outcome = new Outcome();
            outcome.addPayload("data", dao.findStatDataByObsStatus());

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("inspector")
    public Response getByInspector() {
        _Session session = getSession();
        try {
            StatDAO dao = new StatDAO(session);

            Outcome outcome = new Outcome();
            outcome.addPayload("data", dao.findStatInspector());

            return Response.ok(outcome).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }
}
