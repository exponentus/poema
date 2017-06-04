package projects.task;

import java.util.Date;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;

import administrator.model.User;
import monitoring.dao.StatisticDAO;
import projects.dao.TaskDAO;
import projects.init.AppConst;

@Command(name = "stat_collector", trigger = Trigger.EVERY_NIGHT)
public class StatCollector extends Do {
	private Date current = new Date();

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			logger.info("Run statistics collector");
			StatisticDAO statDao = new StatisticDAO();
			TaskDAO dao = new TaskDAO(session);
			long val = dao.findAllRegistered(current, "regDate", (User) session.getUser(), "author", 0, 0);
			statDao.postStat((User) session.getUser(), AppConst.CODE, "count_of_regsitered_task", val);
			logger.info("done...");
		} catch (DAOException e) {
			logger.exception(e);
		}

	}

}
