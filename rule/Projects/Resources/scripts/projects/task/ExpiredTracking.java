package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.scheduler.PeriodicalServices;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import org.apache.commons.lang3.time.DateUtils;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.init.AppConst;
import projects.model.Task;
import reference.dao.TagDAO;
import reference.init.DataConst;
import reference.model.Tag;

import java.util.Date;
import java.util.List;

@Command(name = AppConst.CODE + "_expired_tracking", trigger = Trigger.EVERY_NIGHT)
public class ExpiredTracking extends Do {
	private Date current = new Date();
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		PeriodicalServices.logger("expired_tracking is going to check documents");
		try {
			TagDAO tagDAO = new TagDAO(session);
			tag = tagDAO.findByName(DataConst.EXPIRED_TAG_NAME);
			if (tag != null) {
				tDao = new TaskDAO(session);
				processTask(appEnv, tDao.findAllByTaskFilter(new TaskFilter().setStatus(StatusType.PROCESSING)), session);
				processTask(appEnv, tDao.findAllByTaskFilter(new TaskFilter().setStatus(StatusType.OPEN)), session);
			} else {
				logger.warning("The tag \"" + DataConst.EXPIRED_TAG_NAME + "\" did not find in Reference");
			}
		} catch (DAOException e) {
			logger.exception(e);
		}

	}

	private void processTask(AppEnv env, List<Task> tasks, _Session session) {
		for (Task task : tasks) {
			if (current.after(DateUtils.addDays(task.getDueDate(), 1))) {
				if (!task.getTags().contains(tag)) {
					List<Tag> tags = task.getTags();
					tags.add(tag);
					task.setTags(tags);
					try {
						tDao.update(task);
						logger.info("The task \"" + task.getRegNumber() + "\" was marked as \"" + tag.getName() + "\"");
					} catch (SecureException | DAOException e) {
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
						logger.info("The task \"" + task.getRegNumber() + "\" was unmarked as \"" + tag.getName() + "\"");
					} catch (SecureException | DAOException e) {
						setError(e);
					}
				}
			}
		}
	}
}
