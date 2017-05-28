package workflow.dao;

import java.util.UUID;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import workflow.model.ActionableDocument;

public class ActionableDocumentDAO extends DAO<ActionableDocument, UUID> {

	public ActionableDocumentDAO(_Session session) throws DAOException {
		super(ActionableDocument.class, session);
	}

	public ActionableDocumentDAO(AppEnv appEnv, _Session ses) throws DAOException {
		super(ActionableDocument.class, appEnv, ses);
	}

}