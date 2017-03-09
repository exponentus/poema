package helpdesk.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.outline._Outline;
import com.exponentus.scripting.outline._OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;

import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Path("navigator")
public class NavigatorService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNav() {
        Collection<IOutcomeObject> list = new LinkedList<>();

        _Outline co = new _Outline("", "common");

        co.addEntry(new _OutlineEntry("demands_my", "", "fa fa-user-o", "demands/s/my", "demands/s/my"));

        try {
            _Session session = getSession();
            LanguageCode lang = session.getLang();
            DemandTypeDAO dtDAO = new DemandTypeDAO(session);
            List<DemandType> dts = dtDAO.findAll().getResult();
            for (DemandType dt : dts) {
                String icon;
                switch (dt.getName()) {
                    case "bug":
                        icon = "fa fa-exclamation";
                        break;
                    case "coding":
                        icon = "fa fa-code";
                        break;
                    case "recommendation":
                        icon = "fa fa-lightbulb-o";
                        break;
                    case "wish":
                        icon = "fa fa-heart-o";
                        break;
                    case "clarify":
                        icon = "fa fa-question";
                        break;
                    default:
                        icon = "";
                        break;
                }
                co.addEntry(new _OutlineEntry(dt.getLocName(lang), "", icon, "demands/s/" + dt.getName(), "demands/s/" + dt.getName()));
            }
        } catch (DAOException e) {
            //
        }

        co.addEntry(new _OutlineEntry("initiative_tasks", "", "fa fa-list", "tasks/s/initiative", "tasks/s/initiative"));
        // co.addEntry(new _OutlineEntry("projects", "", "projects", "projects"));

        list.add(co);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
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
