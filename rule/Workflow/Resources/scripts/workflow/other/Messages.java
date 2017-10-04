package workflow.other;

import administrator.model.User;
import com.exponentus.appenv.AppEnv;
import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.domain.exception.ApprovalExceptionType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.constants.ApprovalType;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.common.model.embedded.IApproval;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.exception.MsgException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.log.CommonLogger;
import com.exponentus.log.Lg;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.messaging.slack.SlackAgent;
import com.exponentus.user.IUser;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.embedded.AssigneeEntry;

import java.util.ArrayList;
import java.util.List;

public class Messages {
	protected static CommonLogger logger = new CommonLogger("Messaging");
	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private static final String NOTIFY_ASSIGNEE_TEMPLATE = "notify_assignee";
	private static final String NOTIFY_ADDRESSEE_TEMPLATE = "notify_addressee";
	private static final String NOTIFY_TO_APPROVE_TEMPLATE = "notify_to_approve";
	private static final String NOTIFY_TO_SIGN_TEMPLATE = "notify_to_sign";
	private static final String NOTIFY_PROJECT_AUTHOR_TEMPLATE = "notify_project_author";

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
	}

	public void notifyAssignees(Assignment rez) {
		IUser user = null;

		Memo memo = new Memo();
		memo.addVar("title", rez.getTitle());
		memo.addVar("author", rez.getAuthor().getUserName());

		memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + rez.getURL() + "&lang=" + lang);

		for (AssigneeEntry entry : rez.getAssigneeEntries()) {

			try {
				user = entry.getAssignee().getUser();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			if (user != null) {
				try {
					String slackAddr = user.getSlack();
					if (slackAddr != null && !slackAddr.equals("")) {
						SlackAgent sa = new SlackAgent(NOTIFY_ASSIGNEE_TEMPLATE);
						String template = appEnv.templates.getTemplate(MessagingType.SLACK, NOTIFY_ASSIGNEE_TEMPLATE, lang);
						if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
							return;
						}
					}

					List<String> recipients = new ArrayList<>();
					recipients.add(user.getEmail());
					MailAgent ma = new MailAgent(NOTIFY_ASSIGNEE_TEMPLATE);
					ma.sendMessage(recipients, appEnv.getVocabulary().getWord(NOTIFY_ASSIGNEE_TEMPLATE, lang),
							memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, NOTIFY_ASSIGNEE_TEMPLATE, lang)));
				} catch (MsgException e) {
					logger.exception(e);
				}
			}
		}

	}

	public void notifyAddressee(Incoming incoming) {
		IUser user = null;

		try {
			user = incoming.getAddressee().getUser();
			lang = user.getDefaultLang();
		} catch (ClassCastException e) {

		}

		Memo memo = new Memo();
		memo.addVar("title", incoming.getTitle());
		memo.addVar("author", incoming.getAuthor().getUserName());

		memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + incoming.getURL() + "&lang=" + lang);

		if (user != null) {
			try {
				String slackAddr = user.getSlack();
				if (slackAddr != null && !slackAddr.equals("")) {
					SlackAgent sa = new SlackAgent(NOTIFY_ADDRESSEE_TEMPLATE);
					String template = appEnv.templates.getTemplate(MessagingType.SLACK, NOTIFY_ADDRESSEE_TEMPLATE, lang);
					if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
						return;
					}
				}

				List<String> recipients = new ArrayList<>();
				recipients.add(user.getEmail());
				MailAgent ma = new MailAgent(NOTIFY_ADDRESSEE_TEMPLATE);
				ma.sendMessage(recipients, appEnv.getVocabulary().getWord(NOTIFY_ADDRESSEE_TEMPLATE, lang),
						memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, NOTIFY_ADDRESSEE_TEMPLATE, lang)));
			} catch (MsgException e) {
				logger.exception(e);
			}
		}

	}

	public void notifyApprovers(IApproval approval, String title) {
		try {
			ApprovalLifecycle al = new ApprovalLifecycle(approval);
			Block block = al.getCurrentBlock();
			for (Approver currentApprover : ApprovalLifecycle.getCurrentApprovers(block)) {
				try {
					if (block.getType() == ApprovalType.SIGNING) {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_SIGN_TEMPLATE);
					} else {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_APPROVE_TEMPLATE);
					}
				} catch (MsgException e) {
					logger.exception(e);
				}
			}
		} catch (ApprovalException e) {
			if (e.getType() != ApprovalExceptionType.WRONG_STATUS) {
				logger.exception(e);
			}
		}

	}

	public void notifyAuthor(IApproval approval, String title) {
		User user = null;
		if (approval.getApprovalStatus() == ApprovalStatusType.FINISHED) {
			try {
				user = (User) approval.getAuthor();
				lang = user.getDefaultLang();
			} catch (ClassCastException e) {

			}

			Memo memo = new Memo();
			memo.addVar("title", title);
			memo.addVar("author", approval.getAuthor().getUserName());
			memo.addVar("result", appEnv.getVocabulary().getWord(approval.getApprovalResult().name(), lang));

			memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + approval.getURL() + "&lang=" + lang);

			if (user != null) {
				try {
					String slackAddr = user.getSlack();
					if (slackAddr != null && !slackAddr.equals("")) {
						SlackAgent sa = new SlackAgent(NOTIFY_PROJECT_AUTHOR_TEMPLATE);
						String template = appEnv.templates.getTemplate(MessagingType.SLACK, NOTIFY_PROJECT_AUTHOR_TEMPLATE, lang);
						if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
							return;
						}
					}

					List<String> recipients = new ArrayList<>();
					recipients.add(user.getEmail());
					MailAgent ma = new MailAgent(NOTIFY_PROJECT_AUTHOR_TEMPLATE);
					ma.sendMessage(recipients, appEnv.getVocabulary().getWord(NOTIFY_PROJECT_AUTHOR_TEMPLATE, lang),
							memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, NOTIFY_PROJECT_AUTHOR_TEMPLATE, lang)));
				} catch (MsgException e) {
					logger.exception(e);
				}
			}
		}
	}

	public void notifyRecipient(IApproval approval, String title) {
		try {
			ApprovalLifecycle al = new ApprovalLifecycle(approval);
			Block block = al.getCurrentBlock();
			for (Approver currentApprover : ApprovalLifecycle.getCurrentApprovers(block)) {
				try {
					if (block.getType() == ApprovalType.SIGNING) {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_SIGN_TEMPLATE);
					} else {
						sendToApprover(approval, currentApprover, title, NOTIFY_TO_APPROVE_TEMPLATE);
					}
				} catch (MsgException e) {
					logger.exception(e);
				}
			}
		} catch (ApprovalException e) {
			if (e.getType() != ApprovalExceptionType.WRONG_STATUS) {
				logger.exception(e);
			}
		}

	}

	private void sendToApprover(IApproval approval, Approver currentApprover, String title, String templateName) throws MsgException {
		IUser user = null;

		Memo memo = new Memo();
		memo.addVar("approver", currentApprover.getEmployee().getName());
		memo.addVar("title", title);
		memo.addVar("author", approval.getAuthor().getUserName());

		try {
			user = currentApprover.getEmployee().getUser();
			lang = user.getDefaultLang();
		} catch (ClassCastException e) {

		}

		memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#" + approval.getURL() + "&lang=" + lang);

		if (user != null) {
			String slackAddr = user.getSlack();
			if (slackAddr != null && !slackAddr.equals("")) {
				SlackAgent sa = new SlackAgent(NOTIFY_PROJECT_AUTHOR_TEMPLATE);
				String template = appEnv.templates.getTemplate(MessagingType.SLACK, templateName, lang);
				if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
					return;
				}
			}

			List<String> recipients = new ArrayList<>();
			recipients.add(user.getEmail());
			MailAgent ma = new MailAgent(NOTIFY_PROJECT_AUTHOR_TEMPLATE);
			ma.sendMessage(recipients, appEnv.getVocabulary().getWord(templateName, lang),
					memo.getBody(appEnv.templates.getTemplate(MessagingType.EMAIL, templateName, lang)));
		}
	}

	public void notifyOfAccepting(IApproval entity, String title) {
		Lg.debug("----notify simulation about accepting a document----");

	}

	public void notifyOfRejecting(IApproval entity, String title) {
		Lg.debug("----notify simulation about rejecting a document----");

	}

}