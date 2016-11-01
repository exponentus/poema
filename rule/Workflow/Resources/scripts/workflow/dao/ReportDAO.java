package workflow.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import workflow.model.Report;

public class ReportDAO extends DAO<Report, UUID> {

	public ReportDAO(_Session session) {
		super(Report.class, session);
	}
}
