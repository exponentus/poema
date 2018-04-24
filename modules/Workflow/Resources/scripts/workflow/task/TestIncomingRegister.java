package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.util.ListUtil;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.EmployeeDAO;
import staff.dao.OrganizationDAO;
import staff.model.Employee;
import staff.model.Organization;
import workflow.model.Incoming;
import workflow.services.IncomingService;

import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

@Command(name = "test_in")
public class TestIncomingRegister extends Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, String[]> formData = new HashMap<String, String[]>();
		IncomingService service = new IncomingService();
		service.setTestSession(ses, formData);
		String id = "new";
		Response resp = service.getById(id);
		System.out.println(resp.getStatus());
		System.out.println(resp.getEntity());

		try {
			OrganizationDAO oDao = new OrganizationDAO(ses);
			Organization org = (Organization) ListUtil.getRndListElement(oDao.findAll());
			EmployeeDAO eDao = new EmployeeDAO(ses);
			Employee emp = (Employee) ListUtil.getRndListElement(eDao.findAll());
			Outcome outcome = (Outcome) resp.getEntity();
			Map<String, Object> payload = outcome.getPayload();
			Incoming inc = (Incoming) payload.get(Incoming.class.getSimpleName().toLowerCase());
			if (inc != null) {
				inc.setTitle("test title");
				inc.setSender(org);
				inc.setAddressee(emp);
				inc.setSenderRegNumber("46");
				inc.setSenderAppliedRegDate(new Date());
				inc.setDocLanguage(new DocumentLanguageDAO(ses).getRandomEntity());
				inc.setDocType(new DocumentTypeDAO(ses).getRandomEntity());
				Response postResp = service.add(inc);
				System.out.println(postResp.getStatus());
				Outcome postOutcome = (Outcome) postResp.getEntity();
				for (Entry<String, Object> entry : postOutcome.getPayload().entrySet()) {
					System.out.println(entry.getKey() + " = " + entry.getValue().toString());
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
