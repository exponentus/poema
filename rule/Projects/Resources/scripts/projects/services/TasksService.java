package projects.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.page.task.TaskView;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Path("tasks")
public class TasksService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {
        Outcome outcome = new Outcome();
        _Session session = getSession();
        _SortParams sortParams = getWebFormData().getSortParams(_SortParams.desc("regDate"));
        String[] expandedIds = getWebFormData().getListOfValuesSilently("expandedIds");
        List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());

        int pageSize = session.pageSize;
        int pageNum = getWebFormData().getPage();

        TaskDAO taskDAO = new TaskDAO(session);
        TaskFilter taskFilter = TaskView.setUpTaskFilter(session, getWebFormData(), new TaskFilter());

        ViewPage<Task> vp = taskDAO.findAllWithResponses(taskFilter, sortParams, pageNum, pageSize, expandedIdList);

        outcome.setId("tasks");
        outcome.setTitle("tasks");
        outcome.addPayload(vp);

        return Response.ok(outcome).build();
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
