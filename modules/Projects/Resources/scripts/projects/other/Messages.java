package projects.other;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.env.EnvConst;
import com.exponentus.extconnect.IExtUser;
import com.exponentus.localization.Vocabulary;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.log.CommonLogger;
import com.exponentus.messaging.MessagingHelper;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.user.IUser;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;

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

			Memo memo = new Memo();
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("regNumber", task.getRegNumber());
			memo.addVar("title", task.getTitle());
			memo.addVar("content", task.getBody());
			memo.addVar("author", task.getAuthor().getUserName());

			try {
				User user = (User) assigneeUser;
				MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, task, "notify_about_new_task_short");
			} catch (ClassCastException e) {

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

			try {
				User user = (User) task.getAuthor();
				memo.addVar("requestType", request.getRequestType().getLocName(user.getDefaultLang()));
				MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, request, "notify_about_task_request");
			} catch (ClassCastException e) {

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

			Memo memo = new Memo();
			memo.addVar("regNumber", request.getTask().getRegNumber());
			memo.addVar("taskAuthor", request.getTask().getAuthor().getUserName());
			memo.addVar("requestType", request.getRequestType().getName());
			memo.addVar("requestComment", request.getComment());

			try {
				User user = (User) assigneeUser;
				memo.addVar("requestResolution", v.getWord(request.getResolution().name(), user.getDefaultLang()));
				MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, request, "notify_about_request_resolution");
			} catch (ClassCastException e) {

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

			try {
				User user = (User) task.getAuthor();
				MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, task,  "notify_about_task_acknowledged");
			} catch (ClassCastException e) {

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
			memo.addVar("author", task.getAuthor().getUserName());
			Block block = task.getBlocks().get(0);
			List<Approver> moderators = block.getCurrentApprovers();

			for (Approver moderator:moderators) {
				IExtUser employee = moderator.getEmployee();
				if (!employee.equals(task.getAuthor())) {
					memo.addVar("moderator", employee.getName());
					try {
						User recipient = (User) employee.getUser();
						MessagingHelper.sendInAnyWay(appEnv, recipient, memo, msgTemplate, task, "notify_about_task_to_moderate");
					} catch (ClassCastException e) {

					}
				}
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
			IExtUser employee = block.getApprovers().get(0).getEmployee();
			memo.addVar("moderator",employee.getName());

			try {
				User user = (User) task.getAuthor();
				MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, task, "notify_about_task_rejected_by_moderator");
			} catch (ClassCastException e) {

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

			try {
				User user = (User) assigneeUser;
				MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, task, "notify_about_finish_task");
			} catch (ClassCastException e) {

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

				try {
					User user = (User) assigneeUser;
					MessagingHelper.sendInAnyWay(appEnv, user, memo, msgTemplate, task, "notify_about_cancel_task");
				} catch (ClassCastException e) {

				}

			} catch (Exception e) {
				logger.exception(e);
			}
		}
	}
}
