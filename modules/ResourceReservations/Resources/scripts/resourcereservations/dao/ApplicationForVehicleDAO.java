package resourcereservations.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import resourcereservations.model.ApplicationForVehicle;

import java.util.UUID;

public class ApplicationForVehicleDAO extends DAO<ApplicationForVehicle, UUID> {

    public ApplicationForVehicleDAO(_Session session) throws DAOException {
        super(ApplicationForVehicle.class, session);
    }
}
