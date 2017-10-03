package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.dao.TaskDAO;
import projects.model.Task;

@Command(name = "restore_timeline")
public class RestoreStages extends Do {

    @Override
    public void doTask(AppEnv appEnv, _Session session) {
        System.out.println("run...");
        try {
            TaskDAO taskDAO = new TaskDAO(session);
            ViewPage<Task> vp = taskDAO.findAll();
            for (Task task : vp.getResult()) {
                System.out.print(task.getTitle());
                TimeLine tl = task.getTimeLine();
                if (tl == null || tl.getStages().size() == 0) {
                    try {
                        tl.addStage(task.getStatusDate(), task.getStatus().name());
                        taskDAO.update(task);
                        System.out.println(" -ok");
                    } catch (Exception e) {
                        System.err.println(e);
                    }
                } else {
                    System.out.println(" -skip");
                }
            }

        } catch (Exception e) {
            System.err.println(e);
        }


        System.out.println("done");


    }
}
