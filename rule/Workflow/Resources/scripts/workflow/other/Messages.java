package workflow.other;

import com.exponentus.appenv.AppEnv;
import com.exponentus.env.EnvConst;
import com.exponentus.localization.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.log.Log4jLogger;

public class Messages {
	protected static Log4jLogger logger = new Log4jLogger("Messaging");

	private LanguageCode lang = EnvConst.getDefaultLang();
	private AppEnv appEnv;
	private Vocabulary v;

	public Messages(AppEnv appEnv) {
		this.appEnv = appEnv;
		v = appEnv.vocabulary;
	}

}