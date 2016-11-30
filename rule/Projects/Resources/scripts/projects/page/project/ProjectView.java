package projects.page.project;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

import projects.dao.ProjectDAO;
import projects.model.Project;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

public class ProjectView extends _DoPage {
	
	@Override
	public void doGET(_Session session, _WebFormData formData) {
		try {
			String keyWord = formData.getAnyValueSilently("keyWord");
			int pageSize = formData.getNumberValueSilently("limit", session.pageSize);
			int pageNum = formData.getNumberValueSilently("page", 0);
			_SortParams sortParams = formData.getSortParams(_SortParams.asc("name"));
			
			ProjectDAO projectDAO = new ProjectDAO(session);
			ViewPage<Project> vp = projectDAO.findProjects(keyWord, sortParams, pageNum, pageSize);
			addContent(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum());
			
			//
			EmployeeDAO empDao = new EmployeeDAO(session);
			Map<Long, Employee> emps = new HashMap<>();
			if (vp.getResult().size() > 0) {
				List<Long> empIds = new ArrayList<>();
				for (Project prj : vp.getResult()) {
					empIds.add(prj.getManager());
					empIds.add(prj.getProgrammer());
					empIds.add(prj.getTester());
				}
				for (Employee e : empDao.findAllByUserIds(empIds)) {
					emps.put(e.getUserID(), e);
				}
			}
			addDataContent("employees", emps);
		} catch (DAOException e) {
			logError(e);
			setBadRequest();
			return;
		}
	}
	
	@Override
	public void doDELETE(_Session session, _WebFormData formData) {
		ProjectDAO projectDAO = new ProjectDAO(session);
		for (String id : formData.getListOfValuesSilently("projectIds")) {
			Project m = projectDAO.findById(id);
			try {
				m.setAttachments(null); // if no on delete cascade
				projectDAO.delete(m);
			} catch (SecureException | DAOException e) {
				setError(e);
			}
		}
	}
}
