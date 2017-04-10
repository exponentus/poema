package resourcereservations.dao.filter;

import reference.model.Tag;
import reference.model.Vehicle;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

import java.util.List;

public class ApplicationForVehicleFilter {
    private ApprovalStatusType status;
    private ApprovalResultType result;
    private Vehicle vehicle;
    private List<Tag> tags;

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

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
