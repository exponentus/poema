package projects.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.scripting._ColumnOptions;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._WebFormData;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Request;
import projects.model.Task;
import projects.page.task.TaskView;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

        _ColumnOptions colOpts = new _ColumnOptions();
        // test
        colOpts.add(Task.class, "regNumber", "text", "vw-reg-number");
        colOpts.add(Task.class, "title", "text", "vw-title");
        colOpts.add(Task.class, "hasAttachments", "attachment", "vw-icon");
        colOpts.add(Task.class, "status", "text", "vw-status");
        colOpts.add(Task.class, "priority", "text", "vw-priority");
        colOpts.add(Task.class, "assignee", "localizedName", "vw-assignee");
        colOpts.add(Task.class, "startDate", "date", "vw-date");
        colOpts.add(Task.class, "dueDate", "date", "vw-date");

        colOpts.add(Request.class, "regDate", "date", "request__time");
        colOpts.add(Request.class, "comment", "text", "request__comment");
        colOpts.add(Request.class, "attachments", "attachment", "request__attachments");
        colOpts.add(Request.class, "resolution", "text", "");
        colOpts.add(Request.class, "resolutionTime", "date", "request__resolution_time");
        //

        ViewPage<Task> vp = taskDAO.findAllWithResponses(taskFilter, sortParams, pageNum, pageSize, expandedIdList);
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
