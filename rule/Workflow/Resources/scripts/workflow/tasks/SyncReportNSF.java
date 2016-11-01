package workflow.tasks;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;

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
import workflow.dao.AssignmentDAO;
import workflow.dao.ReportDAO;
import workflow.model.Assignment;
import workflow.model.Report;

@Command(name = "import_ki_nsf")
public class SyncReportNSF extends ImportNSF {
	private static final String TMP_FIELD_NAME = "report_tmp_file";

	@Override
	public void doTask(_Session ses) {
		Map<String, Report> entities = new HashMap<>();
		AssignmentDAO aDao = new AssignmentDAO(ses);
		ReportDAO dao = new ReportDAO(ses);
		UserDAO uDao = new UserDAO(ses);
		User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
		try {
			ViewEntryCollection vec = getAllEntries("incoming.nsf");
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form != null && form.equals("KI")) {
					String unId = doc.getUniversalID();
					Report entity = dao.findByExtKey(unId);
					if (entity == null) {
						entity = new Report();
					}
					String parent = doc.getParentDocumentUNID();
					Assignment parentEntity = aDao.findByExtKey(parent);
					if (parentEntity != null) {
						entity.setParent(parentEntity);

						IUser<Long> author = uDao.findByExtKey(doc.getItemValueString("AuthorNA"));
						if (author != null) {
							entity.setAuthor(author);
						} else {
							entity.setAuthor(dummyUser);
						}

						try {
							entity.setAppliedRegDate(doc.getFirstItem("DateIsp").getDateTimeValue().toJavaDate());
						} catch (NotesException ne) {
							logger.errorLogEntry(ne.text);
						}

						IUser<Long> authorKi = uDao.findByExtKey(doc.getItemValueString("IntExecutNA"));
						if (authorKi != null) {
							entity.setAppliedAuthor(authorKi.getId());
						} else {
							entity.setAppliedAuthor(dummyUser.getId());
						}

						entity.setTitle(StringUtils.abbreviate(doc.getItemValueString("ShortText"), 140));
						entity.setBody(doc.getItemValueString("ShortText"));

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

						entity = entities.put(doc.getUniversalID(), entity);
					} else {
						logger.warningLogEntry("parent has not been found (" + parent + "), record was skipped");

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
		for (Entry<String, Report> entry : entities.entrySet()) {
			save(dao, entry.getValue(), entry.getKey());
		}
		logger.infoLogEntry("done...");
	}

}
