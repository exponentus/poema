package workflow.tasks;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.smartdoc.ImportNSF;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scheduler.tasks.TempFileCleaner;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import lotus.domino.Document;
import lotus.domino.EmbeddedObject;
import lotus.domino.NotesException;
import lotus.domino.RichTextItem;
import lotus.domino.ViewEntry;
import lotus.domino.ViewEntryCollection;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentSubjectDAO;
import reference.dao.DocumentTypeDAO;
import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import staff.dao.OrganizationDAO;
import staff.model.Organization;
import workflow.dao.IncomingDAO;
import workflow.model.Incoming;

@Command(name = "import_in_nsf")
public class SyncIncomingsNSF extends ImportNSF {
	private static final String VID_CATEGORY = "01. Входящие";
	private static final String HAR_CATEGORY = "ЦОД";
	private static final String TMP_FIELD_NAME = "incoming_tmp_file";

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, Incoming> entities = new HashMap<>();
		try {
			OrganizationDAO oDao = new OrganizationDAO(ses);
			
			IncomingDAO iDao = new IncomingDAO(ses);
			DocumentTypeDAO dtDao = new DocumentTypeDAO(ses);
			DocumentLanguageDAO dlDao = new DocumentLanguageDAO(ses);
			DocumentSubjectDAO dsDao = new DocumentSubjectDAO(ses);
			UserDAO uDao = new UserDAO(ses);
			Map<String, LanguageCode> docLangCollation = docLangCollationMapInit();
			User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);

			ViewEntryCollection vec = getAllEntries("incoming.nsf");
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form != null && form.equals("IN")) {
					String unId = doc.getUniversalID();
					Incoming inc = iDao.findByExtKey(unId);
					if (inc == null) {
						inc = new Incoming();
					}
					String vn = doc.getItemValueString("Vn");
					if (vn != null) {
						inc.setRegNumber(vn);
						try {
							inc.setAppliedRegDate(doc.getFirstItem("Dvn").getDateTimeValue().toJavaDate());
						} catch (NotesException ne) {
							logger.errorLogEntry(ne.text);
						}
						IUser<Long> author = uDao.findByExtKey(doc.getItemValueString("AuthorNA"));
						if (author != null) {
							inc.setAuthor(author);
						} else {
							inc.setAuthor(dummyUser);
						}

						String vid = doc.getItemValueString("Vid");
						DocumentType docType = dtDao.findByNameAndCategory(VID_CATEGORY, vid);
						if (docType != null) {
							inc.setDocType(docType);
						} else {
							logger.errorLogEntry("reference ext value has not been found \"" + vid + "\"");
						}

						String har = doc.getItemValueString("Har");
						DocumentSubject docSubj = dsDao.findByNameAndCategory(HAR_CATEGORY, har);
						if (docSubj != null) {
							inc.setDocSubject(docSubj);
						} else {
							logger.errorLogEntry("reference ext value has not been found \"" + vid + "\"");
						}
						
						String docLangVal = doc.getItemValueString("langName");
						LanguageCode intRefKey = docLangCollation.get(docLangVal);
						if (intRefKey == null) {
							logger.errorLogEntry("wrong reference ext value \"" + docLangVal + "\"");
							intRefKey = LanguageCode.UNKNOWN;
						}
						DocumentLanguage docLang = dlDao.findByCode(intRefKey);
						if (docLang != null) {
							inc.setDocLanguage(docLang);
						}
						inc.setSenderAppliedRegDate(doc.getFirstItem("Din").getDateTimeValue().toJavaDate());
						inc.setSenderRegNumber(doc.getItemValueString("In"));
						String corrId = doc.getItemValueString("CorrID");
						if (!corrId.isEmpty()) {
							Organization org = oDao.findByExtKey(corrId);
							if (org != null) {
								inc.setSender(org);
							}
						}
						inc.setTitle(StringUtils.abbreviate(doc.getItemValueString("BriefContent"), 140));
						inc.setBody(doc.getItemValueString("BriefContent"));

						_FormAttachments files = new _FormAttachments(ses);
						RichTextItem body = (RichTextItem) doc.getFirstItem("RTFContent");
						Vector<?> atts = body.getEmbeddedObjects();
						for (int i = 0; i < atts.size(); i++) {
							EmbeddedObject att = (EmbeddedObject) atts.elementAt(i);
							if (att.getType() == EmbeddedObject.EMBED_ATTACHMENT) {
								String path = ses.getTmpDir().getAbsolutePath() + File.separator + att.getSource();
								att.extractFile(path);
								files.addFile(new File(path), att.getSource(), TMP_FIELD_NAME);
								TempFileCleaner.addFileToDelete(path);
							}
						}

						List<Attachment> attachments = new ArrayList<>();
						for (TempFile tmpFile : files.getFiles(TMP_FIELD_NAME)) {
							Attachment a = (Attachment) tmpFile.convertTo(new Attachment());
							attachments.add(a);
						}
						inc.setAttachments(attachments);
						normalizeACL(uDao, inc, doc);
						entities.put(unId, inc);
					}
				}
				tmpEntry = vec.getNextEntry();
				entry.recycle();
				entry = tmpEntry;
			}

			logger.infoLogEntry("has been found " + entities.size() + " records");
			for (Entry<String, Incoming> ee : entities.entrySet()) {
				save(iDao, ee.getValue(), ee.getKey());
			}
		} catch (NotesException e) {
			logger.errorLogEntry(e);
		} catch (Exception e) {
			logger.errorLogEntry(e);
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
