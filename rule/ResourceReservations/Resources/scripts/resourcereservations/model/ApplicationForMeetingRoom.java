package resourcereservations.model;

import reference.model.MeetingRoom;
import resourcereservations.init.ModuleConst;

import javax.persistence.*;

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
        return ModuleConst.BASE_URL + "applications-for-meeting-room/" + getIdentifier();
    }
}
