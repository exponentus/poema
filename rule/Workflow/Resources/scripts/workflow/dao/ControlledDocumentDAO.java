package workflow.dao;

import java.util.UUID;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import workflow.model.ControlledDocument;

public class ControlledDocumentDAO extends DAO<ControlledDocument, UUID> {

	public ControlledDocumentDAO(_Session session) throws DAOException {
		super(ControlledDocument.class, session);
	}

}
