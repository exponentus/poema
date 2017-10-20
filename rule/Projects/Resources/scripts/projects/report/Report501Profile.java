package projects.report;

import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.other.AbstractReportProfile;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.log.Lg;
import projects.dao.TaskDAO;
import projects.init.AppConst;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class Report501Profile extends AbstractReportProfile {

    @Override
    public String getTemplateName() {
        return "report501";
    }

    @Override
    public String getAppCode() {
        return AppConst.CODE;
    }

    @Override
    public List getReportData(Date from, Date until, String customParameter) {
        List result = new ArrayList();
        try {
            TaskDAO dao = new TaskDAO(session);
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            for (Employee employee : employeeDAO.findAll().getResult()) {
                ConsolidatedReportPOJO report = new ConsolidatedReportPOJO();
                report.user = employee.getName();
                ViewPage<Task> res = dao.findAssignedToUser(from, until, employee.getUser(), 0, 0);
       //         System.out.println(employee + " " + res.getCount());
                for (Task task : res.getResult()) {
                    TimeLine timeLine = task.getTimeLine();
                    String status = timeLine.getStageName(from);
                    if (status != null) {
                        TaskStatusType statusType = TaskStatusType.valueOf(status);
                        switch (statusType) {
                            case DRAFT:
                                report.draft++;
                                break;
                            case MODERATION:
                                report.moderation++;
                                break;
                            case PROCESSING:
                                report.processing++;
                                break;
                            case COMPLETED:
                                report.completed++;
                                break;
                            case CANCELLED:
                                report.cancelled++;
                                break;
                            case OPEN:
                                report.open++;
                                break;
                            case PENDING:
                                report.pending++;
                                break;
                            case POSTPONED:
                                report.postponed++;
                                break;
                        }
                        report.total++;
                    }
                }
                result.add(report);
            }
            return result;
        } catch (DAOException e) {
            Lg.exception(e);
        }

        return null;
    }
}
