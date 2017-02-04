package helpdesk.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import helpdesk.model.Demand;

import java.util.UUID;

public class DemandDAO extends DAO<Demand, UUID> {

    public DemandDAO(_Session session) throws DAOException {
        super(Demand.class, session);
    }
}
