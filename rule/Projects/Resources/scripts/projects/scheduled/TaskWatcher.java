package projects.scheduled;

import java.util.Date;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.MsgException;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoScheduledTask;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;

public class TaskWatcher extends _DoScheduledTask {

	@Override
	public void doEvery5Min(_Session session) {

	}

	@Override
	public void doEvery1Hour(_Session session) {
		Date current = new Date();
		TaskDAO tDao = new TaskDAO(session);
		TaskFilter filter = new TaskFilter();
		filter.setStatus(TaskStatusType.WAITING);
		ViewPage<Task> result = tDao.findAllByTaskFilter(filter, 0, 0);
		for (Task task : result.getResult()) {
			if (current.after(task.getStartDate())) {
				task.setStatus(TaskStatusType.PROCESSING);
				try {
					tDao.update(task);
					logger.infoLogEntry("The task \"" + task.getTitle() + "\" was put in processing");
					Messages.sendMessageToAssignee(session, task);
				} catch (SecureException e) {
					setError(e);
				} catch (MsgException e) {
					setError(e);
				}
			}
		}
	}

	@Override
	public void doEveryNight(_Session session) {

	}

}
