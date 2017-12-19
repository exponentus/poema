package projects.task;


import com.exponentus.appenv.AppEnv;
import com.exponentus.common.task.AbstractBackup;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.init.ModuleConst;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;


//run task prj_backup
@Command(name = ModuleConst.CODE + "_backup")
public class Backup extends AbstractBackup {

    public void doTask(AppEnv appEnv, _Session ses) {
        backup(appEnv, ses, Project.class, Task.class, Request.class);
    }


}
