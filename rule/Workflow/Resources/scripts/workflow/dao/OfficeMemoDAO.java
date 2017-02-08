package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import workflow.model.OfficeMemo;

import java.util.UUID;

public class OfficeMemoDAO extends DAO<OfficeMemo, UUID> {

    public OfficeMemoDAO(_Session session) throws DAOException {
        super(OfficeMemo.class, session);
    }
}
