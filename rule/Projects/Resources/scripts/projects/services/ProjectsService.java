package projects.services;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.rest.RestProvider;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.page.view.TaskView;

@Path("/projects")
public class ProjectsService extends RestProvider {

	@GET
	@Path("/get-tasks")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@Context UriInfo uriInfo) {
		MultivaluedMap<String, String> queryParams = uriInfo.getQueryParameters();
		String referrer = request.getHeader("referer");
		_WebFormData formData = new _WebFormData(queryParams, referrer);
		_Session ses = getSession();
		TaskDAO taskDAO = new TaskDAO(ses);
		TaskFilter taskFilter = TaskView.createTaskFilter(ses, formData);
		int pageSize = ses.pageSize;
		int pageNum = formData.getNumberValueSilently("page", 0);
		ViewPage<Task> vp = taskDAO.findAllByTaskFilter(taskFilter, pageNum, pageSize);
		return Response.ok(vp).build();
	}

}
