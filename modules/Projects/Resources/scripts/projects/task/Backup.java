package projects.task;


import com.exponentus.appenv.AppEnv;
import com.exponentus.common.task.AbstractBackup;
import com.exponentus.env.EnvConst;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.util.FileUtil;
import com.exponentus.util.TimeUtil;
import projects.init.ModuleConst;
import projects.model.Project;
import projects.model.Request;
import projects.model.Task;

import java.io.File;
import java.util.Date;


//run task prj_backup
@Command(name = ModuleConst.CODE + "_backup")
public class Backup extends AbstractBackup {

    public void doTask(AppEnv appEnv, _Session ses) {
        Class[] classesToBackup = {
                Project.class,
                Task.class,
                Request.class,
                };

        for (Class clazz : classesToBackup) {
            String folder = backup(appEnv, ses, clazz);
            String simpleName = clazz.getSimpleName();
            String zipFileName = EnvConst.BACKUP_DIR + File.separator + appEnv.appName + "_" +
                    simpleName + "_" + TimeUtil.dateTimeToFileNameSilently(new Date()) + ".zip";
            FileUtil.zipFolder(folder, zipFileName, true);
        }
    }
}
