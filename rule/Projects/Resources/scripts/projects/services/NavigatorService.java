package projects.services;

import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.outline.Outline;
import com.exponentus.scripting.outline.OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;
import projects.init.ModuleConst;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedList;

@Path("navigator")
@Produces(MediaType.APPLICATION_JSON)
public class NavigatorService extends RestProvider {

    @GET
    public Response getNav() {
        _Session ses = getSession();
        Collection<IOutcomeObject> list = new LinkedList<>();

        Outline dbo = new Outline("", "dashboard");
        dbo.addEntry(new OutlineEntry("dashboard", "", "fa fa-dashboard", "dashboard", ModuleConst.BASE_URL + "dashboard"));

        Outline to = new Outline("", "tasks");
        to.addEntry(new OutlineEntry("tasks_all", "", "fa fa-tasks", "tasks_all", ModuleConst.BASE_URL + "tasks"));
        to.addEntry(new OutlineEntry("my_tasks", "", "fa fa-pencil", "tasks/s/my", ModuleConst.BASE_URL + "tasks/s/my"));
        to.addEntry(new OutlineEntry("tasks_assigned_to_me", "", "fa fa-inbox", "tasks/s/inbox", ModuleConst.BASE_URL + "tasks/s/inbox"));

        if (ses.getUser().getRoles().contains(ModuleConst.ROLES[0])) {
            to.addEntry(new OutlineEntry("tasks_moderate", "", "fa fa-legal", "tasks/s/moderate", ModuleConst.BASE_URL + "tasks/s/moderate"));
        }

        Outline po = new Outline("", "projects");
        po.addEntry(new OutlineEntry("projects", "", "fa fa-puzzle-piece", "projects", ModuleConst.BASE_URL + "projects"));

        list.add(dbo);
        list.add(to);
        list.add(po);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
