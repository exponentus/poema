package helpdesk.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;

@Command(name = "helpdesk_gen_voc", trigger = Trigger.POST_APP_START)
public class GenerateVocabulary extends _Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		generateVocabulary(appEnv);
	}
}
