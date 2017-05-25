package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;

import workflow.dao.AsProjectViewEntryDAO;
import workflow.dto.AsProjectViewEntry;

/**
 * 
 * temporary code
 * @author kaira
 * 24-05-2017
 *
 */
@Command(name = "test_apve")
public class TestAsProjectViewEntryRequestTest extends Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		try {
			System.out.println("start");
			AsProjectViewEntryDAO dao = new AsProjectViewEntryDAO(appEnv, ses);
			ViewPage<AsProjectViewEntry> vp = dao.findViewPage(0, 0);
			for (AsProjectViewEntry entry : vp.getResult()) {
				System.out.println(entry.getIdentifier() + " " + entry.parentForm);
			}
		} catch (DAOException e) {
			e.printStackTrace();
		}

	}
}
