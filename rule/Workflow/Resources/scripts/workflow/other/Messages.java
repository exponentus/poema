package workflow.other;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.MsgException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.log.Log4jLogger;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.messaging.slack.SlackAgent;

import administrator.model.User;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;

public class Messages {
	protected static Log4jLogger logger = new Log4jLogger("Messaging");
	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private static final String MSG_TEMPLATE = "notify_to_approve";

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
	}

	public void notifyApprovers(IApproval approval, String title) {
		List<Approver> approvers = new ArrayList<Approver>();
		try {

			if (approval.getStatus() == ApprovalStatusType.PROCESSING) {
				List<Block> blocks = approval.getBlocks();
				for (Block block : blocks) {
					if (block.getStatus() == ApprovalStatusType.PROCESSING) {
						List<Approver> allApprovers = block.getApprovers();
						for (Approver approver : allApprovers) {
							if (approver.isCurrent()) {
								approvers.add(approver);
							}
						}
					}
				}
			}

			for (Approver currentApprover : approvers) {
				sendToApprover(approval, currentApprover, title);
			}
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}
	}

	public void notifyToSign(Approver approver) {

	}

	private void sendToApprover(IApproval approval, Approver currentApprover, String title) throws MsgException {
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

		memo.addVar("url", appEnv.getURL() + "/" + approval.getURL() + "&lang=" + lang);

		if (user != null) {
			String slackAddr = user.getSlack();
			if (slackAddr != null && !slackAddr.equals("")) {
				SlackAgent sa = new SlackAgent();
				String template = appEnv.templates.getTemplate(MessageType.SLACK, MSG_TEMPLATE, lang);
				if (template != null && sa.sendMessage(slackAddr, memo.getPlainBody(template))) {
					return;
				}
			}

			List<String> recipients = new ArrayList<>();
			recipients.add(user.getEmail());
			MailAgent ma = new MailAgent();
			ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_to_approve", lang),
					memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, MSG_TEMPLATE, lang)));
		}
	}

}