package projects.init;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.exponentus.dataengine.jpa.deploying.InitialDataAdapter;
import com.exponentus.localization.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.scripting._Session;

import reference.dao.TagDAO;
import reference.model.Tag;

/**
 * Created by Kayra on 28/01/16.
 */

public class FillTags extends InitialDataAdapter<Tag, TagDAO> {

	@Override
	public List<Tag> getData(_Session ses, LanguageCode lang, Vocabulary vocabulary) {
		List<Tag> entities = new ArrayList<Tag>();

		Tag entity = new Tag();
		entity.setName("starred");
		Map<LanguageCode, String> name = new HashMap<LanguageCode, String>();
		name.put(LanguageCode.ENG, "Starred");
		name.put(LanguageCode.RUS, "Избранный");
		name.put(LanguageCode.POR, "Estrelou");
		entity.setLocalizedName(name);
		entity.setColor("#008080");
		entities.add(entity);

		entity = new Tag();
		entity.setName("bug");
		name = new HashMap<LanguageCode, String>();
		name.put(LanguageCode.ENG, "Bug");
		name.put(LanguageCode.RUS, "Ошибка");
		name.put(LanguageCode.POR, "Erro");
		entity.setLocalizedName(name);
		entity.setColor("#ff0000");
		entities.add(entity);

		entity = new Tag();
		entity.setName("еnhancement");
		name = new HashMap<LanguageCode, String>();
		name.put(LanguageCode.ENG, "Enhancement");
		name.put(LanguageCode.RUS, "Улучшение");
		name.put(LanguageCode.POR, "Aprimoramento");
		entity.setLocalizedName(name);
		entity.setColor("#0080ff");
		entities.add(entity);

		entity = new Tag();
		entity.setName("expired");
		name = new HashMap<>();
		name.put(LanguageCode.ENG, "Overdued");
		name.put(LanguageCode.RUS, "Просроченный");
		name.put(LanguageCode.KAZ, "Mерзімі өткен");
		entity.setLocalizedName(name);
		entity.setColor("#db0000");
		entity.setHidden(true);
		entities.add(entity);

		return entities;
	}

}
