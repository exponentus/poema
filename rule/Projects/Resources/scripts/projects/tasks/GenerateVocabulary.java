package projects.tasks;

import java.io.File;

import com.exponentus.appenv.AppEnv;
import com.exponentus.localization.Vocabulary;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.tasks.Command;

@Command(name = "gen_voc")
public class GenerateVocabulary extends _Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Vocabulary vocabulary = appEnv.vocabulary;
		String jsFilePath = appEnv.getWebAppsPath() + File.separator + "vocabulary.js";
		logger.infoLogEntry("write to \"" + jsFilePath + "\"");
		writeJS(vocabulary, jsFilePath);
		logger.infoLogEntry("done...");
	}

}
