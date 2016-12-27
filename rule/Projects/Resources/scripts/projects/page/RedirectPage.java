package projects.page;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

public class RedirectPage extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        String path = "/" + getCurrentAppEnv().appName + "/#/" + getCurrentAppEnv().appName;
        String id = formData.getValueSilently("id");

        switch (id) {
            case "project-form":
                addContent("redirect", path + "/projects/" + formData.getValueSilently("projectId"));
                break;
            case "demand-form":
                addContent("redirect", path + "/demands/" + formData.getValueSilently("demandId"));
                break;
            case "task-form":
                addContent("redirect", path + "/task/" + formData.getValueSilently("taskId"));
                break;
            case "task-requests":
                addContent("redirect", path + "/requests/" + formData.getValueSilently("requestId"));
                break;
        }
    }
}
