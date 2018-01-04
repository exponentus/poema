package resourcereservations.model;

import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import reference.model.Vehicle;
import resourcereservations.init.ModuleConst;

import javax.persistence.*;

@Entity
@Table(name = "rr__applications_for_vehicle")
@Inheritance(strategy = InheritanceType.JOINED)
public class ApplicationForVehicle extends Reservation {

    @ManyToOne(optional = true)
    @JoinColumn(nullable = false)
    private Vehicle vehicle;

    @FTSearchable
    private String route;

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    @Override
    public String getURL() {
        return ModuleConst.BASE_URL + "applications-for-vehicle/" + getIdentifier();
    }
}
