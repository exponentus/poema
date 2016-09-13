package projects.services;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.IRestService;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.page.view.TaskView;

@Path("/projects")
public class ProjectsService extends RestProvider implements IRestService {

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
		return Response.ok(new ViewPage<Task>(entity)).build();

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
		return Response.ok(new ViewPage<Task>(entity)).build();

	}

	@Override
	public List<ServiceDescriptor> getServices() {
		ServiceDescriptor sd = new ServiceDescriptor();
		sd.setName("tasks");
		return services;
	}
}
