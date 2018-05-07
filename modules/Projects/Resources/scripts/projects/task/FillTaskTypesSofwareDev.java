package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.exception.DAOExceptionType;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import projects.init.ModuleConst;
import reference.dao.TaskTypeDAO;
import reference.model.TaskType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Command(name = ModuleConst.CODE + "_fill_task_types_software_dev")
public class FillTaskTypesSofwareDev extends Do {

    @Override
    public void doTask(AppEnv appEnv, _Session ses) {
        List<TaskType> entities = new ArrayList<TaskType>();
        String[] data = {"testing", "documentation", "programming", "techical_support"};
        String[] dataEng = {"Testing", "Documentation", "Programming", "Techical support"};
        String[] dataRus = {"Тестирование", "Документирование", "Программирование", "Техническая поддержка"};
        String[] dataKaz = {"Тестілеу", "Құжаттама", "Бағдарламалау", "Техникалық қолдау"};
        String[] prefix = {"test", "doc", "dev", "sup"};

        for (int i = 0; i < data.length; i++) {
            TaskType entity = new TaskType();
            entity.setName(data[i]);
            Map<LanguageCode, String> name = new HashMap<LanguageCode, String>();
            name.put(LanguageCode.ENG, dataEng[i]);
            name.put(LanguageCode.RUS, dataRus[i]);
            name.put(LanguageCode.KAZ, dataKaz[i]);
            entity.setLocName(name);
            entity.setPrefix(prefix[i]);
            entities.add(entity);
        }

        try {
            TaskTypeDAO dao = new TaskTypeDAO(ses);
            for (TaskType entry : entities) {
                try {
                    if (dao.add(entry) != null) {
                        logger.info(entry.getName() + " added");
                    }
                } catch (DAOException e) {
                    if (e.getType() == DAOExceptionType.UNIQUE_VIOLATION) {
                        logger.warning("a data is already exists (" + e.getAddInfo() + "), record was skipped");
                    } else if (e.getType() == DAOExceptionType.NOT_NULL_VIOLATION) {
                        logger.warning("a value is null (" + e.getAddInfo() + "), record was skipped");
                    } else {
                        logger.exception(e);
                    }
                } catch (SecureException e) {
                    logger.exception(e);
                }
            }
        } catch (DAOException e) {
            logger.exception(e);
        }
        logger.info("done...");
    }

}
