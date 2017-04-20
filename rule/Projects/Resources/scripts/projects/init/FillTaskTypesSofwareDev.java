package projects.init;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.exponentus.dataengine.jpa.deploying.InitialDataAdapter;
import com.exponentus.localization.Vocabulary;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.scripting._Session;

import reference.dao.TaskTypeDAO;
import reference.model.TaskType;

/**
 * @author Kayra on 21/04/16.
 */

public class FillTaskTypesSofwareDev extends InitialDataAdapter<TaskType, TaskTypeDAO> {

	@Override
	public List<TaskType> getData(_Session ses, LanguageCode lang, Vocabulary vocabulary) {
		List<TaskType> entities = new ArrayList<TaskType>();
		String[] data = { "Documentation", "Technical support", "Testing", "Programming" };
		String[] dataEng = { "Documentation", "Technical support", "Testing", "Programming" };
		String[] dataPor = { "Documentação", "Assistência técnica", "Тестирование", "Programação" };

		for (int i = 0; i < data.length; i++) {
			TaskType entity = new TaskType();
			entity.setName(data[i]);
			entity.setPrefix("");
			Map<LanguageCode, String> name = new HashMap<LanguageCode, String>();
			name.put(LanguageCode.ENG, dataEng[i]);
			name.put(LanguageCode.POR, dataPor[i]);
			entity.setLocName(name);
			entities.add(entity);
		}

		return entities;
	}

}
