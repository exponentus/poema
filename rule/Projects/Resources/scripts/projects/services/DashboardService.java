package projects.services;

import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import monitoring.dao.StatisticDAO;
import org.apache.commons.lang3.time.DateUtils;
import projects.dao.TaskDAO;
import projects.dto.stat.TaskPriorityStat;
import projects.dto.stat.TaskStatusStat;
import projects.model.constants.TaskStatusType;

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

            int pageSize = 10;
            int pageNum = 1;

            Outcome outcome = new Outcome();
            outcome.setId("dashboard");
            outcome.setTitle("dashboard");

            StatisticDAO monitDao = new StatisticDAO(session);
            Date current = new Date();
            outcome.addPayload("statistic1", monitDao.getStatusStat(projects.init.AppConst.CODE, "assignee_state", session.getUser(),
                    DateUtils.addMonths(current, -1), current, TaskStatusType.PROCESSING.name()));

            outcome.addPayload("statistic2", monitDao.getStatusStat(projects.init.AppConst.CODE, "author_state", session.getUser(),
                    DateUtils.addMonths(current, -1), current, TaskStatusType.PROCESSING.name()));

            TaskDAO taskDAO = new TaskDAO(session);
            outcome.addPayload("created_by_me", taskDAO.findCreatedByUser(session.getUser(), pageNum, pageSize));
            outcome.addPayload("assigned_to_me", taskDAO.findAssignedToUser(session.getUser(), pageNum, pageSize));

            List<TaskPriorityStat> taskPriorityStatList = taskDAO.getStatTaskPriority();
            List<TaskStatusStat> taskStatusStatList = taskDAO.getStatTaskStatus();
            ViewPage allTaskByDueDateToday = taskDAO.findAllTaskByDueDateToday();

            outcome.addPayload("taskPriorityStatList", taskPriorityStatList);
            outcome.addPayload("taskStatusStatList", taskStatusStatList);
            outcome.addPayload("allTaskByDueDateToday", allTaskByDueDateToday);

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }
}
