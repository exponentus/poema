package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scheduler.PeriodicalServices;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;

import workflow.dao.AssignmentDAO;
import workflow.dao.filter.AssignmentFilter;
import workflow.domain.ControlLifecycle;
import workflow.dto.AssignmentViewEntry;
import workflow.model.Assignment;
import workflow.model.constants.ControlStatusType;

@Command(name = "control_tracking", trigger = Trigger.EVERY_5_MIN)
public class ControlTracking extends Do {

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		try {
			AssignmentDAO dao = new AssignmentDAO(session);
			AssignmentFilter filter = new AssignmentFilter();
			filter.setControlStatusType(ControlStatusType.PROCESSING);
			ViewPage<AssignmentViewEntry> vp = dao.findViewPage(filter, new SortParams(), 0, 0);
			PeriodicalServices.logger("control_tracking is going to proccess " + vp.getCount() + " documents");
			for (AssignmentViewEntry ve : vp.getResult()) {
				Assignment entity = dao.findById(ve.id);
				ControlLifecycle cl = new ControlLifecycle(entity);
				cl.check();
				try {
					dao.update(entity);
				} catch (SecureException | DAOException e) {
					Server.logger.exception(e);
				}
			}
		} catch (DAOException e) {
			Server.logger.exception(e);
		}

	}

}
