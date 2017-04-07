package resourcereservations.dao;

import java.util.UUID;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import workflow.model.ApplicationForVehicle;

public class ApplicationForVehicleDAO extends DAO<ApplicationForVehicle, UUID> {

	public ApplicationForVehicleDAO(_Session session) throws DAOException {
		super(ApplicationForVehicle.class, session);
	}
}
