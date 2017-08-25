package projects.other;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.appenv.AppEnv;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.localization.Vocabulary;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.log.CommonLogger;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.messaging.slack.SlackAgent;
import com.exponentus.user.IUser;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;
import staff.model.Employee;
import workflow.model.embedded.Block;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Messages {
	protected static CommonLogger logger = new CommonLogger("Messaging");

	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private Vocabulary v;

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
		v = appEnv.getVocabulary();
	}

	public void sendOfNewProject(Project project) {
		try {
			UserDAO userDAO = new UserDAO();
			Set<IUser> recipients = new HashSet<>();
			String msgTemplate = "new_project";

			Memo memo = new Memo();
			IUser manager = userDAO.findById(project.getManager());
			recipients.add(manager);
			memo.addVar("manager", manager.getUserName());
			IUser programmer = userDAO.findById(project.getProgrammer());
			recipients.add(programmer);
			memo.addVar("programmer", programmer.getUserName());
			String testerName = "";
			if (project.getTester() > 0) {
				IUser tester = userDAO.findById(project.getTester());
				recipients.add(tester);
				testerName = tester.getUserName();
			}
			memo.addVar("tester", testerName);
			memo.addVar("projectName", project.getName());
			memo.addVar("author", userDAO.findById(project.getAuthor().getId()).getUserName());

			List<String> mailRecipients = new ArrayList<>();
			for (IUser u : recipients) {
				try {
					mailRecipients.add(((User) u).getEmail());
				} catch (ClassCastException e) {

				}
			}

			lang = project.getPrimaryLanguage();

			memo.addVar("url", appEnv.getURL() + "/#" + project.getURL() + "&lang=" + lang);
			MailAgent ma = new MailAgent(msgTemplate);
			// ma.description = "notify about new project";
			ma.sendMessage(mailRecipients, appEnv.getVocabulary().getWord("notify_about_new_project_short", lang),
					memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));

		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendToAssignee(Task task) {
		try {
			UserDAO userDAO = new UserDAO();
			IUser assigneeUser = userDAO.findById(task.getAssignee());
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

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_new_task_short", lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendReminderToAssignee(Task task, String subject, String body) {
		try {
			UserDAO userDAO = new UserDAO();
			IUser assigneeUser = userDAO.findById(task.getAssignee());
			String msgTemplate = "reminder_to_assignee";
			User user = null;

			Memo memo = new Memo();
			memo.addVar("content", body);

			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, subject, memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
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

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);
			memo.addVar("requestType", request.getRequestType().getLocName(lang));

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_task_request", lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendMessageOfRequestDecision(Request request) {
		try {
			String msgTemplate = "request_resolution";
			UserDAO userDAO = new UserDAO();
			IUser assigneeUser = userDAO.findById(request.getTask().getAssignee());
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

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + request.getURL() + "&lang=" + lang);
			memo.addVar("requestResolution", v.getWord(request.getResolution().name(), lang));

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}

				}

				List<String> recipients = new ArrayList<>();
				recipients.add(assigneeUser.getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients,
						v.getWord("notify_about_request_resolution", lang) + " [" + v.getWord(request.getResolution().name(), lang) + "]",
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendOfNewAcknowledging(Task task) {
		try {
			String msgTemplate = "task_acknowledged";
			UserDAO userDAO = new UserDAO();

			Memo memo = new Memo();
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			IUser assigneeUser = userDAO.findById(task.getAssignee());
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("author", task.getAuthor().getUserName());

			User user = null;

			try {
				user = (User) task.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_task_acknowledged", lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendToModerate(Task task) {
		try {
			String msgTemplate = "task_to_moderate";
			UserDAO userDAO = new UserDAO();

			Memo memo = new Memo();
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			IUser assigneeUser = userDAO.findById(task.getAssignee());
			memo.addVar("assignee", assigneeUser.getUserName());
			Block block = task.getBlocks().get(0);
			Employee employee = block.getCurrentApprover().getEmployee();
			memo.addVar("moderator",employee.getName());

			User user = null;

			try {
				user = (User) task.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_task_to_moderate", lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendModeratorRejection(Task task) {
		try {
			String msgTemplate = "task_rejected_by_moderator";
			UserDAO userDAO = new UserDAO();

			Memo memo = new Memo();
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			IUser assigneeUser = userDAO.findById(task.getAssignee());
			memo.addVar("author", task.getAuthor().getUserName());
			Block block = task.getBlocks().get(0);
			Employee employee = block.getApprovers().get(0).getEmployee();
			memo.addVar("moderator",employee.getName());

			User user = null;

			try {
				user = (User) task.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(task.getAuthor().getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_task_rejected_by_moderator", lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}

	public void sendOfTaskCompleted(Task task) {
		try {
			String msgTemplate = "task_completed";
			UserDAO userDAO = new UserDAO();

			Memo memo = new Memo();
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			IUser assigneeUser = userDAO.findById(task.getAssignee());
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("author", task.getAuthor().getUserName());

			User user = null;

			try {
				user = (User) assigneeUser;
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

			if (user != null) {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(msgTemplate);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(user.getEmail());
				MailAgent ma = new MailAgent(msgTemplate);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_finish_task", lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
			}
		} catch (Exception e) {
			logger.exception(e);
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
				IUser assigneeUser = userDAO.findById(task.getAssignee());
				memo.addVar("assignee", assigneeUser.getUserName());
				memo.addVar("author", task.getAuthor().getUserName());

				User user = null;

				try {
					user = (User) assigneeUser;
					lang = user.getDefaultLang();
				} catch (ClassCastException e) {

				}

				memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + task.getURL() + "&lang=" + lang);

				if (user != null) {
					String slackAddr = user.getSlack();
					if (slackAddr != null && !slackAddr.equals("")) {
						SlackAgent sa = new SlackAgent(msgTemplate);
						String template = appEnv.templates.getTemplate(MessagingType.SLACK, msgTemplate, lang);
						if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
							return;
						}
					}

					List<String> recipients = new ArrayList<>();
					recipients.add(user.getEmail());
					MailAgent ma = new MailAgent(msgTemplate);
					ma.sendMessage(recipients, appEnv.getVocabulary().getWord("notify_about_cancel_task", lang),
							memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, msgTemplate, lang)));
				}
			} catch (Exception e) {
				logger.exception(e);
			}
		}
	}
}
