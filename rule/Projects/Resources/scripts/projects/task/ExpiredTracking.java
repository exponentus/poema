package projects.task;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.model.Tag;

@Command(name = "expired_tracking", trigger = Trigger.EVERY_NIGHT)
public class ExpiredTracking extends Do {
	private static final String EXPIRED_TAG_NAME = "expired";
	private Date current = new Date();
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			TagDAO tagDAO = new TagDAO(session);
			tag = tagDAO.findByName(EXPIRED_TAG_NAME);
			if (tag != null) {
				tDao = new TaskDAO(session);
				processTask(appEnv, tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.PROCESSING)),
						session);
				processTask(appEnv, tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.OPEN)), session);
			} else {
				logger.warning("The tag \"" + EXPIRED_TAG_NAME + "\" did not find in Reference");
			}
		} catch (DAOException e) {
			logger.exception(e);
		}

	}

	private void processTask(AppEnv env, List<Task> tasks, _Session session) {
		for (Task task : tasks) {
			if (current.after(task.getDueDate())) {
				if (!task.getTags().contains(tag)) {
					List<Tag> tags = task.getTags();
					tags.add(tag);
					task.setTags(tags);
					try {
						tDao.update(task);
						logger.info("The task \"" + task.getRegNumber() + "\" was marked as \"" + tag.getName() + "\"");
						sendNotify(env, session, task);
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
						logger.info(
								"The task \"" + task.getRegNumber() + "\" was unmarked as \"" + tag.getName() + "\"");
					} catch (SecureException | DAOException e) {
						setError(e);
					}
				}
			}
		}
	}

	private void sendNotify(AppEnv env, _Session session, Task task) {
		try {
			UserDAO userDAO = new UserDAO(session);
			IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
			User user = null;

			LanguageCode lang = EnvConst.getDefaultLang();
			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			Memo memo = new Memo();
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			memo.addVar("content", task.getBody());
			memo.addVar("author", task.getAuthor().getUserName());
			memo.addVar("status", env.vocabulary.getWord(task.getStatus().name(), lang));
			memo.addVar("url", env.getURL() + "/" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent("task_overdued");
				ma.sendMessage(recipients, env.vocabulary.getWord("notify_about_overdued_task", lang),
						memo.getBody(env.templates.getTemplate(MessagingType.EMAIL, "task_overdued", lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

}
