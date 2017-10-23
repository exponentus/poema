package projects.task;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.appenv.AppEnv;
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
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.init.AppConst;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.init.DataConst;
import reference.model.Tag;

import java.util.ArrayList;
import java.util.List;

@Command(name = AppConst.CODE + "_overdue_reminder", trigger = Trigger.DISABLE)
public class OverdueReminder extends Do {
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			TagDAO tagDAO = new TagDAO(session);
			tag = tagDAO.findByName(DataConst.EXPIRED_TAG_NAME);
			List<Tag> tags = new ArrayList<>();
			tags.add(tag);
			if (tag != null) {
				tDao = new TaskDAO(session);
				List<Task> tl = tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.PROCESSING).setTags(tags));
				tl.addAll(tDao.findAllByTaskFilter(new TaskFilter().setStatus(TaskStatusType.OPEN).setTags(tags)));
				processRemind(tl, session);
			}
		} catch (DAOException e) {
			Server.logger.exception(e);
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
						memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#");
						IUser i_user = userDAO.findById(user.getId());
						LanguageCode user_lang = i_user.getDefaultLang();
						memo.addVar("lang", "&lang=" + user_lang);
						memo.addVar("user", user.getUserName());

						String body = getCurrentAppEnv().templates.getTemplate(MessagingType.EMAIL, "task_overdued", user_lang);
						List<String> recipients = new ArrayList<>();
						recipients.add(user.getEmail());
						MailAgent ma = new MailAgent("task_overdued");
						ma.sendMessage(recipients, getCurrentAppEnv().getVocabulary().getWord("notify_about_overdued_task", user_lang),
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
