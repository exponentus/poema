package workflow.tasks;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPatch;
import com.exponentus.scriptprocessor.tasks.Command;

import lotus.domino.Database;
import lotus.domino.Document;
import lotus.domino.NotesException;
import lotus.domino.NotesFactory;
import lotus.domino.Session;
import lotus.domino.View;
import lotus.domino.ViewEntry;
import lotus.domino.ViewEntryCollection;
import staff.dao.OrganizationDAO;
import staff.model.Organization;
import workflow.model.Incoming;

@Command(name = "load_in_nsf")
public class LoadIncomingsFromNSF extends _DoPatch {
	private static final String DOMINO_HOST = "localhost";
	private static final String DOMINO_USER = "developer";
	private static final String DOMINO_USER_PWD = "123";
	private static final String IN_DATABASE = "SmartDoc_BRK\\incoming.nsf";

	@Override
	public void doTask(_Session ses) {
		List<Organization> entities = new ArrayList<>();
		try {
			Session dominoSession = NotesFactory.createSession(DOMINO_HOST, DOMINO_USER, DOMINO_USER_PWD);
			Database inDb = dominoSession.getDatabase(dominoSession.getServerName(), IN_DATABASE);
			View view = inDb.getView("(AllUNID)");
			ViewEntryCollection vec = view.getAllEntries();
			ViewEntry entry = vec.getFirstEntry();
			ViewEntry tmpEntry = null;
			while (entry != null) {
				Document doc = entry.getDocument();
				String form = doc.getItemValueString("Form");
				if (form.equals("IN")) {
					Incoming inc = new Incoming();
					inc.setRegNumber(doc.getItemValueString("Vn"));
					inc.setAppliedRegDate(doc.getFirstItem("Dvn").getDateTimeValue().toJavaDate());
					// inc.setAuthor(doc.getItemValueString("Vn"));
					inc.setBody(doc.getItemValueString("Vn"));
					// inc.setControl(doc.getItemValueString("Vn"));
					// inc.setDocLanguage(doc.getItemValueString("Vn"));
					// inc.setDocType(doc.getItemValueString("Vn"));
					inc.setSender(null);
					inc.setForm(null);
					inc.setReaders(null);
					inc.setResponseTo(null);
					inc.setSenderRegNumber(null);
					inc.setTitle(form);
				}
				tmpEntry = vec.getNextEntry();
				entry.recycle();
				entry = tmpEntry;
			}

		} catch (NotesException e) {
			logger.errorLogEntry(e);
		}

		OrganizationDAO oDao = new OrganizationDAO(ses);
		for (Organization org : entities) {
			try {
				oDao.add(org);
				System.out.println(org.getName() + " added");
			} catch (SecureException | DAOException e) {
				logger.errorLogEntry(e);
			}
		}
		System.out.println("done...");
	}

}
