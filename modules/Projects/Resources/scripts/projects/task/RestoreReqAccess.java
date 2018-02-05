package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.dao.RequestDAO;
import projects.init.ModuleConst;
import projects.model.Request;
import projects.model.Task;

import java.util.List;

//run task prj_restore_req_access
@Command(name = ModuleConst.CODE + "_restore_req_access")
public class RestoreReqAccess extends Do {
	private RequestDAO requestDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			requestDao = new RequestDAO(session);
			List<Request> vp = requestDao.findAll().getResult();
			process(vp, session);
		} catch (DAOException e) {
			logError(e);
			return;
		}
		System.out.println("done...");
	}

	private void process(List<Request> requestList, _Session session) {
		try {
			for (Request r : requestList) {
				Task task = r.getTask();
				r.addReaders(task.getReaders());
				requestDao.update(r);
			}
		} catch (Exception e) {
			logger.exception(e);
		}

	}


}
