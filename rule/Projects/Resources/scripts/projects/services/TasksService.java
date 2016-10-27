package projects.services;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._WebFormData;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.page.task.TaskView;

@Path("tasks")
public class TasksService extends RestProvider {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getList(@Context UriInfo uriInfo) {
		_Session session = getSession();
		_WebFormData formData = new _WebFormData(uriInfo.getQueryParameters(), httpRequest.getHeader("referer"));

		String[] expandedIds = formData.getListOfValuesSilently("expandedIds");
		List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
		int pageSize = session.pageSize;
		int pageNum = formData.getNumberValueSilently("page", 0);

		TaskDAO taskDAO = new TaskDAO(session);
		TaskFilter taskFilter = TaskView.setUpTaskFilter(session, formData, new TaskFilter());
		_SortParams sortParams = formData.getSortParams(_SortParams.desc("regDate"));

		ViewPage<Task> vp = taskDAO.findAllWithChildren(taskFilter, sortParams, pageNum, pageSize, expandedIdList);
		return Response.ok(vp).build();
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id) {
		_Session ses = getSession();
		TaskDAO taskDAO = new TaskDAO(ses);
		Task entity = taskDAO.findById(id);
		return Response.ok(new ViewPage<>(entity)).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(Task task) {
		_Session ses = getSession();
		TaskDAO taskDAO = new TaskDAO(ses);
		Task entity = null;
		try {
			entity = taskDAO.update(task);
		} catch (SecureException | DAOException e) {
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		}
		return Response.ok(new ViewPage<>(entity)).build();
	}

	@PUT
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response update(Task task) {
		_Session ses = getSession();
		TaskDAO taskDAO = new TaskDAO(ses);
		Task entity = null;
		try {
			entity = taskDAO.update(task);
		} catch (SecureException | DAOException e) {
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		}
		return Response.ok(new ViewPage<>(entity)).build();
	}

	@Override
	public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
		sd.setName(getClass().getName());
		ServiceMethod m = new ServiceMethod();
		m.setMethod(HttpMethod.GET);
		m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/tasks");
		sd.addMethod(m);
		return sd;
	}
}
