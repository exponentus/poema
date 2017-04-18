package resourcereservations.dao.filter;

import reference.model.MeetingRoom;
import reference.model.Tag;
import reference.model.Vehicle;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.List;

public class ApplicationFilter {
    private ApprovalStatusType status;
    private ApprovalResultType result;
    private List<Tag> tags;

    private Vehicle vehicle;
    private MeetingRoom room;

    public ApprovalStatusType getStatus() {
        return status;
    }

    public void setStatus(ApprovalStatusType status) {
        this.status = status;
    }

    public ApprovalResultType getResult() {
        return result;
    }

    public void setResult(ApprovalResultType result) {
        this.result = result;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public MeetingRoom getRoom() {
        return room;
    }

    public void setRoom(MeetingRoom room) {
        this.room = room;
    }
}
