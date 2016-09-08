package projects.scheduled;

import java.util.Date;
import java.util.List;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoScheduledTask;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.model.Tag;

public class ExpiredTracking extends _DoScheduledTask {
	private static final String EXPIRED_TAG_NAME = "expired";

	@Override
	public void doEvery5Min(_Session session) {

	}

	@Override
	public void doEvery1Hour(_Session session) {

	}

	@Override
	public void doEveryNight(_Session session) {
		TagDAO tagDAO = new TagDAO(session);
		Tag tag = tagDAO.findByName(EXPIRED_TAG_NAME);
		if (tag != null) {
			Date current = new Date();
			TaskDAO tDao = new TaskDAO(session);
			TaskFilter filter = new TaskFilter();
			filter.setStatus(TaskStatusType.PROCESSING);
			ViewPage<Task> result = tDao.findAllByTaskFilter(filter, 0, 0);
			for (Task task : result.getResult()) {
				if (current.after(task.getDueDate())) {
					if (!task.getTags().contains(tag)) {
						List<Tag> tags = task.getTags();
						tags.add(tag);
						task.setTags(tags);
						try {
							tDao.update(task);
							logger.infoLogEntry("The task \"" + task.getRegNumber() + "\" was marked as \"" + tag.getName() + "\"");
						} catch (SecureException e) {
							setError(e);
						}
					}
				} else {
					if (task.getTags().contains(tag)) {
						List<Tag> tags = task.getTags();
						tags.remove(tag);
						task.setTags(tags);
						try {
							tDao.update(task);
							logger.infoLogEntry("The task \"" + task.getRegNumber() + "\" was unmarked as \"" + tag.getName() + "\"");
						} catch (SecureException e) {
							setError(e);
						}
					}
				}
			}
		}
	}

}
