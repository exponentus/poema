package projects.task;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.init.ModuleConst;
import projects.model.Project;
import projects.model.Task;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Command(name = ModuleConst.CODE + "_pending_reminder", trigger = Trigger.EVERY_NIGHT)
public class PendingReminder extends Do {
	private TaskDAO tDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			tDao = new TaskDAO(session);
			List<Task> vp = tDao.findAllByTaskFilter(new TaskFilter().setStatus(StatusType.PENDING));
			processRemind(vp, session);
		} catch (DAOException e) {
			logError(e);
			return;
		}
	}

	private void processRemind(List<Task> taskList, _Session session) {
		List<Task> tasks = new ArrayList<>();
		for (Task task : taskList) {
			tasks.add(task);
		}
		sendNotify(session, tasks);
	}

	private void sendNotify(_Session session, List<Task> tasks) {
		try {
			if (tasks.size() > 0) {
				UserDAO userDAO = new UserDAO(session);
				List<User> allUsers = userDAO.findAll();
				for (User user : allUsers) {
					Memo memo = new Memo();
					List<TaskString> tasksFtu = new ArrayList<>();
					int tasksCount = 0;
					for (Task task : tasks) {
						if (user.getId().equals(task.getAuthor().getId())) {
							tasksFtu.add(new TaskString(task, session));
							tasksCount++;
						}
					}
					if (tasksCount > 0) {
						memo.addVar("tasks", tasksFtu);
						memo.addVar("currentDate", TimeUtil.dateToStringSilently(new Date()));
						memo.addVar("tasksCount", tasksCount);
						memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#");
						IUser u = userDAO.findById(user.getId());
						LanguageCode userLang = u.getDefaultLang();
						memo.addVar("lang", "&lang=" + userLang);
						memo.addVar("user", user.getUserName());
						memo.addVar("to_unsubscr",
								Environment.getFullHostName() + "/Projects" + EnvConst.REST_PREFIX + "/service/messaging/unsubcribemail/");

						String body = getCurrentAppEnv().templates.getTemplate(MessagingType.EMAIL, "task_pending", userLang);
						List<String> recipients = new ArrayList<>();
						recipients.add(user.getEmail());
						MailAgent ma = new MailAgent("task_pending");
						ma.sendMessage(recipients, getCurrentAppEnv().getVocabulary().getWord("notify_about_pending_task", userLang),
								memo.getBody(body));
					}
				}
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public class TaskString {
		private String title;
		private String url;
		private String author;
		private String regNumber;
		private Project project;
		private String assignee;

		public TaskString(Task task, _Session session) throws DAOException {
			UserDAO userDAO = new UserDAO(session);
			IUser assigneeUser = userDAO.findById(task.getAssignee());
			this.title = task.getTitle();
			this.regNumber = task.getRegNumber();
			this.url = task.getURL();
			this.author = task.getAuthor().getUserName();
			this.assignee = assigneeUser.getUserName();
			this.project = task.getProject();
		}

		public String getTitle() {
			return title;
		}

		public String getUrl() {
			return url;
		}

		public String getAuthor() {
			return author;
		}

		public String getRegNumber() {
			return regNumber;
		}

		public String getAssignee() {
			return assignee;
		}

		public Project getProject() {
			return project;
		}
	}

}
