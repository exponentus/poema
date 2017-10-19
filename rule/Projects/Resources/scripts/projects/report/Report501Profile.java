package projects.report;

import com.exponentus.common.other.AbstractReportProfile;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.log.Lg;
import projects.dao.TaskDAO;
import projects.init.AppConst;
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
    public String getTitle() {
        return "report_501";
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
                for (TaskStatusType taskStatusType : TaskStatusType.values()) {
                    Long res = dao.getColByAssignee(from, until, employee.getUser(), taskStatusType);
                    switch (taskStatusType) {
                        case DRAFT:
                            report.draft += res;
                            break;
                        case PROCESSING:
                            report.processing += res;
                            break;
                        case COMPLETED:
                            report.completed += res;
                            break;
                        case CANCELLED:
                            report.cancelled += res;
                            break;
                        case OPEN:
                            report.open += res;
                            break;
                        case PENDING:
                            report.pending += res;
                            break;
                        case POSTPONED:
                            report.postponed += res;
                            break;
                    }
                    report.total += res;
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
