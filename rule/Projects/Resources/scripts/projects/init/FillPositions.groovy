package projects.init;

import reference.dao.PositionDAO
import reference.model.Position

import java.util.HashMap;
import java.util.Map;

import com.exponentus.dataengine.jpa.deploying.InitialDataAdapter
import com.exponentus.localization.LanguageCode
import com.exponentus.localization.Vocabulary
import com.exponentus.scripting._Session

/**
 * Created by Kayra on 30/12/15.
 */

public class FillPositions extends InitialDataAdapter<Position, PositionDAO> {

	@Override
	public List<Position> getData(_Session ses, LanguageCode lang, Vocabulary vocabulary) {
		List<Position> entities = new ArrayList<Position>();
		String[] data = [
			"SEO",
			"Project manager",
			"Programmer",
			"Tester",			
			"System administrator",
			"Technical writer",
			"unknown"
		];
		
		String[] dataPor = [
		     			"SEO",
		     			"Gestor de projeto",
		     			"Programador",
		     			"Verificador",			
		     			"Administrador do sistema",
						"Escritor técnico",
		     			"desconhecido"
		     		];
	
		
		
		for (int i = 0; i < data.length; i++) {
			Position entity = new Position();
			entity.setName(data[i]);
			Map<LanguageCode, String> name = new HashMap<LanguageCode, String>();
			name.put(LanguageCode.ENG, data[i]);
			name.put(LanguageCode.POR, dataPor[i]);
			entity.setLocalizedName(name);
			entities.add(entity);
		}

		return entities;
	}
}
