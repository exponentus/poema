package projects.services;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import projects.dao.ProjectDAO;
import projects.model.Project;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("projects")
public class ProjectService extends RestProvider {

    /*
     * Get view
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {
        Outcome outcome = new Outcome();
        _Session session = getSession();
        int pageSize = session.pageSize;
        try {
            _SortParams sortParams = getRequestParameter().getSortParams(_SortParams.desc("regDate"));
            ProjectDAO projectDAO = new ProjectDAO(session);
            ViewPage<Project> vp = projectDAO.findViewPage(sortParams, getRequestParameter().getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            _Action newDocAction = new _Action("add_new", "", "new_project");
            actionBar.addAction(newDocAction);

            //
            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = new HashMap<>();
            if (vp.getResult().size() > 0) {
                List<Long> empIds = new ArrayList<>();
                for (Project prj : vp.getResult()) {
                    empIds.add(prj.getManager());
                    empIds.add(prj.getProgrammer());
                    empIds.add(prj.getTester());
                    if (prj.getObservers() != null) {
                        empIds.addAll(prj.getObservers());
                    }
                    if (prj.getRepresentatives() != null) {
                        empIds.addAll(prj.getRepresentatives());
                    }
                }

                for (Employee e : empDao.findAllByUserIds(empIds)) {
                    emps.put(e.getUserID(), e);
                }
            }

            //
            outcome.setId("demands");
            outcome.setTitle("demands");
            outcome.addPayload(actionBar);
            outcome.addPayload("employees", emps);
            outcome.addPayload(vp);

            return Response.ok(outcome).build();
        } catch (Exception e) {
            logError(e);
            return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(outcome.setMessage(e.toString())).build();
        }
    }

    @Override
    public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
        sd.setName(getClass().getName());
        ServiceMethod m = new ServiceMethod();
        m.setMethod(HttpMethod.GET);
        m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/projects");
        sd.addMethod(m);
        return sd;
    }
}
