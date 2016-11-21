package projects.scheduled;

import java.util.Date;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoScheduled;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;

public class TaskWatcher extends _DoScheduled {

	@Override
	public void doEvery5Min(AppEnv appEnv, _Session session) {

	}

	@Override
	public void doEvery1Hour(AppEnv appEnv, _Session session) {
		Date current = new Date();
		TaskDAO tDao = new TaskDAO(session);
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

	@Override
	public void doEveryNight(AppEnv appEnv, _Session session) {

	}

}
