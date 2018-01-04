package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import workflow.dao.ActionableDocumentDAO;
import workflow.model.ActionableDocument;


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
			ActionableDocumentDAO dao = new ActionableDocumentDAO(appEnv, ses);
			ViewPage<ActionableDocument> vp = dao.findViewPage(0, 0);
			for (ActionableDocument entry : vp.getResult()) {
				System.out.println(entry.getIdentifier() + " " + entry.getForm());
			}
		} catch (DAOException e) {
			e.printStackTrace();
		}

	}
}
