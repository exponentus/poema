package audit.services;

import audit.dao.StatDAO;
import com.exponentus.rest.RestProvider;
import com.exponentus.scripting._Session;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("stat")
public class StatService extends RestProvider {

    @GET
    @Path("status")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getByStatus() {
        _Session session = getSession();
        try {
            StatDAO dao = new StatDAO(session);
            return Response.ok(dao.findStatDataByObsStatus()).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("inspector")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getByInspector() {
        _Session session = getSession();
        try {
            StatDAO dao = new StatDAO(session);
            return Response.ok(dao.findStatInspector()).build();
        } catch (Exception e) {
            return responseException(e);
        }
    }
}
