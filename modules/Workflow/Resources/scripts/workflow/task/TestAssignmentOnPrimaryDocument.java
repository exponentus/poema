package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import reference.dao.ControlTypeDAO;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.AssignmentDAO;
import workflow.dao.OfficeMemoDAO;
import workflow.model.Assignment;
import workflow.model.embedded.AssigneeEntry;
import workflow.services.AssignmentService;

import javax.ws.rs.core.Response;
import java.util.*;
import java.util.Map.Entry;

@Command(name = "test_ass")
public class TestAssignmentOnPrimaryDocument extends Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		try {
			System.out.println("GET");
			Map<String, String[]> formData = new HashMap<String, String[]>();
			// formData.put("incoming", new String[] { new
			// IncomingDAO(ses).getRandomEntity().getId().toString() });
			formData.put("officememo", new String[] { new OfficeMemoDAO(ses).getRandomEntity().getId().toString() });
			AssignmentService service = new AssignmentService();
			service.setTestSession(ses, formData);
			String id = "new";
			Response resp = service.getById(id);
			System.out.println(resp.getStatus());
			System.out.println(resp.getEntity());

			System.out.println("POST");
			Outcome outcome = (Outcome) resp.getEntity();
			Map<String, Object> payload = outcome.getPayload();
			Assignment assignment = (Assignment) payload.get(Assignment.class.getSimpleName().toLowerCase());
			if (assignment != null) {
				assignment.setTitle("test title");
				assignment.setDueDate(new Date());
				List<AssigneeEntry> ae = new ArrayList<AssigneeEntry>();
				AssigneeEntry aEntry = new AssigneeEntry();
				EmployeeDAO eDao = new EmployeeDAO(ses);
				Employee assignee = (Employee) eDao.getEmployee(ses.getUser().getId());
				aEntry.setAssignee(assignee);
				ae.add(aEntry);
				//Control control = assignment.getControl();
				ControlTypeDAO cDao = new ControlTypeDAO(ses);
				assignment.setControlType(cDao.findAll().getResult().get(0));
				assignment.setAssigneeEntries(ae);

				Response postResp = service.add(assignment);

				System.out.println(postResp.getStatus());
				Outcome postOutcome = (Outcome) postResp.getEntity();
				for (Entry<String, Object> entry : postOutcome.getPayload().entrySet()) {
					Object obj = entry.getValue();
					if (obj != null) {
						System.out.println(entry.getKey() + " = " + entry.getValue().toString());
					} else {
						System.out.println(entry.getKey() + " = null");
					}
				}

			}

			AssignmentDAO aDao = new AssignmentDAO(ses);
			for (Assignment entry : aDao.findAll().getResult()) {
				System.out.println(entry);
			}
		} catch (DAOException e) {
			e.printStackTrace();
		}

	}
}
