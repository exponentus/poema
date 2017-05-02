package projects.task;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.model.Tag;

@Command(name = "overdue_reminder", trigger = Trigger.EVERY_NIGHT)
public class OverdueReminder extends _Do {
	private static final String EXPIRED_TAG_NAME = "expired";
	private Tag tag;
	private TaskDAO tDao;

	public void doTask(AppEnv appEnv, _Session session) {
		try {
			TagDAO tagDAO = new TagDAO(session);
			tag = tagDAO.findByName(EXPIRED_TAG_NAME);
			List<Tag> tags = new ArrayList<>();
			tags.add(tag);
			if (tag != null) {
				tDao = new TaskDAO(session);
				ViewPage<Task> vp = tDao
						.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.PROCESSING).setTags(tags), 0, 0);
				vp.merge(tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.OPEN).setTags(tags), 0, 0));
				processRemind(vp, session);
			}
		} catch (DAOException e) {
			Server.logger.exception(e);
		}
	}

	private void processRemind(ViewPage<Task> result, _Session session) {
		List<Task> tasks = new ArrayList<>();
		for (Task task : result.getResult()) {
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
					List<TaskString> tasks_ftu = new ArrayList<>();
					int tasks_count = 0;
					for (Task task : tasks) {
						if (user.getId().equals(task.getAssignee())) {
							tasks_ftu.add(new TaskString(task, session));
							tasks_count++;
						}
					}
					if (tasks_count > 0) {
						memo.addVar("tasks", tasks_ftu);
						memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_NAME + "/#");
						IUser<Long> i_user = userDAO.findById(user.getId());
						LanguageCode user_lang = i_user.getDefaultLang();
						memo.addVar("lang", "&lang=" + user_lang);
						memo.addVar("user", user.getUserName());

						String body = getCurrentAppEnv().templates.getTemplate(MessagingType.EMAIL, "task_overdued",
								user_lang);
						List<String> recipients = new ArrayList<>();
						recipients.add(user.getEmail());
						MailAgent ma = new MailAgent("task_overdued");
						ma.sendMessage(recipients,
								getCurrentAppEnv().vocabulary.getWord("notify_about_overdued_task", user_lang),
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

		public TaskString(Task task, _Session session) {
			UserDAO userDAO = new UserDAO(session);
			IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
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
