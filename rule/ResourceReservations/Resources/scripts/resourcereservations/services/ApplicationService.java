package resourcereservations.services;

import com.exponentus.common.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._ActionBar;
import reference.model.Tag;
import reference.model.Vehicle;
import resourcereservations.dao.ApplicationForVehicleDAO;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.ui.ActionFactory;
import resourcereservations.ui.ViewOptions;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Path("applications")
public class ApplicationService extends RestProvider {

    private ActionFactory action = new ActionFactory();

    @GET
    @Path("my")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMyAppsViewPage() {
        return getViewPage();
    }

    @GET
    @Path("{type}") // vehicle, meeting_room
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPageByType(@PathParam("type") String type) {
        return getViewPage();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {
        _Session session = getSession();
        WebFormData params = getWebFormData();
        int pageSize = session.getPageSize();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));

        try {
            ApplicationFilter filter = new ApplicationFilter();

            // setup filter
            String vehicleId = params.getValueSilently("vehicle");
            if (!vehicleId.isEmpty()) {
                Vehicle vehicle = new Vehicle();
                vehicle.setId(UUID.fromString(vehicleId));
                filter.setVehicle(vehicle);
            }

            String statusName = params.getValueSilently("status");
            if (!statusName.isEmpty()) {
                filter.setStatus(ApprovalStatusType.valueOf(statusName));
            }

            String resultName = params.getValueSilently("result");
            if (!resultName.isEmpty()) {
                filter.setResult(ApprovalResultType.valueOf(resultName));
            }

            if (params.containsField("tag")) {
                List<Tag> tags = new ArrayList<>();
                String[] tagIds = params.getListOfValuesSilently("tag");
                for (String tid : tagIds) {
                    Tag tag = new Tag();
                    tag.setId(UUID.fromString(tid));
                    tags.add(tag);
                }
                filter.setTags(tags);
            }
            //

            ApplicationForVehicleDAO avDAO = new ApplicationForVehicleDAO(session);
            ViewPage vp = avDAO.findViewPage(filter, sortParams, params.getPage(), pageSize);
            vp.setViewPageOptions(new ViewOptions().getApplicationOptions());

            _ActionBar actionBar = new _ActionBar(session);
            // actionBar.addAction(new _Action("add_new", "",
            // "new_application_for_vehicle"));
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("applications_for_vehicle");
            outcome.setTitle("applications_for_vehicle");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }
}
