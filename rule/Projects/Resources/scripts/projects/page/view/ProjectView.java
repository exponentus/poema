package projects.page.view;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import projects.dao.ProjectDAO;
import projects.model.Project;

public class ProjectView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        ProjectDAO projectDAO = new ProjectDAO(session);
        String keyWord = formData.getAnyValueSilently("keyWord");
        int pageSize = 200; // session.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);
        ViewPage<Project> vp = projectDAO.findProjects(keyWord, pageNum, pageSize);
        addContent(new _POJOListWrapper(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum(), session));
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        ProjectDAO projectDAO = new ProjectDAO(session);
        for (String id : formData.getListOfValuesSilently("projectIds")) {
            Project m = projectDAO.findById(id);
            try {
                m.setAttachments(null); // if no on delete cascade
                projectDAO.delete(m);
            } catch (SecureException e) {
                setError(e);
            }
        }
    }
}
