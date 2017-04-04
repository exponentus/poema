package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import workflow.model.ApplicationForVehicle;

import java.util.UUID;

public class ApplicationForVehicleDAO extends DAO<ApplicationForVehicle, UUID> {

    public ApplicationForVehicleDAO(_Session session) throws DAOException {
        super(ApplicationForVehicle.class, session);
    }
}
