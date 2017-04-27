package projects.page;

import com.exponentus.env.Environment;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPage;

public class Index extends _DoPage {

    @Override
    public void doGET(_Session session, WebFormData formData) {
        addValue("logo", Environment.orgLogo);
    }
}
