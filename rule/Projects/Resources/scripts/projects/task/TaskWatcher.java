package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;

import java.util.Date;
import java.util.List;

@Command(name = "check_tasks_status", trigger = Trigger.EVERY_HOUR)
public class TaskWatcher extends Do {
	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Date current = new Date();
		try {
			TaskDAO tDao = new TaskDAO(ses);
			TaskFilter filter = new TaskFilter();
			filter.setStatus(TaskStatusType.WAITING);
			List<Task> taskList = tDao.findAllByTaskFilter(filter);
			for (Task task : taskList) {
				if (current.after(task.getStartDate())) {
					task.setStatus(TaskStatusType.OPEN);
					try {
						tDao.update(task);
						logger.info("The task \"" + task.getTitle() + "\" was put in processing");
						new Messages(appEnv).sendToAssignee(task);
					} catch (SecureException | DAOException e) {
						setError(e);
						
					}
				}
			}
		} catch (DAOException e) {
			logError(e);
			return;
		}
	}
}
