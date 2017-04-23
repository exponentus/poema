package workflow.dao;

import java.util.UUID;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;

import workflow.model.OfficeMemo;

public class OfficeMemoDAO extends ControlledDocumentDAO<OfficeMemo, UUID> {

	public OfficeMemoDAO(_Session session) throws DAOException {
		super(OfficeMemo.class, session);
	}
}
