package projects.other;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.exception.MsgException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import projects.model.Task;

public class Messages {
	public static void sendMessageToAssignee(_Session session, Task task) throws MsgException {
		AppEnv appEnv = session.getAppEnv();
		LanguageCode lang = session.getLang();
		UserDAO userDAO = new UserDAO(session);
		IUser<Long> assigneeUser = userDAO.findById(task.getAssignee());
		List<String> recipients = new ArrayList<>();

		recipients.add(((User) assigneeUser).getEmail());

		String mailTemplate = task.getParent() != null ? "new_subtask" : "newtask";

		MailAgent ma = new MailAgent();
		Memo memo = new Memo(appEnv.vocabulary.getWord("notify_about_new_task_short", lang),
		        appEnv.templates.getTemplate(MessageType.EMAIL, mailTemplate, lang));
		memo.addVar("assignee", assigneeUser.getUserName());
		memo.addVar("title", task.getTitle());
		memo.addVar("content", task.getBody());
		memo.addVar("author", task.getAuthor().getUserName());
		memo.addVar("url", session.getAppEnv().getURL() + "/" + task.getURL());
		ma.sendMеssage(memo, recipients);

	}
}
