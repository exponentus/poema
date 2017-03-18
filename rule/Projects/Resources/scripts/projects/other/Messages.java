package projects.other;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.exponentus.appenv.AppEnv;
import com.exponentus.env.EnvConst;
import com.exponentus.localization.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.log.Log4jLogger;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.messaging.slack.SlackAgent;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;
import reference.model.RequestType;

public class Messages {
	protected static Log4jLogger logger = new Log4jLogger("Messaging");

	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private Vocabulary v;

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
		v = appEnv.vocabulary;
	}

	public void sendOfNewProject(Project project) {
		try {
			UserDAO userDAO = new UserDAO();
			Set<IUser<Long>> recipients = new HashSet<>();
			String msgTemplate = "new_project";

			Memo memo = new Memo();
			IUser<Long> manager = userDAO.findById(project.getManager());
			recipients.add(manager);
			memo.addVar("manager", manager.getUserName());
			IUser<Long> programmer = userDAO.findById(project.getProgrammer());
			recipients.add(programmer);
			memo.addVar("programmer", programmer.getUserName());
			String testerName = "";
			if (project.getTester() > 0) {
				IUser<Long> tester = userDAO.findById(project.getTester());
				recipients.add(tester);
				testerName = tester.getUserName();
			}
			memo.addVar("tester", testerName);
			memo.addVar("projectName", project.getName());
			memo.addVar("author", userDAO.findById(project.getAuthor().getId()).getUserName());

			List<String> mailRecipients = new ArrayList<>();
			for (IUser<Long> u : recipients) {
				try {
					mailRecipients.add(((User) u).getEmail());
				} catch (ClassCastException e) {

				}
			}

			lang = project.getPrimaryLanguage();

			memo.addVar("url", appEnv.getURL() + "/" + project.getURL() + "&lang=" + lang);
			MailAgent ma = new MailAgent();
			// ma.description = "notify about new project";
			ma.sendMessage(mailRecipients, appEnv.vocabulary.getWord("notify_about_new_project_short", lang),
					memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));

		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

	public void sendToAssignee(Task task) {
		try {
			UserDAO userDAO = new UserDAO();
			IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
			String msgTemplate = "new_task";
			User user = null;

			Memo memo = new Memo();
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			memo.addVar("content", task.getBody());
			memo.addVar("author", task.getAuthor().getUserName());

			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", appEnv.getURL() + "/" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent();
					String template = appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_about_new_task_short", lang),
						memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

	public void sendOfNewRequest(Request request, Task task) {
		try {
			String msgTemplate = "new_request";
			Memo memo = new Memo();
			memo.addVar("title", task.getTitle());
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("comment", request.getComment());
			memo.addVar("author", request.getAuthor().getUserName());

			User user = null;

			try {
				user = (User) task.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", appEnv.getURL() + "/" + task.getURL() + "&lang=" + lang);
			RequestType rt = request.getRequestType();
			memo.addVar("requestType", rt.getLocName(lang));

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent();
					String template = appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_about_task_request", lang),
						memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

	public void sendMessageOfRequestDecision(Request request) {
		try {
			String msgTemplate = "request_resolution";
			UserDAO userDAO = new UserDAO();
			IUser<Long> assigneeUser = userDAO.findById(request.getTask().getAssignee());
			User user = null;

			Memo memo = new Memo();
			memo.addVar("regNumber", request.getTask().getRegNumber());
			memo.addVar("taskAuthor", request.getTask().getAuthor().getUserName());
			memo.addVar("requestType", request.getRequestType().getName());
			memo.addVar("requestComment", request.getComment());

			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", appEnv.getURL() + "/" + request.getURL() + "&lang=" + lang);
			memo.addVar("requestResolution", v.getWord(request.getResolution().name(), lang));

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent();
					String template = appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}

				}

				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients,
						v.getWord("notify_about_request_resolution", lang) + " ["
								+ v.getWord(request.getResolution().name(), lang) + "]",
						memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

	public void sendOfNewAcknowledging(Task task) {
		try {
			String msgTemplate = "task_acknowledged";
			UserDAO userDAO = new UserDAO();

			Memo memo = new Memo();
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("author", task.getAuthor().getUserName());

			User user = null;

			try {
				user = (User) task.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", appEnv.getURL() + "/" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent();
					String template = appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_about_task_acknowledged", lang),
						memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}

	}

	public void sendOfTaskCompleted(Task task) {
		try {
			String msgTemplate = "task_completed";
			UserDAO userDAO = new UserDAO();

			Memo memo = new Memo();
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("author", task.getAuthor().getUserName());

			User user = null;

			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", appEnv.getURL() + "/" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent();
					String template = appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(user.getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_about_finish_task", lang),
						memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}
	}

	public void sendOfTaskCancelled(Task task) {
		if (task.getAssignee() != task.getAuthor().getId()) {
			try {
				String msgTemplate = "task_cancelled";
				UserDAO userDAO = new UserDAO();

				Memo memo = new Memo();
				memo.addVar("regNumber", task.getRegNumber());
				memo.addVar("title", task.getTitle());
				IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
				memo.addVar("assignee", assigneeUser.getUserName());
				memo.addVar("author", task.getAuthor().getUserName());

				User user = null;

				try {
					user = (User) assigneeUser;
					lang = user.getDefaultLang();
				} catch (ClassCastException e) {

				}

				memo.addVar("url", appEnv.getURL() + "/" + task.getURL() + "&lang=" + lang);

				if (user != null) {
					String slackAddr = user.getSlack();
					if (slackAddr != null && !slackAddr.equals("")) {
						SlackAgent sa = new SlackAgent();
						String template = appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang);
						if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
							return;
						}
					}

					List<String> recipients = new ArrayList<>();
					recipients.add(user.getEmail());
					MailAgent ma = new MailAgent();
					ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_about_cancel_task", lang),
							memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang)));
				}
			} catch (Exception e) {
				logger.errorLogEntry(e);
			}
		}
	}
}
