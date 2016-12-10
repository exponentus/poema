package projects.scheduled;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoScheduled;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
import reference.dao.TagDAO;
import reference.model.Tag;

public class OverdueReminder extends _DoScheduled {
	private static final String EXPIRED_TAG_NAME = "expired";
	private Date current = new Date();
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doEvery5Min(AppEnv appEnv, _Session session) {

	}

	@Override
	public void doEvery1Hour(AppEnv appEnv, _Session session) {

	}

	@Override
	public void doEveryNight(AppEnv appEnv, _Session session) {
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
			Server.logger.errorLogEntry(e);
		}
	}

	private void processRemind(ViewPage<Task> result, _Session session) {
		List<Task> tasks = new ArrayList<>();
		for (Task task : result.getResult()) {
			//sendNotify(session, task);
			tasks.add(task);
		}
		sendNotify(session, tasks);
	}

	private void sendNotify(_Session session, List<Task> tasks) {
		try {
			LanguageCode lang = EnvConst.getDefaultLang();
			if(tasks.size() > 0) {
				UserDAO userDAO = new UserDAO(session);
				List<User> allUsers = userDAO.findAll();
				for (User user : allUsers) {
					Memo memo = new Memo();
					memo.addVar("user", user.getUserName());
					String body = getCurrentAppEnv().templates.getTemplate(MessageType.EMAIL, "task_overdued_title", lang);
					body += "<TABLE style='border-collapse:collapse; margin:1px 0; width:100%' cellpadding = 10px>";
					body += getCurrentAppEnv().templates.getTemplate(MessageType.EMAIL, "task_overdued_trhead", lang);
					int tasks_count = 0;
					for (Task task : tasks) {
						if(user.getId().equals(task.getAssignee())){
							body += "<TR>" +
										"<td style = 'border:1px solid #cdcdcd' width= 80px padding: 10px align=\"center\">"+task.getRegNumber()+"</td>" +
										"<td style = 'border:1px solid #cdcdcd' width= 150px padding: 10px align=\"center\">"+task.getAuthor().getUserName()+"</td>" +
										"<td style = 'border:1px solid #cdcdcd' width= 150px padding: 10px align=\"center\">" +
											"<a href=\"" + getCurrentAppEnv().getURL() + "/" + task.getProject().getURL() + "&lang=" + lang + "\">" + task.getProject().getTitle() + "</a>" +
										"</td>" +
										"<td style = 'border:1px solid #cdcdcd' width= 200px><a href=\"" + getCurrentAppEnv().getURL() + "/" + task.getURL() + "&lang=" + lang + "\">" +
										 task.getTitle() + "</a></td>" +
									"</TR>";
							tasks_count++;
						}
					}
					body += "</TABLE>";
					if(tasks_count > 0){

						List<String> recipients = new ArrayList<>();
						recipients.add(user.getEmail());
						MailAgent ma = new MailAgent();
						ma.sendMessage(recipients, getCurrentAppEnv().vocabulary.getWord("notify_about_overdued_task", lang),
								memo.getBody(body));
					}
				}
			}
			/*IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
			User user = null;


			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}


			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			memo.addVar("content", task.getBody());
			memo.addVar("author", task.getAuthor().getUserName());
			memo.addVar("status", getCurrentAppEnv().vocabulary.getWord(task.getStatus().name(), lang));
			memo.addVar("url", getCurrentAppEnv().getURL() + "/" + task.getURL() + "&lang=" + lang);
			
			if (user != null) {
				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients, getCurrentAppEnv().vocabulary.getWord("notify_about_overdued_task", lang),
						memo.getBody(
								getCurrentAppEnv().templates.getTemplate(MessageType.EMAIL, "task_overdued", lang)));
			}*/
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

}
