package workflow.tasks;

import java.util.List;

import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPatch;
import com.exponentus.scriptprocessor.tasks.Command;

import staff.dao.OrganizationDAO;

@Command(name = "test")
public class Test extends _DoPatch {

	@Override
	public void doTask(_Session ses) {

		OrganizationDAO oDao = new OrganizationDAO(ses);

		List<Object[]> list = oDao.findAllExt(1, 50);
		for (Object[] org : list) {
			System.out.println(org[0]);
		}

		System.out.println("done...");
	}

}
