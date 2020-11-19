package projects.report;

import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.other.AbstractDataObtainer;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.log.Lg;
import org.apache.jasper.tagplugins.jstl.core.Out;
import projects.dao.TaskDAO;
import projects.model.Task;
import reference.dao.TagDAO;
import reference.init.ModuleConst;
import reference.model.Tag;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class ReportActualExecTime extends AbstractDataObtainer {

    @Override
    public String getTemplateName() {
        return "ReportActualExecTime";
    }

    @Override
    public String getAppCode() {
        return projects.init.ModuleConst.CODE;
    }

    @Override
    public List getReportData(Date from, Date until, String customParameter) {
        List result = new ArrayList();

        try {
            TagDAO tagDAO = new TagDAO(session);
            Tag tag = tagDAO.findByName(ModuleConst.EXPIRED_TAG_NAME);
            TaskDAO dao = new TaskDAO(session);
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            for (Employee employee : employeeDAO.findAll()) {
                ActualExecReportPOJO report = new ActualExecReportPOJO();
                report.user = employee.getName();
                report.notExecutedTaskInHours = 0;
                ViewPage<Task> res = dao.findAssignedToUser(from, until, employee.getUser(), 0, 0);
       //         System.out.println(employee + " " + res.getCount());
                for (Task task : res.getResult()) {
                    TimeLine timeLine = task.getTimeLine();
                    String status = timeLine.getStageName(until);
                    System.out.println("status = " + task.getStatus());
                    if (status != null) {
                        StatusType statusType = StatusType.valueOf(status);
                        switch (statusType) {
                            case OPEN:
                                report.notExecutedTaskInHours += task.getPlannedTimeInHoursForReport();
                                System.out.println("notExecutedTaskInHours = " + task.getPlannedTimeInHoursForReport());
                                break;
                            case PROCESSING:
                                report.hours += task.getEstimateInHours();
                                System.out.println("planned hours = " + task.getEstimateInHours());

                                report.notExecutedTaskInHours += task.getPlannedTimeInHoursForReport();
                                System.out.println("notExecutedTaskInHours = " + task.getPlannedTimeInHoursForReport());
                                break;
                            case COMPLETED:
                                report.hours += task.getEstimateInHours();
                                report.execHours += task.getActualExecTimeInHours();
                                System.out.println("execHours hours = " + task.getActualExecTimeInHours());
                                System.out.println("planned hours = " + task.getEstimateInHours());
                                break;
                            case PENDING:
                                report.hours += task.getPlannedTimeInHours();
                                report.execHours += task.getActualExecTimeInHours();
                                System.out.println("execHours hours = " + task.getActualExecTimeInHours());
                                System.out.println("planned hours = " + task.getEstimateInHours());
                                break;
                        }
                       /* if (task.getTags().contains(tag)){
                            report.expired ++;
                        }*/

                       /* if(statusType == StatusType.PROCESSING || statusType == PENDING){
                            report.hours += task.getPlannedTimeInHours();
                            System.out.println("palanned hours = " + task.getPlannedTimeInHours());
                        }
                        if(statusType ==  StatusType.COMPLETED){
                            report.hours += task.getPlannedTimeInHours();
                            report.execHours += task.getActualExecTimeInHours();
                            System.out.println("execHours hours = " + task.getActualExecTimeInHours());
                            System.out.println("palanned hours = " + task.getPlannedTimeInHours());
                        }*/
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
