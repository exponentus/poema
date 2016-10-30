package workflow.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import workflow.model.Assignment;

public class AssignmentDAO extends DAO<Assignment, UUID> {

	public AssignmentDAO(_Session session) {
		super(Assignment.class, session);
	}
}
