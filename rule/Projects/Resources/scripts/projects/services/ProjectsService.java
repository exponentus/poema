package projects.services;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.page.task.TaskView;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

/**
 * rest
 **/

@Path("/projects")
public class ProjectsService extends RestProvider {

    @GET
    @Path("/tasks")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTasks(@Context UriInfo uriInfo) {
        _Session ses = getSession();
        TaskDAO taskDAO = new TaskDAO(ses);
        MultivaluedMap<String, String> queryParams = uriInfo.getQueryParameters();
        String referrer = request.getHeader("referer");
        _WebFormData formData = new _WebFormData(queryParams, referrer);
        TaskFilter taskFilter = TaskView.setUpTaskFilter(ses, formData, new TaskFilter());
        int pageSize = ses.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);
        ViewPage<Task> vp = taskDAO.findAllByTaskFilter(taskFilter, pageNum, pageSize);
        return Response.ok(vp).build();
    }

    @GET
    @Path("/tasks/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTasks(@PathParam("id") String id) {
        _Session ses = getSession();
        TaskDAO taskDAO = new TaskDAO(ses);
        Task entity = taskDAO.findById(id);
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @POST
    @Path("/task")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postTasks(Task task) {
        _Session ses = getSession();
        TaskDAO taskDAO = new TaskDAO(ses);
        Task entity = null;
        try {
            entity = taskDAO.update(task);
        } catch (SecureException e) {
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
        }
        return Response.ok(new ViewPage<>(entity)).build();
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/projects/tasks");
        sd.addMethod(m);
        return sd;
    }
}
