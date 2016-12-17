package workflow.task;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;

import com.exponentus.appenv.AppEnv;
import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.smartdoc.ImportNSF;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import lotus.domino.Database;
import lotus.domino.Document;
import lotus.domino.NotesException;
import lotus.domino.View;
import lotus.domino.ViewEntry;
import lotus.domino.ViewEntryCollection;
import reference.dao.ControlTypeDAO;
import reference.model.ControlType;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;

@Command(name = "import_kr_nsf")
public class SyncAssignmentNSF extends ImportNSF {
	protected static Map<String, String> controlTypeCollation = controlTypeCollationMapInit();
	
	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, Assignment> entities = new HashMap<>();
		try {
			AssignmentDAO dao = new AssignmentDAO(ses);
			IncomingDAO iDao = new IncomingDAO(ses);
			ControlTypeDAO ctDao = new ControlTypeDAO(ses);
			UserDAO uDao = new UserDAO(ses);
			User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
			
			Database nsfDb = getDatabase("incoming.nsf");
			View view = nsfDb.getView("(AllUNID)");
			ViewEntryCollection vec = view.getAllEntries();
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form != null && form.equals("KR")) {
					Assignment entity = fillEntity(uDao, dao, doc, dummyUser, ctDao);
					String parent = doc.getParentDocumentUNID();
					Incoming inc = iDao.findByExtKey(parent);
					if (inc != null) {
						entity.setIncoming(inc);
						entity = entities.put(doc.getUniversalID(), entity);
					} else {
						Assignment parentEntity = dao.findByExtKey(parent);
						if (parentEntity != null) {
							entity.setParent(parentEntity);
							entity = entities.put(doc.getUniversalID(), entity);
						} else {
							logger.warningLogEntry("parent has not been found (" + parent + "), record was skipped");
						}
					}
				}
				tmpEntry = vec.getNextEntry();
				entry.recycle();
				entry = tmpEntry;
			}
			
			logger.infoLogEntry("has been found " + entities.size() + " records");
			for (Entry<String, Assignment> ee : entities.entrySet()) {
				save(dao, ee.getValue(), ee.getKey());
			}
		} catch (NotesException e) {
			logger.errorLogEntry(e);
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}
		logger.infoLogEntry("done...");
	}
	
	public Assignment fillEntity(UserDAO uDao, AssignmentDAO dao, Document doc, User dummyUser, ControlTypeDAO ctDao) {
		Assignment entity = null;
		try {
			String unId = doc.getUniversalID();
			entity = dao.findByExtKey(unId);
			if (entity == null) {
				entity = new Assignment();
			}
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
				entity.setAppliedAuthor(dummyUser.getId());
			}
			
			Control control = new Control();
			control.setStartDate(doc.getFirstItem("DateRez").getDateTimeValue().toJavaDate());
			control.setDueDate(doc.getFirstItem("CtrlDate").getDateTimeValue().toJavaDate());
			String ct = doc.getItemValueString("ControlView");
			String controlRefKey = controlTypeCollation.get(ct);
			if (controlRefKey == null) {
				logger.errorLogEntry("wrong reference ext value \"" + ct + "\"");
				controlRefKey = ConvertorEnvConst.GAG_KEY;
			}
			ControlType controlType = ctDao.findByName(controlRefKey);
			control.setControlType(controlType);
			List<AssigneeEntry> ass = new ArrayList<>();
			String otvExec = doc.getItemValueString("OtvExecNA");
			Vector<String> intExecs = doc.getItemValue("IntExecNA");
			for (String exec : intExecs) {
				IUser<Long> e = uDao.findByExtKey(exec);
				if (e != null) {
					AssigneeEntry assigneeEntry = new AssigneeEntry();
					assigneeEntry.setAssignee(e.getId());
					if (otvExec.equals(exec)) {
						assigneeEntry.setCoordinator(true);
					}
					ass.add(assigneeEntry);
				}
			}
			String controlStatus = doc.getItemValueString("AllControl");
			if (controlStatus.equalsIgnoreCase("reset")) {
				control.setStatus(ControlStatusType.COMPLETED);
				
				control.setAssigneeEntries(ass);
			} else {
				control.setStatus(ControlStatusType.PROCESSING);
			}
			entity.setControl(control);
			entity.setTitle(StringUtils.abbreviate(doc.getItemValueString("Content"), 140));
			entity.setBody(doc.getItemValueString("Content"));
			normalizeACL(uDao, entity, doc);
		} catch (NotesException e) {
			logger.errorLogEntry(e);
		} catch (Exception e) {
			logger.errorLogEntry(e);
		}
		return entity;
	}
	
	protected static Map<String, String> controlTypeCollationMapInit() {
		Map<String, String> collation = new HashMap<>();
		collation.put("Срочный контроль", "urgent_control");
		collation.put("Рабочий контроль", "on_normal_control");
		collation.put("На рабочем контроле", "on_normal_control");
		collation.put("На контроле", "in_control");
		collation.put("Для участия", "to_participate");
		collation.put("Для сведения", "for_information");
		collation.put("Для встречи", "for_meeting");
		collation.put("Весьма срочно", "very_urgent");
		return collation;
		
	}
}
