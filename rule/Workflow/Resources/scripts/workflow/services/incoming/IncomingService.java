package workflow.services.incoming;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.scripting._Session;
import workflow.dao.IncomingDAO;
import workflow.model.Incoming;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("incomings")
public class IncomingService extends RestProvider {

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {
        _Session ses = getSession();
        IncomingDAO incomingDAO = new IncomingDAO(ses);
        Incoming entity = incomingDAO.findById(id);
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Incoming incoming) {
        _Session ses = getSession();
        IncomingDAO incomingDAO = new IncomingDAO(ses);
        Incoming entity;
        try {
            entity = incomingDAO.add(incoming);
        } catch (SecureException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Incoming incoming) {

        System.out.println(incoming.getSummary());

        _Session ses = getSession();
        IncomingDAO incomingDAO = new IncomingDAO(ses);
        Incoming entity;
        try {
            entity = incomingDAO.update(incoming);
        } catch (SecureException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        _Session ses = getSession();
        IncomingDAO dao = new IncomingDAO(ses);
        Incoming entity = dao.findById(id);
        if (entity != null) {
            try {
                dao.delete(entity);
            } catch (SecureException e) {
                return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
            }
        }
        return Response.noContent().build();
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
