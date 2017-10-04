package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.init.AppConst;

@Command(name = AppConst.CODE + "_fill_roles", trigger = Trigger.POST_APP_DEPLOYED)
public class FillDefaultRoles extends Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		addApplicationRoles(appEnv);
	}

}
