package resourcereservations.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import resourcereservations.model.ApplicationForMeetingRoom;

import javax.persistence.EntityManagerFactory;
import java.util.UUID;

public class ApplicationForMeetingRoomDAO extends DAO<ApplicationForMeetingRoom, UUID> {

    public ApplicationForMeetingRoomDAO(_Session session) throws DAOException {
        super(ApplicationForMeetingRoom.class, session);
    }

    public ApplicationForMeetingRoomDAO(EntityManagerFactory emf) {
        super(ApplicationForMeetingRoom.class, emf);
    }
}
