package resourcereservations.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.MeetingRoom;

@JsonRootName("applicationForMeetingRoom")
@Entity
@Table(name = "applications_for_meeting_room")
@Inheritance(strategy = InheritanceType.JOINED)
public class ApplicationForMeetingRoom extends Reservation {

	@ManyToOne(optional = true)
	@JoinColumn(nullable = false)
	private MeetingRoom room;

	@FTSearchable
	private String location;

	@Override
	public String getURL() {
		return "applications_for_meetingroom/" + getIdentifier();
	}
}
