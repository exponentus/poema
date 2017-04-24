package resourcereservations.model;

import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonRootName;
import reference.model.Vehicle;
import resourcereservations.init.AppConst;

import javax.persistence.*;

@JsonRootName("applicationForVehicle")
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
        return AppConst.BASE_URL + "applications_for_vehicle/" + getIdentifier();
    }
}
