package resourcereservations.page;

import com.exponentus.env.Environment;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPage;
import com.exponentus.user.AnonymousUser;

public class Index extends _DoPage {

    @Override
    public void doGET(_Session session, WebFormData formData) {
        addValue("logo", Environment.logo);
        addValue("locale", session.getLang().getAlternateCode());

        if (!formData.containsField("skip-auth-error")
                && !formData.containsField("pwa")
                && session.getUser().getUserID().equalsIgnoreCase(AnonymousUser.USER_NAME)) {
            setUnauthorized();
        }
    }
}
