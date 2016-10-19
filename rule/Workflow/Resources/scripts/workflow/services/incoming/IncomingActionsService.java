package workflow.services.incoming;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("incomings/{id}/")
public class IncomingActionsService extends RestProvider {

    @PUT
    @Path("action1")
    @Produces(MediaType.APPLICATION_JSON)
    public Response doAction(@PathParam("id") String id) {

        System.out.println(id);

        return Response.ok(id + "::action1").build();
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
