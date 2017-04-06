package workflow.task;

import java.util.Date;

import com.exponentus.appenv.AppEnv;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;

import projects.dao.TaskDAO;
import reference.model.Tag;

@Command(name = "approver_tracking", trigger = Trigger.EVERY_5MIN)
public class ApproverTracking extends _Do {
	private Date current = new Date();
	private Tag tag;
	private TaskDAO tDao;

	@Override
	public void doTask(AppEnv appEnv, _Session session) {

	}

}
