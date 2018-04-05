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
import java.util.*;

@Path("dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardService extends RestProvider {

    @GET
    public Response get() {
        try {
            _Session session = getSession();
            LanguageCode lang = session.getLang();
            WebFormData params = getWebFormData();

            // Chart params
            List<IUser> allUsers = new ArrayList<>();
            boolean isProjectSupervisor = session.getUser().getRoles().contains("prj_supervisor");
            if (isProjectSupervisor) {
                String assigneeUserId = params.getValueSilently("assignee");
                if (assigneeUserId.isEmpty()) {
                    allUsers.addAll(new UserDAO().findAll());
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
            String periodType = params.getStringValueSilently("periodType", "week"); // day, week, year
            if (!"day".equals(periodType) && !"week".equals(periodType) && !"year".equals(periodType)) {
                periodType = "week";
            }
            StatusType[] statusTypes = {StatusType.PROCESSING, StatusType.OPEN, StatusType.PENDING, StatusType.COMPLETED};

            //
            Chart chart = new Chart(ChartType.BAR);
            // Готовим данные для графика
            // Нужно создать список всех дат в сортированном виде.
            // Сделать мапу {дата: количество}
            // Затем перебирая все даты: если есть дата взять значение из мапы {дата: количество}, если нет 0
            List<Date> dates = new LinkedList<>(); // unique dates
            Map<StatusType, Map<Date, Double>> stMap = new HashMap<>();
            for (StatusType st : statusTypes) {
                List<CountStat<Timestamp>> res = new TaskDAO(session).getCountByStatus(fromDate, toDate, periodType, "assignee", allUsers, st);
                Map<Date, Double> _map = new HashMap<>();
                stMap.put(st, _map);
                for (CountStat<Timestamp> r : res) {
                    Date date = new Date((r.title).getTime());
                    if (!dates.contains(date)) {
                        dates.add(date);

                        String label = new SimpleDateFormat("dd.MM.yyyy").format(date);
                        chart.addLabel(label);
                    }
                    _map.put(date, (double) r.count);
                }
            }
            dates.sort(Date::compareTo);

            // Chart
            for (Map.Entry<StatusType, Map<Date, Double>> entry : stMap.entrySet()) {
                String stName = entry.getKey().name();
                ChartDataset<Double> ds = new ChartDataset<>(Voc.get(stName.toLowerCase(), lang));
                ds.setId(stName);
                chart.addDataset(ds);

                for (Date d : dates) {
                    ds.add(entry.getValue().getOrDefault(d, 0d));
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
