package resourcereservations.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import reference.model.MeetingRoom;

import javax.persistence.*;

@JsonRootName("applicationForMeetingRoom")
@Entity
@Table(name = "applications_for_meeting_room")
@Inheritance(strategy = InheritanceType.JOINED)
public class ApplicationForMeetingRoom extends Reservation {

    @ManyToOne(optional = true)
    @JoinColumn(nullable = false)
    private MeetingRoom room;

    public MeetingRoom getRoom() {
        return room;
    }

    public void setRoom(MeetingRoom room) {
        this.room = room;
    }

    @Override
    public String getURL() {
        return "applications_for_meeting_room/" + getIdentifier();
    }
}
