package resourcereservations.dao.filter;

import com.exponentus.dataengine.IFilter;
import com.exponentus.scripting.WebFormData;
import reference.model.Vehicle;
import resourcereservations.model.ApplicationForVehicle;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.UUID;

public class ApplicationForVehicleFilter extends ApplicationFilter implements IFilter<ApplicationForVehicle> {

    private Vehicle vehicle;

    public ApplicationForVehicleFilter() {
    }

    public ApplicationForVehicleFilter(WebFormData params) {
        super(params);

        String vehicleId = params.getValueSilently("vehicle");
        if (!vehicleId.isEmpty()) {
            Vehicle vehicle = new Vehicle();
            vehicle.setId(UUID.fromString(vehicleId));
            setVehicle(vehicle);
        }
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    @Override
    public Predicate collectPredicate(Root<ApplicationForVehicle> root, CriteriaBuilder cb, Predicate condition) {
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

        if (getVehicle() != null) {
            if (condition == null) {
                condition = cb.equal(root.get("vehicle"), getVehicle());
            } else {
                condition = cb.and(cb.equal(root.get("vehicle"), getVehicle()), condition);
            }
        }

        return condition;
    }
}
