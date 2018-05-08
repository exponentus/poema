package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.log.Lg;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.dao.TaskDAO;
import projects.init.ModuleConst;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import javax.persistence.Tuple;
import java.util.List;

@Command(name = ModuleConst.CODE + "_measure_preference")
public class MeasurePreference extends Do {

    @Override
    public void doTask(AppEnv appEnv, _Session ses) {
        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(ses);
            for (Employee user : employeeDAO.findAll()) {
                System.out.println(user.getLogin());
                TaskDAO taskDAO = new TaskDAO(ses);
                List<Tuple> tasks = taskDAO.findAllAssigneeByPreference(user.getLogin());
                for (Tuple tuple : tasks) {
                    Employee employee = employeeDAO.findByUserId((long) tuple.get(1));
                    if (employee != null) {
                        System.out.println(tuple.get(0) + " " + tuple.get(1) + " " + employee.getName());
                    } else {
                        System.out.println(tuple.get(0) + " " + tuple.get(1));
                    }
                }
            }

        } catch (DAOException e) {
            Lg.error(e);
        }

    }

}
