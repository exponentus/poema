package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.scheduler.PeriodicalServices;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;
import workflow.dao.AssignmentDAO;
import workflow.domain.ControlLifecycle;
import workflow.model.Assignment;
import workflow.model.constants.ControlStatusType;

import java.util.List;

@Command(name = "control_tracking", trigger = Trigger.EVERY_5_MIN)
public class ControlTracking extends Do {

    @Override
    public void doTask(AppEnv appEnv, _Session session) {
        try {
            AssignmentDAO dao = new AssignmentDAO(session);
            List<Assignment> processingAssignments = dao.findAllAssignmentByControlStatus(ControlStatusType.PROCESSING);

            PeriodicalServices.logger("control_tracking is going to proccess " + processingAssignments.size() + " documents");

            for (Assignment assignment : processingAssignments) {
                ControlLifecycle cl = new ControlLifecycle(assignment);
                cl.check();
                try {
                    dao.update(assignment);
                } catch (SecureException | DAOException e) {
                    Server.logger.exception(e);
                }
            }
        } catch (DAOException e) {
            Server.logger.exception(e);
        }
    }
}
