package workflow.tasks;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;

import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.smartdoc.ImportNSF;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import lotus.domino.Document;
import lotus.domino.NotesException;
import lotus.domino.ViewEntry;
import lotus.domino.ViewEntryCollection;
import reference.dao.DocumentLanguageDAO;
import staff.dao.OrganizationDAO;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.model.Assignment;
import workflow.model.Incoming;

@Command(name = "import_kr_nsf")
public class SyncAssignmentNSF extends ImportNSF {

	@Override
	public void doTask(_Session ses) {
		Map<String, Assignment> entities = new HashMap<>();
		OrganizationDAO oDao = new OrganizationDAO(ses);
		AssignmentDAO dao = new AssignmentDAO(ses);
		IncomingDAO iDao = new IncomingDAO(ses);
		DocumentLanguageDAO dlDao = new DocumentLanguageDAO(ses);
		UserDAO uDao = new UserDAO(ses);
		Map<String, LanguageCode> docLangCollation = docLangCollationMapInit();
		User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
		try {
			ViewEntryCollection vec = getAllEntries("incoming.nsf");
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form != null && form.equals("KR")) {
					String parent = doc.getParentDocumentUNID();
					Incoming inc = iDao.findByExtKey(parent);
					if (inc != null) {

						String unId = doc.getUniversalID();
						Assignment entity = dao.findByExtKey(unId);
						if (entity == null) {
							entity = new Assignment();
						}
						entity.setIncoming(inc);

						IUser<Long> author = uDao.findByExtKey(doc.getItemValueString("AuthorNA"));
						if (author != null) {
							entity.setAuthor(author);
						} else {
							entity.setAuthor(dummyUser);
						}

						IUser<Long> authorRez = uDao.findByExtKey(doc.getItemValueString("AuthorRezNA"));
						if (authorRez != null) {
							entity.setAppliedAuthor(authorRez.getId());
						} else {
							entity.setAuthor(dummyUser);
						}

						String docLangVal = doc.getItemValueString("langName");
						LanguageCode intRefKey = docLangCollation.get(docLangVal);
						if (intRefKey == null) {
							logger.errorLogEntry("wrong reference ext value \"" + docLangVal + "\"");
							intRefKey = LanguageCode.UNKNOWN;
						}

						entity.setTitle(StringUtils.abbreviate(doc.getItemValueString("Content"), 140));
						entity.setBody(doc.getItemValueString("Content"));

						entities.put(unId, entity);
					} else {
						logger.warningLogEntry("Incoming has not been found exists (" + parent + "), record was skipped");
					}

				}
				tmpEntry = vec.getNextEntry();
				entry.recycle();
				entry = tmpEntry;
			}

		} catch (NotesException e) {
			logger.errorLogEntry(e);
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}
		logger.infoLogEntry("has been found " + entities.size() + " records");
		for (Entry<String, Assignment> entry : entities.entrySet()) {
			save(dao, entry.getValue(), entry.getKey());
		}
		logger.infoLogEntry("done...");
	}

	private Map<String, LanguageCode> docLangCollationMapInit() {
		Map<String, LanguageCode> depTypeCollation = new HashMap<>();
		depTypeCollation.put("Русский", LanguageCode.RUS);
		depTypeCollation.put("Английский", LanguageCode.ENG);
		depTypeCollation.put("Казахский", LanguageCode.KAZ);
		depTypeCollation.put("Французский", LanguageCode.FRA);
		depTypeCollation.put("Китайский", LanguageCode.CHI);
		depTypeCollation.put("Немецкий", LanguageCode.DEU);
		depTypeCollation.put("Польский", LanguageCode.POL);
		depTypeCollation.put("Белорусский", LanguageCode.BEL);
		depTypeCollation.put("Чешский", LanguageCode.CES);
		depTypeCollation.put("Греческий", LanguageCode.GRE);
		depTypeCollation.put("Украинский", LanguageCode.UKR);
		depTypeCollation.put("Турецкий", LanguageCode.TUR);
		depTypeCollation.put("Итальянский", LanguageCode.ITA);
		depTypeCollation.put("Корейский", LanguageCode.KOR);
		depTypeCollation.put("Японский", LanguageCode.JPN);
		depTypeCollation.put("Испанский", LanguageCode.SPA);
		depTypeCollation.put("Хинди", LanguageCode.HIN);
		depTypeCollation.put("Арабский", LanguageCode.ARA);
		depTypeCollation.put("", LanguageCode.UNKNOWN);
		depTypeCollation.put("null", LanguageCode.UNKNOWN);
		return depTypeCollation;

	}
}
