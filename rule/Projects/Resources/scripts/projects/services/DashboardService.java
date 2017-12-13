package projects.services;

import administrator.dao.UserDAO;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Voc;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import dataexport.model.constants.ExportFormatType;
import monitoring.dto.TimeChart;
import projects.dao.TaskDAO;
import projects.dto.stat.CountStat;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Path("dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardService extends RestProvider {

    @GET
    public Response get() {
        try {
            _Session session = getSession();
            LanguageCode lang = session.getLang();
            Outcome outcome = new Outcome();
            outcome.setId("dashboard");
            outcome.setTitle("dashboard");

            Date current = new Date();
            TimeChart chart = new TimeChart();
            List<IUser> allUsers = new ArrayList<>();

            UserDAO userDAO = new UserDAO();
            //allUsers.addAll(userDAO.findAll());
            allUsers.add(session.getUser());
            Date fromDate = TimeUtil.convertTextToDate("01.01.2017");
            StatusType[] stats = {StatusType.PROCESSING,StatusType.OPEN};
            String periodType = "day"; //could be "week", "year" as well
            List<Object[]> result = new TaskDAO(session).getCountByStatus(fromDate,current,periodType,allUsers,stats);
            long total = 0;
            Map vals = new  LinkedHashMap();
            for (Object[] r : result) {
                total += (long)r[1];
                vals.put(new SimpleDateFormat("dd.MM.yyyy").format(new Date(((Timestamp) r[0]).getTime())), r[1]);
            }

            chart.setValues(vals);
            if (total > 0) {
                long average = total / vals.size();
                chart.setTitle(average + Voc.get("task", lang) + "/" + Voc.get(periodType, lang));
            }
            chart.setStart(TimeUtil.dateToStringSilently(fromDate));
            chart.setEnd(TimeUtil.dateTimeToStringSilently(current));
            chart.setStatus(Arrays.stream(stats).map(s -> s.name()).collect(Collectors.joining(",")));
            outcome.addPayload("statAssigneeStateProcessing", chart);

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
