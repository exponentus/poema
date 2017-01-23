package projects.task;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.tasks.Command;

import projects.dao.ProjectDAO;
import projects.model.Project;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

@Command(name = "speed_check")
public class SpeedChecker extends _Do {

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		System.out.println("run...");
		long start_time = System.nanoTime();
		try {
			int iteration = 100;
			int pageSize = 200;
			_SortParams sortParams = new _SortParams();
			for (int i = 0; i < iteration; i++) {
				ProjectDAO projectDAO = new ProjectDAO(session);
				ViewPage<Project> vp = projectDAO.findViewPage(sortParams, 1, pageSize);
				EmployeeDAO empDao = new EmployeeDAO(session);
				Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
						.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));
			}
		} catch (Exception e) {
			System.err.println(e);
		}
		
		long end_time = System.nanoTime();
		System.out.println("done");
		System.out.println("speed=" + (end_time - start_time) / 1e6);
		
	}

}
