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
import reference.dao.RequestTypeDAO;
import reference.model.RequestType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Command(name = ModuleConst.CODE + "_fill_request_types")
public class FillRequestTypes extends Do {

    @Override
    public void doTask(AppEnv appEnv, _Session ses) {
        List<RequestType> entities = new ArrayList<RequestType>();
        String[] data = {"prolong", "cancel", "implement"};
        String[] dataEng = {"To prolong", "To cancel", "To mark as Implemented"};
        String[] dataRus = {"Продлить", "Отменить", "Отметить как выполненный"};
        String[] dataKaz = {"Ұзарту", "Болдырмау үшін", "Аяқталған ретінде белгілеу"};

        for (int i = 0; i < data.length; i++) {
            RequestType entity = new RequestType();
            entity.setName(data[i]);
            Map<LanguageCode, String> name = new HashMap<LanguageCode, String>();
            name.put(LanguageCode.ENG, dataEng[i]);
            name.put(LanguageCode.RUS, dataRus[i]);
            name.put(LanguageCode.KAZ, dataKaz[i]);
            entity.setLocName(name);
            entities.add(entity);
        }

        try {
            RequestTypeDAO dao = new RequestTypeDAO(ses);
            for (RequestType entry : entities) {
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
