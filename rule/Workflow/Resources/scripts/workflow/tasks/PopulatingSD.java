package workflow.tasks;

import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._DoPatch;
import com.exponentus.scriptprocessor.tasks.Command;

import administrator.tasks.ImportExtUserNSF;
import reference.tasks.ImportDocumentSubjNSF;
import reference.tasks.ImportPositionNSF;
import reference.tasks.InsertUndefinedGag;
import staff.tasks.ImportDepFromNSF;
import staff.tasks.ImportEmpFromNSF;
import staff.tasks.ImportOrgsFromNSF;
import staff.tasks.ImportRvzFromNSF;

@Command(name = "import_sd")
public class PopulatingSD extends _DoPatch {

	@Override
	public void doTask(_Session ses) {
		logger.infoLogEntry("step 1 -------------import names.nsf");
		ImportExtUserNSF step1 = new ImportExtUserNSF();
		step1.doTask(ses);

		logger.infoLogEntry("step 2 -------------inser dummy Reference entries");
		InsertUndefinedGag step2 = new InsertUndefinedGag();
		step2.doTask(ses);

		logger.infoLogEntry("step 3 -------------import Positions");
		ImportPositionNSF step3 = new ImportPositionNSF();
		step3.doTask(ses);

		logger.infoLogEntry("step 4 -------------import Document subjects");
		ImportDocumentSubjNSF step4 = new ImportDocumentSubjNSF();
		step4.doTask(ses);

		logger.infoLogEntry("step 5 -------------import Correspondents");
		ImportOrgsFromNSF step5 = new ImportOrgsFromNSF();
		step5.doTask(ses);

		logger.infoLogEntry("step 6 -------------import RVZ");
		ImportRvzFromNSF step6 = new ImportRvzFromNSF();
		step6.doTask(ses);

		logger.infoLogEntry("step 7 -------------import Departments");
		ImportDepFromNSF step7 = new ImportDepFromNSF();
		step7.doTask(ses);

		logger.infoLogEntry("step 8-------------import Employees");
		ImportEmpFromNSF step8 = new ImportEmpFromNSF();
		step8.doTask(ses);

		logger.infoLogEntry("done...");
	}

}
