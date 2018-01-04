package helpdesk.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.outline.Outline;
import com.exponentus.scripting.outline.OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;
import helpdesk.init.ModuleConst;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Path("navigator")
@Produces(MediaType.APPLICATION_JSON)
public class NavigatorService extends RestProvider {

    @GET
    public Response getNav() {
        Collection<IOutcomeObject> list = new LinkedList<>();

        Outline co = new Outline("", "common");
        co.addEntry(new OutlineEntry("demands_my", "", "fa fa-user-o", "demands/s/my", ModuleConst.BASE_URL + "demands/s/my"));

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
                co.addEntry(new OutlineEntry(dt.getLocName(lang), "", icon, "demands/s/" + dt.getName(), ModuleConst.BASE_URL + "demands/s/" + dt.getName()));
            }
        } catch (DAOException e) {
            e.printStackTrace();
        }

        list.add(co);

        Outcome outcome = new Outcome();
        outcome.addPayload("nav", list);

        return Response.ok(outcome).build();
    }
}
