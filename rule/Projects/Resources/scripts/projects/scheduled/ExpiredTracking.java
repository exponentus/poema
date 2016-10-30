package projects.scheduled;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoScheduledTask;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.model.Tag;

public class ExpiredTracking extends _DoScheduledTask {
	private static final String EXPIRED_TAG_NAME = "expired";
	private Date current = new Date();
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doEvery5Min(_Session session) {

	}

	@Override
	public void doEvery1Hour(_Session session) {

	}

	@Override
	public void doEveryNight(_Session session) {
		TagDAO tagDAO = new TagDAO(session);
		tag = tagDAO.findByName(EXPIRED_TAG_NAME);
		if (tag != null) {
			tDao = new TaskDAO(session);
			processTask(tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.PROCESSING), 0, 0), session);
			processTask(tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.OPEN), 0, 0), session);
		} else {
			logger.warningLogEntry("The tag \"" + EXPIRED_TAG_NAME + "\" did not find in Reference");
		}
	}

	private void processTask(ViewPage<Task> result, _Session session) {
		for (Task task : result.getResult()) {
			if (current.after(task.getDueDate())) {
				if (!task.getTags().contains(tag)) {
					List<Tag> tags = task.getTags();
					tags.add(tag);
					task.setTags(tags);
					try {
						tDao.update(task);
						logger.infoLogEntry("The task \"" + task.getRegNumber() + "\" was marked as \"" + tag.getName() + "\"");
						sendNotify(session, task);
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
						logger.infoLogEntry("The task \"" + task.getRegNumber() + "\" was unmarked as \"" + tag.getName() + "\"");
					} catch (SecureException | DAOException e) {
						setError(e);
					}
				}
			}
		}
	}

	private void sendNotify(_Session session, Task task) {
		try {
			AppEnv appEnv = session.getAppEnv();
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
			memo.addVar("status", appEnv.vocabulary.getWord(task.getStatus().name(), lang));
			memo.addVar("url", session.getAppEnv().getURL() + "/" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMеssage(recipients, appEnv.vocabulary.getWord("notify_about_overdued_task", lang),
				        memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, "task_overdued", lang)));
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

}
