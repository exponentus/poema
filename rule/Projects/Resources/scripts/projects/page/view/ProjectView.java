package projects.page.view;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortMap;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import projects.dao.ProjectDAO;
import projects.model.Project;

public class ProjectView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        String keyWord = formData.getAnyValueSilently("keyWord");
        int pageSize = 200; // session.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);

        _SortMap sortMap = getSortMap(formData.getListOfValuesSilently("sort"));
        if (sortMap.isEmpty()) {
            sortMap = _SortMap.asc("name");
        }

        ProjectDAO projectDAO = new ProjectDAO(session);
        ViewPage<Project> vp = projectDAO.findProjects(keyWord, sortMap, pageNum, pageSize);
        addContent(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum());
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

    // TODO refactor / standardize
    public _SortMap getSortMap(String[] params) {
        _SortMap result = new _SortMap();

        for (String param : params) {
            String[] skv = param.split(":"); // name:direction
            String name = skv[0];
            String dir;
            if (skv.length > 1) {
                dir = skv[1];
            } else {
                dir = "asc";
            }

            if (dir.equals("asc")) {
                result.addAsc(name);
            } else {
                result.addDesc(name);
            }
        }

        return result;
    }
}
