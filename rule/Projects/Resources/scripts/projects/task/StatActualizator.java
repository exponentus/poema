package projects.task;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.util.TimeUtil;

import administrator.dao.UserDAO;
import administrator.model.User;
import monitoring.dao.StatisticDAO;
import projects.dao.TaskDAO;
import projects.init.AppConst;
import projects.model.constants.TaskStatusType;

@Command(name = "actualize_stat")
public class StatActualizator extends Do {
	private Date current = new Date();

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		logger.info("Run statistics collector");
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		try {
			UserDAO uDao = new UserDAO();
			List<User> users = uDao.findAll(0, 0);
			Date startDate = dateFormat.parse("15-08-2016");
			Date endDate = current;
			while (startDate.before(endDate)) {
				logger.info(TimeUtil.dateToStringSilently(startDate));
				StatisticDAO statDao = new StatisticDAO();
				TaskDAO dao = new TaskDAO(session);
				for (User u : users) {
					for (TaskStatusType t : TaskStatusType.values()) {
						statDao.postStat(u, AppConst.CODE, "author_state", startDate, dao.getColByAuthor(startDate, u, t));
						statDao.postStat(u, AppConst.CODE, "assignee_state", startDate, dao.getColByAssignee(startDate, u.getId(), t));
					}
				}
				startDate = DateUtils.addDays(startDate, 1);
			}
			logger.info("done...");
		} catch (DAOException | ParseException e) {
			logger.exception(e);
		}

	}

}
