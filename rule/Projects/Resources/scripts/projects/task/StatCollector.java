package projects.task;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import monitoring.dao.StatisticDAO;
import projects.dao.TaskDAO;
import projects.init.AppConst;
import projects.model.constants.TaskStatusType;

import java.util.Date;
import java.util.List;

@Command(name = "stat_collector", trigger = Trigger.DISABLE)
public class StatCollector extends Do {
	private Date current = new Date();

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			logger.info("Run statistics collector");
			UserDAO uDao = new UserDAO();
			List<User> users = uDao.findAll(0, 0).getResult();
			StatisticDAO statDao = new StatisticDAO();
			TaskDAO dao = new TaskDAO(session);
			for (User u : users) {
				for (TaskStatusType t : TaskStatusType.values()) {
					statDao.postStat(u, AppConst.CODE, "author_state", current, t.name(), dao.getColByAuthor(u, t));
					statDao.postStat(u, AppConst.CODE, "assignee_state", current, t.name(), dao.getColByAssignee(u.getId(), t));
				}
			}
			logger.info("done...");
		} catch (DAOException e) {
			logger.exception(e);
		}

	}

}
