package projects.tasks;

import java.util.Date;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;

@Command(name = "check_tasks_status", trigger = Trigger.EVERY_HOUR)
public class TaskWatcher extends _Do {
	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Date current = new Date();
		TaskDAO tDao = new TaskDAO(ses);
		TaskFilter filter = new TaskFilter();
		filter.setStatus(TaskStatusType.WAITING);
		ViewPage<Task> result = tDao.findAllByTaskFilter(filter, 0, 0);
		for (Task task : result.getResult()) {
			if (current.after(task.getStartDate())) {
				task.setStatus(TaskStatusType.OPEN);
				try {
					tDao.update(task);
					logger.infoLogEntry("The task \"" + task.getTitle() + "\" was put in processing");
					new Messages(appEnv).sendToAssignee(task);
				} catch (SecureException | DAOException e) {
					setError(e);
					
				}
			}
		}
	}
}
