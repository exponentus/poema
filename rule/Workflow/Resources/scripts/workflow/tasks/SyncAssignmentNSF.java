package workflow.tasks;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import org.apache.commons.lang3.StringUtils;

import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.smartdoc.ImportNSF;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import lotus.domino.Document;
import lotus.domino.NotesException;
import lotus.domino.ViewEntry;
import lotus.domino.ViewEntryCollection;
import reference.dao.ControlTypeDAO;
import reference.model.ControlType;
import staff.dao.OrganizationDAO;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;
import workflow.model.embedded.Control;

@Command(name = "import_kr_nsf")
public class SyncAssignmentNSF extends ImportNSF {

	@Override
	public void doTask(_Session ses) {
		Map<String, Assignment> entities = new HashMap<>();
		OrganizationDAO oDao = new OrganizationDAO(ses);
		AssignmentDAO dao = new AssignmentDAO(ses);
		IncomingDAO iDao = new IncomingDAO(ses);
		ControlTypeDAO ctDao = new ControlTypeDAO(ses);
		UserDAO uDao = new UserDAO(ses);
		Map<String, String> controlTypeCollation = controlTypeCollationMapInit();
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
						String controlStatus = doc.getItemValueString("AllControl");
						if (controlStatus.equalsIgnoreCase("reset")) {
							control.setStatus(ControlStatusType.COMPLETED);
						} else {
							control.setStatus(ControlStatusType.PROCESSING);
						}
						control.setControlType(controlType);
						List<AssigneeEntry> ass = new ArrayList<>();
						@SuppressWarnings("unchecked")
						Vector<String> intExecs = doc.getItemValue("IntExecNA");
						for (String exec : intExecs) {
							IUser<Long> e = uDao.findByExtKey(exec);
							if (e != null) {
								AssigneeEntry assigneeEntry = new AssigneeEntry();
								assigneeEntry.setAssignee(e.getId());
								ass.add(assigneeEntry);
							}
						}
						control.setAssigneeEntries(ass);
						entity.setControl(control);
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

	private Map<String, String> controlTypeCollationMapInit() {
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
