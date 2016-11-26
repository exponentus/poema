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
import lotus.domino.Database;
import lotus.domino.Document;
import lotus.domino.DocumentCollection;
import lotus.domino.EmbeddedObject;
import lotus.domino.NotesException;
import lotus.domino.RichTextItem;
import lotus.domino.View;
import lotus.domino.ViewEntry;
import lotus.domino.ViewEntryCollection;
import workflow.dao.OfficeMemoDAO;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;
import workflow.model.embedded.Approval;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;

@Command(name = "import_sz_nsf")
public class SyncOfficeMemoNSF extends ImportNSF {
	private static final String TMP_FIELD_NAME = "officememo_tmp_file";

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, OfficeMemo> entities = new HashMap<>();
		try {
			OfficeMemoDAO dao = new OfficeMemoDAO(ses);
			UserDAO uDao = new UserDAO(ses);
			User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
			
			Database prjDb = getDatabase("docprojects.nsf");
			View prjView = prjDb.getView("(In)");
			ViewEntryCollection vec = getAllEntries("workdoc.nsf");
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form != null && form.equals("INSZ")) {
					String unId = doc.getUniversalID();
					OfficeMemo entity = dao.findByExtKey(unId);
					if (entity == null) {
						entity = new OfficeMemo();
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
						
						IUser<Long> sender = uDao.findByExtKey(doc.getItemValueString("WorkDocSenderNA"));
						if (sender != null) {
							entity.setAppliedAuthor(sender.getId());
						} else {
							entity.setAppliedAuthor(dummyUser.getId());
						}
						
						IUser<Long> signer = uDao.findByExtKey(doc.getItemValueString("WorkDocSignerNA"));
						Approver approver = new Approver();
						if (signer != null) {
							approver.setApproverUser(signer.getId());
						} else {
							approver.setApproverUser(dummyUser.getId());
						}

						List<Block> blocks = new ArrayList<Block>();
						Block block = new Block();
						block.setType(ApprovalType.SIGNING);
						List<Approver> approvers = new ArrayList<Approver>();
						approvers.add(approver);
						block.setApprovers(approvers);
						blocks.add(block);
						Approval approval = new Approval();
						approval.setBlocks(blocks);
						entity.setApproval(approval);
						
						IUser<Long> recipient = uDao.findByExtKey(doc.getItemValueString("RecipientOnlyNA"));
						if (recipient != null) {
							entity.setRecipient(recipient.getId());
						} else {
							entity.setRecipient(dummyUser.getId());
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

						Document prjDoc = prjView.getDocumentByKey(entity.getRegNumber());
						if (prjDoc != null) {
							DocumentCollection col = prjDoc.getResponses();
							Document tmpDoc = null;
							Document respDoc = col.getFirstDocument();
							while (respDoc != null) {
								String respForm = respDoc.getItemValueString("Form");
								if (respForm != null) {
									if (respForm.equals("CoordBlockForm")) {
										String type = respDoc.getItemValueString("CoordType");
										Block b = new Block();
										if (type.equalsIgnoreCase("pos")) {
											b.setType(ApprovalType.SERIAL);
										} else if (type.equalsIgnoreCase("par")) {
											b.setType(ApprovalType.PARALLEL);
										}
										String coordStatus = respDoc.getItemValueString("CoordStatus");
										if (coordStatus.equals("awaiting")) {
											b.setStatus(ApprovalStatusType.PROCESSING);
										} else if (type.equalsIgnoreCase("coordinated")) {
											b.setStatus(ApprovalStatusType.FINISHED);
										}
										Approval apprv = entity.getApproval();
										apprv.getBlocks().add(b);
									} else if (respForm.equals("SignForm")) {
										String coordStatus = respDoc.getItemValueString("CoordStatus");
										System.out.println(coordStatus);
										Block b = new Block();
										b.setType(ApprovalType.SIGNING);
									} else if (respForm.equals("InfoForm")) {

									} else if (respForm.equals("ExtraForm")) {
										
									} else if (respForm.equals("DocLink")) {

									}
								}

								tmpDoc = col.getNextDocument();
								respDoc.recycle();
								respDoc = tmpDoc;
							}
						}

						entities.put(unId, entity);
					}
				}
				tmpEntry = vec.getNextEntry();
				entry.recycle();
				entry = tmpEntry;
			}

			logger.infoLogEntry("has been found " + entities.size() + " records");
			for (Entry<String, OfficeMemo> ee : entities.entrySet()) {
				save(dao, ee.getValue(), ee.getKey());
			}
		} catch (NotesException e) {
			logger.errorLogEntry(e);
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}
		logger.infoLogEntry("done...");
	}
	
}
