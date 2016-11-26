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
import reference.dao.DocumentSubjectDAO;
import reference.dao.DocumentTypeDAO;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import staff.dao.OrganizationDAO;
import staff.model.Organization;
import workflow.dao.OutgoingDAO;
import workflow.model.Outgoing;

@Command(name = "import_ish_nsf")
public class SyncOutgoingsNSF extends ImportNSF {
	private static final String VID_CATEGORY = "01. Входящие";
	private static final String TMP_FIELD_NAME = "outgoing_tmp_file";
	private static final String HAR_CATEGORY = "ЦОД";
	
	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, Outgoing> entities = new HashMap<>();
		OrganizationDAO oDao = new OrganizationDAO(ses);
		OutgoingDAO dao = new OutgoingDAO(ses);
		DocumentTypeDAO dtDao = new DocumentTypeDAO(ses);
		DocumentSubjectDAO dsDao = new DocumentSubjectDAO(ses);
		UserDAO uDao = new UserDAO(ses);
		User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
		try {
			ViewEntryCollection vec = getAllEntries("outgoing.nsf");
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form != null && form.equals("ISH")) {
					String unId = doc.getUniversalID();
					Outgoing entity = dao.findByExtKey(unId);
					if (entity == null) {
						entity = new Outgoing();
					}
					String vn = doc.getItemValueString("Vn");
					if (vn != null) {
						entity.setRegNumber(vn);
						try {
							entity.setAppliedRegDate(doc.getFirstItem("Dvn").getDateTimeValue().toJavaDate());
						} catch (NotesException ne) {
							logger.errorLogEntry(ne.text);
						}
						IUser<Long> author = uDao.findByExtKey(doc.getItemValueString("AuthorNA"));
						if (author != null) {
							entity.setAuthor(author);
						} else {
							entity.setAuthor(dummyUser);
						}
						
						String vid = doc.getItemValueString("Vid");
						DocumentType docType = dtDao.findByNameAndCategory(VID_CATEGORY, vid);
						if (docType != null) {
							entity.setDocType(docType);
						} else {
							logger.errorLogEntry("reference ext value has not been found \"" + vid + "\"");
						}
						
						String har = doc.getItemValueString("Har");
						DocumentSubject docSubj = dsDao.findByNameAndCategory(HAR_CATEGORY, har);
						if (docSubj != null) {
							entity.setDocSubject(docSubj);
						} else {
							logger.errorLogEntry("reference ext value has not been found \"" + vid + "\"");
						}
						
						String corrId = doc.getItemValueString("CorrID");
						if (!corrId.isEmpty()) {
							Organization org = oDao.findByExtKey(corrId);
							if (org != null) {
								entity.setRecipient(org);
							}
						}
						
						entity.setTitle(StringUtils.abbreviate(doc.getItemValueString("BriefContent"), 140));
						entity.setBody(doc.getItemValueString("BriefContent"));
						
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
						entity.setAttachments(attachments);
						normalizeACL(uDao, entity, doc);
						entities.put(unId, entity);
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
		for (Entry<String, Outgoing> entry : entities.entrySet()) {
			save(dao, entry.getValue(), entry.getKey());
		}
		logger.infoLogEntry("done...");
	}
	
}
