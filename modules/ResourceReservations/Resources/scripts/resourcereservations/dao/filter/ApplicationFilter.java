package resourcereservations.dao.filter;

import com.exponentus.common.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.scripting.WebFormData;
import reference.model.MeetingRoom;
import reference.model.Tag;
import reference.model.Vehicle;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ApplicationFilter {
    private ApprovalStatusType status;
    private ApprovalResultType result;
    private List<Tag> tags;

    private Vehicle vehicle;
    private MeetingRoom room;

    public ApplicationFilter() {
    }

    public ApplicationFilter(WebFormData params) {
        String vehicleId = params.getValueSilently("vehicle");
        if (!vehicleId.isEmpty()) {
            Vehicle vehicle = new Vehicle();
            vehicle.setId(UUID.fromString(vehicleId));
            setVehicle(vehicle);
        }

        String statusName = params.getValueSilently("status");
        if (!statusName.isEmpty()) {
            setStatus(ApprovalStatusType.valueOf(statusName));
        }

        String resultName = params.getValueSilently("result");
        if (!resultName.isEmpty()) {
            setResult(ApprovalResultType.valueOf(resultName));
        }

        if (params.containsField("tag")) {
            List<Tag> tags = new ArrayList<>();
            String[] tagIds = params.getListOfValuesSilently("tag");
            for (String tid : tagIds) {
                Tag tag = new Tag();
                tag.setId(UUID.fromString(tid));
                tags.add(tag);
            }
            setTags(tags);
        }
    }

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
