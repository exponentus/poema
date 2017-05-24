package audit.task;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.constants.ReportType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.exception.DAOExceptionType;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;

import audit.dao.ReportDAO;
import audit.model.Report;

@Command(name = "fill_report_templates")
public class FillReportTemplates extends Do {

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		List<Report> entities = new ArrayList<>();

		String names[] = { "R1", "R2", "R3" };

		for (int i = 0; i < names.length; i++) {
			Report report = new Report();
			report.setType(ReportType.PDF);
			report.setName(names[i]);
			report.setTitle(names[i]);
			entities.add(report);
		}

		try {
			ReportDAO dao = new ReportDAO(ses);
			for (Report entry : entities) {
				try {
					if (dao.add(entry) != null) {
						logger.info(entry.getName() + " added");
					}
				} catch (DAOException e) {
					if (e.getType() == DAOExceptionType.UNIQUE_VIOLATION) {
						logger.warning("a data is already exists (" + e.getAddInfo() + "), record was skipped");
					} else if (e.getType() == DAOExceptionType.NOT_NULL_VIOLATION) {
						logger.warning("a value is null (" + e.getAddInfo() + "), record was skipped");
					} else {
						logger.exception(e);
					}
				} catch (SecureException e) {
					logger.exception(e);
				}
			}
		} catch (DAOException e) {
			logger.exception(e);
		}
		logger.info("done...");
	}

}
