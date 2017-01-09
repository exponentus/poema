package welcome.page.form;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.MessageType;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

import administrator.dao.LanguageDAO;
import administrator.model.Language;

public class Index extends _DoPage {

	@Override
	public void doGET(_Session session, _WebFormData formData) throws Exception {

		String toLang = formData.getValueSilently("lang");
		try {
			LanguageCode l = LanguageCode.ENG;
			if (toLang.length() > 0) {
				l = LanguageCode.valueOf(toLang.toUpperCase().trim());
				session.setLang(l);
			} else if (session.getLang() == null) {
				session.setLang(LanguageCode.ENG);
			}
			addValue("template",getCurrentAppEnv().templates.getTemplate(MessageType.SITE, "faq", l));
		} catch (Exception e) {
			addContent("error", "the " + toLang + " language is not available");
		}

		LanguageDAO lDao = new LanguageDAO(session);
		List<Language> lList = new ArrayList<>();
		try {
			lList.add(lDao.findByCode(LanguageCode.ENG));
			lList.add(lDao.findByCode(LanguageCode.BUL));
			lList.add(lDao.findByCode(LanguageCode.RUS));
			lList.add(lDao.findByCode(LanguageCode.SPA));
			lList.add(lDao.findByCode(LanguageCode.POR));
			lList.add(lDao.findByCode(LanguageCode.KAZ));
		} catch (Exception e) {
		}
		addContent(lList);
	}

}
