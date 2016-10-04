package welcome.page.form;

import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

import administrator.dao.LanguageDAO;

public class Index extends _DoPage {

	@Override
	public void doGET(_Session session, _WebFormData formData) throws Exception {

		String toLang = formData.getValueSilently("lang");
		try {
			if (toLang.length() > 0) {
				LanguageCode l = LanguageCode.valueOf(toLang.toUpperCase().trim());
				session.setLang(l);
			} else if (session.getLang() == null) {
				session.setLang(LanguageCode.ENG);
			}
		} catch (Exception e) {
			addContent("error", "the " + toLang + " language is not available");
		}

		addContent(new LanguageDAO(session).findAll());
	}

}
