package projects.tasks;

import com.exponentus.appenv.AppEnv;
import com.exponentus.env.Environment;
import com.exponentus.localization.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.localization.VocabularyDTO;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.tasks.Command;

import java.io.File;

@Command(name = "gen_voc")
public class GenerateVocabulary extends _Do {

    @Override
    public void doTask(AppEnv appEnv, _Session ses) {
        Vocabulary vocabulary = appEnv.vocabulary;

        String i18nPath = appEnv.getWebAppsPath() + File.separator + "i18n" + File.separator;
        (new File(i18nPath)).mkdirs();

        for (LanguageCode languageCode : Environment.langs) {
            VocabularyDTO vocabularyDTO = VocabularyDTO.valueOf(vocabulary, languageCode);
            String jsonFilePath = i18nPath + languageCode.name().toLowerCase() + ".json";
            logger.infoLogEntry("write to \"" + jsonFilePath + "\"");
            writeJS(vocabularyDTO.getWords(), jsonFilePath);
        }

        logger.infoLogEntry("done...");
    }
}
