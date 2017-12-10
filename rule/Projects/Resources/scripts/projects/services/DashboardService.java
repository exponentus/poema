package projects.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import dataexport.model.constants.ExportFormatType;
import monitoring.dto.TimeChart;
import projects.dao.TaskDAO;
import projects.dto.stat.CountStat;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.List;

@Path("dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardService extends RestProvider {

    @GET
    public Response get() {
        try {
            _Session session = getSession();

            Outcome outcome = new Outcome();
            outcome.setId("dashboard");
            outcome.setTitle("dashboard");

            Date current = new Date();
            // assignee_state
           outcome.addPayload("statAssigneeStateProcessing", new TimeChart());

            outcome.addPayload("statAssigneeStateCompleted", new TimeChart());

            // author_state
            outcome.addPayload("statAuthorStateProcessing", new TimeChart());

            outcome.addPayload("statAuthorStateCompleted", new TimeChart());

            TaskDAO taskDAO = new TaskDAO(session);

            List<CountStat> taskStatusStatList = taskDAO.getStatTaskStatus();
            outcome.addPayload("taskStatusStat", taskStatusStatList);
            outcome.addPayload("exportFormatType", ExportFormatType.values());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }
}
