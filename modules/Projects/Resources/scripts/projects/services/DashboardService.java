package projects.services;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.ui.chart.Chart;
import com.exponentus.common.ui.chart.ChartDataset;
import com.exponentus.common.ui.chart.ChartType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Voc;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import dataexport.model.constants.ExportFormatType;
import projects.dao.TaskDAO;
import projects.dto.stat.CountStat;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Path("dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardService extends RestProvider {

    @GET
    public Response get() {
        try {
            _Session session = getSession();
            LanguageCode lang = session.getLang();
            UserDAO userDAO = new UserDAO();
            WebFormData params = getWebFormData();

            // Params
            List<IUser> allUsers = new ArrayList<>();
            boolean isProjectSupervisor = session.getUser().getRoles().contains("prj_supervisor");
            if (isProjectSupervisor) {
                String assigneeUserId = params.getValueSilently("assignee");
                if (assigneeUserId.isEmpty()) {
                    allUsers.addAll(userDAO.findAll());
                } else {
                    IUser user = new User();
                    user.setId(Long.valueOf(assigneeUserId));
                    allUsers.add(user);
                }
            } else {
                allUsers.add(session.getUser());
            }

            Date fromDate = params.getDateSilently("fromDate");
            if (fromDate == null) {
                fromDate = TimeUtil.convertTextToDate("01.01.2017");
            }
            Date toDate = params.getDateSilently("toDate");
            if (toDate == null) {
                toDate = new Date();
            }
            String periodType = params.getStringValueSilently("periodType", "week"); //could be "day","week", "year" as well
            if (!"day".equals(periodType) && !"week".equals(periodType) && !"year".equals(periodType)) {
                periodType = "week";
            }
            StatusType[] statusTypes = {StatusType.PROCESSING, StatusType.OPEN, StatusType.PENDING, StatusType.COMPLETED};

            //

//            for (StatusType st : statusTypes) {
//                List<CountStat<Timestamp>> result2 = new TaskDAO(session).getCountByStatus(fromDate, toDate, periodType, "assignee", allUsers, st);
//
//            }


            // Chart data
            Chart chart = new Chart(ChartType.BAR);
            for (StatusType st : statusTypes) {
                List<CountStat<Timestamp>> result = new TaskDAO(session).getCountByStatus(fromDate, toDate, periodType, "assignee", allUsers, st);
                if (result.size() > 0) {
                    ChartDataset<Double> ds = new ChartDataset<>(Voc.get(st.name().toLowerCase(), lang));
                    ds.setId(st.name());
                    chart.addDataset(ds);

                    for (CountStat r : result) {
                        String label = new SimpleDateFormat("dd.MM.yyyy").format(new Date(((Timestamp) r.title).getTime()));
                        if (!chart.getLabels().contains(label)) {
                            chart.addLabel(label);
                        }
                        ds.add((double) r.count);
                    }
                }
            }

            Outcome outcome = new Outcome();
            outcome.setId("dashboard");
            outcome.setTitle("dashboard");
            outcome.addPayload("chart", chart);
            outcome.addPayload("isProjectSupervisor", isProjectSupervisor);
            outcome.addPayload("taskStatusStats", new TaskDAO(session).getTaskStatusStats());
            outcome.addPayload("exportFormatType", ExportFormatType.values());

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }
}
