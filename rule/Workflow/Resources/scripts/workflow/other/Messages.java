package workflow.other;

import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.env.EnvConst;
import com.exponentus.localization.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.log.Log4jLogger;

import workflow.model.embedded.Approver;

public class Messages {
	protected static Log4jLogger logger = new Log4jLogger("Messaging");

	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private Vocabulary v;

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
		v = appEnv.vocabulary;
	}

	public void notifyToApprove(List<Approver> approvers) {

	}

	public void notifyToSign(Approver approver) {

	}

}