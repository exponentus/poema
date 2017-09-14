package projects.report;

import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.log.Lg;
import dataexport.other.AbstractProfileProfile;
import projects.dao.TaskDAO;
import projects.dto.TaskViewEntry;
import projects.init.AppConst;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaira on 9/9/17.
 */
public class Report500Profile extends AbstractProfileProfile {

    @Override
    public String getTemplateName() {
        return "report500";
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
            for(Employee employee:employeeDAO.findAll().getResult()){
                ViewPage<TaskViewEntry> res = dao.findCreatedByUser(employee.getUser(),0,0);
                if (res.getCount() > 0){
                    Report500POJO report = new Report500POJO();
                    report.user = employee.getName();
                    for (TaskViewEntry entry:res.getResult()){
                        switch(entry.status){
                            case DRAFT:
                                report.draft ++;
                                break;
                            case PROCESSING:
                                report.processing ++;
                                break;
                            case COMPLETED:
                                report.completed ++;
                                break;
                            case FINISHED:
                                report.completed ++;
                                break;
                            case PROCESSED:
                                report.completed ++;
                                break;
                            case CANCELLED:
                                report.cancelled ++;
                                break;
                            case OPEN:
                                report.open ++;
                                break;
                            case PENDING:
                                report.pending ++;
                                break;
                            case POSTPONED:
                                report.postponed ++;
                                break;

                        }
                        report.total ++;
                    }
                    result.add(report);
                }
            }


            return  result;
        } catch (DAOException e) {
            Lg.exception(e);
        }

        return null;
    }
}
