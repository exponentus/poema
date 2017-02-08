package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import workflow.model.Outgoing;

import java.util.UUID;

public class OutgoingDAO extends DAO<Outgoing, UUID> {

    public OutgoingDAO(_Session session) throws DAOException {
        super(Outgoing.class, session);
    }
}
