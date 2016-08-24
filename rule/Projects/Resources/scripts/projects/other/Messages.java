package projects.other;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.exception.MsgException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.messaging.slack.SlackAgent;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;

public class Messages {

	public static void sendMessageOfNewProject(_Session session, Project project) throws MsgException {
		AppEnv appEnv = session.getAppEnv();
		LanguageCode lang = session.getLang();
		UserDAO userDAO = new UserDAO(session);
		List<String> recipients = new ArrayList<>();

		Memo memo = new Memo(appEnv.vocabulary.getWord("notify_about_new_project_short", lang),
		        appEnv.templates.getTemplate(MessageType.EMAIL, "newproject", lang));
		IUser<Long> manager = userDAO.findById(project.getManager());
		recipients.add(manager.getEmail());
		memo.addVar("manager", manager.getUserName());
		IUser<Long> programmer = userDAO.findById(project.getProgrammer());
		recipients.add(programmer.getEmail());
		memo.addVar("programmer", programmer.getUserName());
		String testerName = "";
		if (project.getTester() > 0) {
			IUser<Long> tester = userDAO.findById(project.getTester());
			recipients.add(tester.getEmail());
			testerName = tester.getUserName();
		}
		memo.addVar("tester", testerName);
		memo.addVar("projectName", project.getName());
		memo.addVar("author", userDAO.findById(project.getAuthor().getId()).getUserName());
		memo.addVar("url", session.getAppEnv().getURL() + "/" + project.getURL());
		MailAgent ma = new MailAgent();
		ma.sendMеssage(recipients, memo);

	}

	public static void sendMessageToAssignee(_Session session, Task task) throws MsgException {
		AppEnv appEnv = session.getAppEnv();
		LanguageCode lang = session.getLang();
		UserDAO userDAO = new UserDAO(session);
		IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
		List<String> recipients = new ArrayList<>();

		recipients.add(assigneeUser.getEmail());

		String msgTemplate = task.getParent() != null ? "new_subtask" : "newtask";

		MailAgent ma = new MailAgent();
		Memo memo = new Memo(appEnv.vocabulary.getWord("notify_about_new_task_short", lang),
		        appEnv.templates.getTemplate(MessageType.EMAIL, msgTemplate, lang));
		memo.addVar("assignee", assigneeUser.getUserName());
		memo.addVar("title", task.getTitle());
		memo.addVar("content", task.getBody());
		memo.addVar("author", task.getAuthor().getUserName());
		memo.addVar("url", session.getAppEnv().getURL() + "/" + task.getURL());
		ma.sendMеssage(recipients, memo);

		User user = null;
		try {
			user = (User) assigneeUser;
		} catch (ClassCastException e) {
			return;
		}

		String slackAddr = user.getSlack();
		if (slackAddr != null && !slackAddr.equals("")) {
			recipients.clear();
			recipients.add(slackAddr);

			SlackAgent sa = new SlackAgent();
			memo = new Memo(appEnv.vocabulary.getWord("notify_about_new_task_short", lang),
			        appEnv.templates.getTemplate(MessageType.SLACK, msgTemplate, lang));
			memo.addVar("assignee", assigneeUser.getUserName());
			memo.addVar("title", task.getTitle());
			memo.addVar("content", task.getBody());
			memo.addVar("author", task.getAuthor().getUserName());
			memo.addVar("url", session.getAppEnv().getURL() + "/" + task.getURL());
			sa.sendMеssage(slackAddr, memo.getPlainBody());
		}

	}

	public static void sendMessageOfNewRequest(_Session session, Request request, Task task) throws MsgException {
		AppEnv appEnv = session.getAppEnv();
		LanguageCode lang = session.getLang();
		List<String> recipients = new ArrayList<>();

		recipients.add(task.getAuthor().getEmail());

		Memo memo = new Memo(appEnv.vocabulary.getWord("notify_about_task_request", lang),
		        appEnv.templates.getTemplate(MessageType.EMAIL, "newrequest", lang));
		memo.addVar("taskTitle", task.getTitle());
		memo.addVar("requestType", request.getRequestType().getLocalizedName(lang));
		memo.addVar("comment", request.getComment());
		memo.addVar("author", request.getAuthor().getUserName());
		memo.addVar("url", session.getAppEnv().getURL() + "/" + request.getURL());

		MailAgent ma = new MailAgent();
		ma.sendMеssage(recipients, memo);

	}

	public static void sendMessageOfRequestDecision(_Session session, Request request) throws MsgException {
		AppEnv appEnv = session.getAppEnv();
		LanguageCode lang = session.getLang();
		List<String> recipients = new ArrayList<>();

		UserDAO userDAO = new UserDAO(session);
		IUser<Long> assigneeUser = userDAO.findById(request.getTask().getAssignee());
		recipients.add(assigneeUser.getEmail());

		Memo memo = new Memo(appEnv.vocabulary.getWord("notify_about_request_resolution", lang),
		        appEnv.templates.getTemplate(MessageType.EMAIL, "request_resolution", lang));
		memo.addVar("taskTitle", request.getTask().getTitle());
		memo.addVar("taskAuthor", request.getTask().getAuthor().getUserName());
		memo.addVar("requestType", request.getRequestType().getName());
		memo.addVar("requestComment", request.getComment());
		memo.addVar("requestResolution", request.getResolution().name());
		memo.addVar("url", session.getAppEnv().getURL() + "/" + request.getURL());

		MailAgent ma = new MailAgent();
		ma.sendMеssage(recipients, memo);

	}
}
