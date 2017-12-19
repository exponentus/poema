package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;
import projects.dao.TaskDAO;
import projects.init.ModuleConst;
import projects.model.Task;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Command(name = ModuleConst.CODE + "_convert_timeline")
public class TimeLineConvertor extends Do {
    private TaskDAO tDao;

    @Override
    public void doTask(AppEnv appEnv, _Session session) {
        try {
              tDao = new TaskDAO(session);
            List<Task> tl = tDao.findAll().getResult();
            for (Task task : tl) {
                TimeLine timeLine = task.getTimeLine();
                if (timeLine != null) {
                    Map<Date, String> stages = timeLine.getStages();
                    for (Map.Entry<Date, String> entry : stages.entrySet()) {
                        try {
                            task.addStage(entry.getKey(), StatusType.valueOf(entry.getValue()));
                            tDao.update(task);
                            println("update " + task);
                        } catch (DAOException e) {
                            Server.logger.exception(e);
                        } catch (SecureException e) {
                            Server.logger.exception(e);
                        }
                    }

                }

            }
        } catch (DAOException e) {
            Server.logger.exception(e);
        }
    }


}
