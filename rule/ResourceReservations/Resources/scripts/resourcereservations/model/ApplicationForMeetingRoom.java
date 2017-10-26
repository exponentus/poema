package resourcereservations.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import reference.model.MeetingRoom;
import resourcereservations.init.AppConst;

import javax.persistence.*;

@JsonRootName("applicationForMeetingRoom")
@Entity
@Table(name = "rr__applications_for_meeting_room")
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
        return AppConst.BASE_URL + "applications-for-meeting-room/" + getIdentifier();
    }
}
