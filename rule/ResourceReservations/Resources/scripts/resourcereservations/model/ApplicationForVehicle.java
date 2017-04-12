package resourcereservations.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.Vehicle;

@JsonRootName("applicationForVehicle")
@Entity
@Table(name = "applications_for_vehicle")
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
		return "applications_for_vehicle/" + getIdentifier();
	}
}
