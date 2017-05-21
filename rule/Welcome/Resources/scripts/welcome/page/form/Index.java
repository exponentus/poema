package welcome.page.form;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.messaging.MessagingType;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPage;

import administrator.dao.LanguageDAO;
import administrator.model.Language;

public class Index extends _DoPage {

	@Override
	public void doGET(_Session session, WebFormData formData) throws Exception {
		LanguageCode l = session.getLang();
		addValue("about_nb", getCurrentAppEnv().templates.getTemplate(MessagingType.SITE, "about_nb", l));
		addValue("about_us", getCurrentAppEnv().templates.getTemplate(MessagingType.SITE, "about_us", l));
		addValue("learning_center", getCurrentAppEnv().templates.getTemplate(MessagingType.SITE, "learning_center", l));
		addValue("cert_authority", getCurrentAppEnv().templates.getTemplate(MessagingType.SITE, "cert_authority", l));
		LanguageDAO lDao = new LanguageDAO(session);
		List<Language> lList = new ArrayList<>();
		try {
			lList.add(lDao.findByCode(LanguageCode.ENG));
			lList.add(lDao.findByCode(LanguageCode.BUL));
			lList.add(lDao.findByCode(LanguageCode.RUS));
		} catch (Exception e) {
		}
		addContent(lList);
	}

}
