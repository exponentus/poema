package resourcereservations.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import resourcereservations.model.Reservation;

import java.util.UUID;

public class ApplicationDAO extends DAO<Reservation, UUID> {

    public ApplicationDAO(_Session session) throws DAOException {
        super(Reservation.class, session);
    }
}
