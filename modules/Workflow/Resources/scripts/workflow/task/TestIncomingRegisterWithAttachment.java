package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.dao.BigFileDAO;
import com.exponentus.common.model.BigFile;
import com.exponentus.common.model.embedded.ExtendedAttachment;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.FormError;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.util.FileUtil;
import com.exponentus.util.ListUtil;
import com.exponentus.util.StringUtil;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentSubjectDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.EmployeeDAO;
import staff.dao.OrganizationDAO;
import staff.model.Employee;
import staff.model.Organization;
import workflow.model.Incoming;
import workflow.services.IncomingService;

import javax.ws.rs.core.Response;
import java.io.File;
import java.util.*;
import java.util.Map.Entry;

@Command(name = "test1")
public class TestIncomingRegisterWithAttachment extends Do {

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
				inc.setDocSubject(new DocumentSubjectDAO(ses).getRandomEntity());
				List<ExtendedAttachment> eat = new ArrayList<ExtendedAttachment>();
				ExtendedAttachment extAttach = new ExtendedAttachment();
				File randomFile = FileUtil.getRndFile("/home/aida/Downloads/movies");
				String path = randomFile.getAbsolutePath();

				File exampleFile = new File(path);
				System.out.println(
						"file=" + FilenameUtils.getBaseName(path) + ", size=" + FileUtils.byteCountToDisplaySize(exampleFile.length()));
				//byte[] data = Files.readAllBytes(Paths.get(path));
				BigFile af = new BigFile();
				//af.setFile(data);
				af.setFilePath(path);
				BigFileDAO dao = new BigFileDAO();
				long oid = dao.insert(af);
				extAttach.setOid(oid);
				//extAttach.setFile(af);

				extAttach.setComment(StringUtil.getRndArticle(2));
				eat.add(extAttach);
				inc.setExtAttachments(eat);

				Response postResp = service.add(inc);
				System.out.println(postResp.getStatus());
				Outcome postOutcome = (Outcome) postResp.getEntity();
				for (Entry<String, Object> entry : postOutcome.getPayload().entrySet()) {
					System.out.println(entry.getKey() + " = " + entry.getValue().toString());
					if (entry.getValue() instanceof DTOException) {
						DTOException e = (DTOException) entry.getValue();
						for (FormError err : e.getErrors()) {
							System.out.println(err);
						}
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("done.");
	}
}
