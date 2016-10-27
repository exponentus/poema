package workflow.tasks;

import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPatch;
import com.exponentus.scriptprocessor.tasks.Command;

import administrator.tasks.ImportExtUserNSF;
import reference.tasks.ImportDocumentSubjNSF;
import reference.tasks.ImportPositionNSF;
import staff.tasks.ImportDepFromNSF;
import staff.tasks.ImportEmpFromNSF;
import staff.tasks.ImportOrgsFromNSF;
import staff.tasks.ImportRvzFromNSF;

@Command(name = "import_sd")
public class PopulatingSD extends _DoPatch {

	@Override
	public void doTask(_Session ses) {
		logger.infoLogEntry("step1-------------import names.nsf");
		ImportExtUserNSF step1 = new ImportExtUserNSF();
		step1.doTask(ses);

		logger.infoLogEntry("step2-------------import Positions");
		ImportPositionNSF step2 = new ImportPositionNSF();
		step2.doTask(ses);

		logger.infoLogEntry("step3-------------import Document subjects");
		ImportDocumentSubjNSF step3 = new ImportDocumentSubjNSF();
		step3.doTask(ses);

		logger.infoLogEntry("step4-------------import Correspondents");
		ImportOrgsFromNSF step4 = new ImportOrgsFromNSF();
		step4.doTask(ses);

		logger.infoLogEntry("step5-------------import RVZ");
		ImportRvzFromNSF step5 = new ImportRvzFromNSF();
		step5.doTask(ses);

		logger.infoLogEntry("step6-------------import Departaments");
		ImportDepFromNSF step6 = new ImportDepFromNSF();
		step6.doTask(ses);

		logger.infoLogEntry("step7-------------import Employees");
		ImportEmpFromNSF step7 = new ImportEmpFromNSF();
		step7.doTask(ses);

		logger.infoLogEntry("done...");
	}

}
