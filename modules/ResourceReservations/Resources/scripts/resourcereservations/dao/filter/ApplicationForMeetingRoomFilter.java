package resourcereservations.dao.filter;

import com.exponentus.dataengine.IFilter;
import com.exponentus.scripting.WebFormData;
import reference.model.MeetingRoom;
import resourcereservations.model.ApplicationForMeetingRoom;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.UUID;

public class ApplicationForMeetingRoomFilter extends ApplicationFilter implements IFilter<ApplicationForMeetingRoom> {

    private MeetingRoom room;

    public ApplicationForMeetingRoomFilter() {
    }

    public ApplicationForMeetingRoomFilter(WebFormData params) {
        super(params);

        String roomId = params.getValueSilently("room");
        if (!roomId.isEmpty()) {
            MeetingRoom room = new MeetingRoom();
            room.setId(UUID.fromString(roomId));
            setRoom(room);
        }
    }

    public MeetingRoom getRoom() {
        return room;
    }

    public void setRoom(MeetingRoom room) {
        this.room = room;
    }

    @Override
    public Predicate collectPredicate(Root<ApplicationForMeetingRoom> root, CriteriaBuilder cb, Predicate condition) {
        if (getStatus() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("status"), getStatus());
            } else {
                condition = cb.and(cb.equal(root.get("status"), getStatus()), condition);
            }
        }

        if (getResult() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("result"), getResult());
            } else {
                condition = cb.and(cb.equal(root.get("result"), getResult()), condition);
            }
        }

        if (getTags() != null) {
            if (condition == null) {
                condition = root.get("tags").in(getTags());
            } else {
                condition = cb.and(root.get("tags").in(getTags()), condition);
            }
        }

        if (getRoom() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("room"), getRoom());
            } else {
                condition = cb.and(cb.equal(root.get("room"), getRoom()), condition);
            }
        }

        return condition;
    }
}
