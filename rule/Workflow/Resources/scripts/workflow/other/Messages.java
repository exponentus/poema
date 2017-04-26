package workflow.other;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.exception.MsgException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.log.Log4jLogger;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.messaging.slack.SlackAgent;

import administrator.model.User;
import reference.model.constants.ApprovalType;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;
import workflow.exception.ApprovalException;
import workflow.exception.ApprovalExceptionType;
import workflow.domain.ApprovalLifecycle;

public class Messages {
	protected static Log4jLogger logger = new Log4jLogger("Messaging");
	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private static final String NOTIFY_ASSIGNEE = "notify_assignee";
	private static final String NOTIFY_ADDRESSEE = "notify_addressee";
	private static final String NOTIFY_TO_APPROVE_TEMPLATE = "notify_to_approve";
	private static final String NOTIFY_TO_SIGN_TEMPLATE = "notify_to_sign";
	private static final String NOTIFY_PROJECT_AUTHOR = "notify_project_author";

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
	}

	public void notifyAssignees(Assignment rez) {
		User user = null;

		Memo memo = new Memo();
		memo.addVar("title", rez.getTitle());
		memo.addVar("author", rez.getAuthor().getUserName());

		memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_NAME + "/#" + rez.getURL() + "&lang=" + lang);

		for (AssigneeEntry entry : rez.getControl().getAssigneeEntries()) {

			try {
				user = (User) entry.getAssignee().getUser();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			if (user != null) {
				try {
					String slackAddr = user.getSlack();
					if (slackAddr != null && !slackAddr.equals("")) {
						SlackAgent sa = new SlackAgent();
						String template = appEnv.templates.getTemplate(MessageType.SLACK, NOTIFY_ASSIGNEE, lang);
						if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
							return;
						}
					}

					List<String> recipients = new ArrayList<>();
					recipients.add(user.getEmail());
					MailAgent ma = new MailAgent();
					ma.sendMessage(recipients, appEnv.vocabulary.getWord(NOTIFY_ASSIGNEE, lang),
							memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, NOTIFY_ASSIGNEE, lang)));
				} catch (MsgException e) {
					logger.errorLogEntry(e);
				}
			}
		}

	}

	public void notifyAddressee(Incoming incoming) {
		User user = null;

		try {
			user = (User) incoming.getAddressee().getUser();
			lang = user.getDefaultLang();
		} catch (ClassCastException e) {

		}

		Memo memo = new Memo();
		memo.addVar("title", incoming.getTitle());
		memo.addVar("author", incoming.getAuthor().getUserName());

		memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_NAME + "/#" + incoming.getURL() + "&lang=" + lang);

		if (user != null) {
			try {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent();
					String template = appEnv.templates.getTemplate(MessageType.SLACK, NOTIFY_ADDRESSEE, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(user.getEmail());
				MailAgent ma = new MailAgent();
				ma.sendMessage(recipients, appEnv.vocabulary.getWord(NOTIFY_ADDRESSEE, lang),
						memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, NOTIFY_ADDRESSEE, lang)));
			} catch (MsgException e) {
				logger.errorLogEntry(e);
			}
		}

	}

	public void notifyApprovers(IApproval approval, String title) {
		try {
			Block block = ApprovalLifecycle.getCurrentBlock(approval);
			for (Approver currentApprover : ApprovalLifecycle.getCurrentApprovers(block)) {
				try {
					if (block.getType() == ApprovalType.SIGNING) {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_SIGN_TEMPLATE);
					} else {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_APPROVE_TEMPLATE);
					}
				} catch (MsgException e) {
					logger.errorLogEntry(e);
				}
			}
		} catch (ApprovalException e) {
			if (e.getType() != ApprovalExceptionType.WRONG_STATUS) {
				logger.errorLogEntry(e);
			}
		}

	}

	public void notifyAuthor(IApproval approval, String title) {
		User user = null;
		if (approval.getStatus() == ApprovalStatusType.FINISHED) {
			try {
				user = (User) approval.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			Memo memo = new Memo();
			memo.addVar("title", title);
			memo.addVar("author", approval.getAuthor().getUserName());
			memo.addVar("result", appEnv.vocabulary.getWord(approval.getResult().name(), lang));

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_NAME + "/#" + approval.getURL() + "&lang=" + lang);

			if (user != null) {
				try {
					String slackAddr = user.getSlack();
					if (slackAddr != null && !slackAddr.equals("")) {
						SlackAgent sa = new SlackAgent();
						String template = appEnv.templates.getTemplate(MessageType.SLACK, NOTIFY_PROJECT_AUTHOR, lang);
						if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
							return;
						}
					}

					List<String> recipients = new ArrayList<>();
					recipients.add(user.getEmail());
					MailAgent ma = new MailAgent();
					ma.sendMessage(recipients, appEnv.vocabulary.getWord(NOTIFY_PROJECT_AUTHOR, lang),
							memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, NOTIFY_PROJECT_AUTHOR, lang)));
				} catch (MsgException e) {
					logger.errorLogEntry(e);
				}
			}
		}
	}

	public void notifyRecipient(IApproval approval, String title) {
		try {
			Block block = ApprovalLifecycle.getCurrentBlock(approval);
			for (Approver currentApprover : ApprovalLifecycle.getCurrentApprovers(block)) {
				try {
					if (block.getType() == ApprovalType.SIGNING) {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_SIGN_TEMPLATE);
					} else {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_APPROVE_TEMPLATE);
					}
				} catch (MsgException e) {
					logger.errorLogEntry(e);
				}
			}
		} catch (ApprovalException e) {
			if (e.getType() != ApprovalExceptionType.WRONG_STATUS) {
				logger.errorLogEntry(e);
			}
		}

	}

	private void sendToApprover(IApproval approval, Approver currentApprover, String title, String templateName)
			throws MsgException {
		User user = null;

		Memo memo = new Memo();
		memo.addVar("approver", currentApprover.getEmployee().getName());
		memo.addVar("title", title);
		memo.addVar("author", approval.getAuthor().getUserName());

		try {
			user = (User) currentApprover.getEmployee().getUser();
			lang = user.getDefaultLang();
		} catch (ClassCastException e) {

		}

		memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_NAME + "/#" + approval.getURL() + "&lang=" + lang);

		if (user != null) {
			String slackAddr = user.getSlack();
			if (slackAddr != null && !slackAddr.equals("")) {
				SlackAgent sa = new SlackAgent();
				String template = appEnv.templates.getTemplate(MessageType.SLACK, templateName, lang);
				if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
					return;
				}
			}

			List<String> recipients = new ArrayList<>();
			recipients.add(user.getEmail());
			MailAgent ma = new MailAgent();
			ma.sendMessage(recipients, appEnv.vocabulary.getWord(templateName, lang),
					memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, templateName, lang)));
		}
	}

}