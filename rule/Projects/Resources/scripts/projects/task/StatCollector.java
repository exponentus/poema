package projects.task;

import java.util.Date;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;

import administrator.model.User;
import monitoring.dao.StatisticDAO;
import projects.dao.TaskDAO;
import projects.init.AppConst;
import projects.model.Task;
import reference.model.Tag;

@Command(name = "stat_collector", trigger = Trigger.EVERY_NIGHT)
public class StatCollector extends Do {
	private Date current = new Date();
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			StatisticDAO statDao = new StatisticDAO();
			TaskDAO dao = new TaskDAO(session);
			ViewPage<Task> val = dao.findAllRegistered(current, (User) session.getUser(), 0, 0);
			statDao.postStat((User) session.getUser(), AppConst.CODE, "count_of_regsitered_task", val.getCount());
		} catch (DAOException e) {
			logger.exception(e);
		}

	}

}
