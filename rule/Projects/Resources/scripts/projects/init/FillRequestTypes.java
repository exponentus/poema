package projects.init;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.exponentus.dataengine.jpa.deploying.InitialDataAdapter;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.scripting._Session;

import reference.dao.RequestTypeDAO;
import reference.model.RequestType;

/**
 * @author Kayra on 11/06/16.
 */

public class FillRequestTypes extends InitialDataAdapter<RequestType, RequestTypeDAO> {
	
	@Override
	public List<RequestType> getData(_Session ses, LanguageCode lang, Vocabulary vocabulary) {
		List<RequestType> entities = new ArrayList<RequestType>();
		String[] data = { "implement", "prolong", "cancel" };
		String[] dataEng = { "Mark as implemented", "To prolong", "Cancel" };
		String[] dataPor = { "Mark como implementado", "Prolongar", "Cancelar" };
		String[] dataRus = { "Отметить как исполненный", "Продлить", "Отмена" };
		
		for (int i = 0; i < data.length; i++) {
			RequestType entity = new RequestType();
			entity.setName(data[i]);
			Map<LanguageCode, String> name = new HashMap<LanguageCode, String>();
			name.put(LanguageCode.ENG, dataEng[i]);
			name.put(LanguageCode.POR, dataPor[i]);
			name.put(LanguageCode.RUS, dataRus[i]);
			entity.setLocName(name);
			entities.add(entity);
		}
		
		return entities;
	}
	
}
