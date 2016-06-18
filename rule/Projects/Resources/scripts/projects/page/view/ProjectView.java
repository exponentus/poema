package projects.page.view;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import projects.dao.ProjectDAO;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;

public class ProjectView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        ProjectDAO projectDAO = new ProjectDAO(session);
        String statusName = formData.getValueSilently("projectStatus");
        if (statusName.isEmpty()) {
            addContent(getViewPage(projectDAO, formData));
        } else {
            int pageSize = session.pageSize;
            int pageNum = formData.getNumberValueSilently("page", 0);
            ViewPage<Project> vp = projectDAO.getProjectsByStatus(ProjectStatusType.valueOf(statusName), pageNum, pageSize);
            addContent(new _POJOListWrapper(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum(), session));
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {

    }
}
