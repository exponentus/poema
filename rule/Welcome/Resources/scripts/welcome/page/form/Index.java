package welcome.page.form;

import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.messaging.MessagingType;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPage;

import administrator.dao.LanguageDAO;

public class Index extends _DoPage {

	@Override
	public void doGET(_Session session, WebFormData formData) throws Exception {

		String toLang = formData.getValueSilently("lang");
		try {
			LanguageCode l = LanguageCode.ENG;
			if (toLang.length() > 0) {
				l = LanguageCode.valueOf(toLang.toUpperCase().trim());
				session.setLanguage(l);
			} else if (session.getLang() == null) {
				session.setLanguage(LanguageCode.ENG);
			}
			addValue("template", getCurrentAppEnv().templates.getTemplate(MessagingType.SITE, "faq", l));
		} catch (Exception e) {
			addContent("error", "the " + toLang + " language is not available");
		}

		LanguageDAO lDao = new LanguageDAO(session);

		addContent(lDao.findAllActivated());
	}

}
