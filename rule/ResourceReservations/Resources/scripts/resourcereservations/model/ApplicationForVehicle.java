package resourcereservations.model;

import administrator.model.User;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonRootName;
import reference.model.Tag;
import reference.model.Vehicle;
import staff.model.Employee;
import workflow.model.embedded.Approval;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@JsonRootName("applicationForVehicle")
@Entity
@Table(name = "applications_for_vehicle")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ApplicationForVehicle extends Approval {

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    @JoinColumn(name = "applied_author", nullable = false)
    private Employee appliedAuthor;

    @JoinColumn(nullable = false)
    private Employee recipient;

    @ManyToOne(optional = true)
    @JoinColumn(nullable = false)
    private Vehicle vehicle;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @FTSearchable
    @Column(name = "use_from")
    private Date useFrom;

    @FTSearchable
    @Column(name = "use_to")
    private Date useTo;

    @FTSearchable
    private String route;

    private List<User> observers;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "application_for_vehicle_tags")
    private List<Tag> tags;

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public Date getAppliedRegDate() {
        return appliedRegDate;
    }

    public void setAppliedRegDate(Date appliedRegDate) {
        this.appliedRegDate = appliedRegDate;
    }

    public Employee getAppliedAuthor() {
        return appliedAuthor;
    }

    public void setAppliedAuthor(Employee appliedAuthor) {
        this.appliedAuthor = appliedAuthor;
    }

    public Employee getRecipient() {
        return recipient;
    }

    public void setRecipient(Employee recipient) {
        this.recipient = recipient;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Date getUseFrom() {
        return useFrom;
    }

    public void setUseFrom(Date useFrom) {
        this.useFrom = useFrom;
    }

    public Date getUseTo() {
        return useTo;
    }

    public void setUseTo(Date useTo) {
        this.useTo = useTo;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public List<User> getObservers() {
        return observers;
    }

    public void setObservers(List<User> observers) {
        this.observers = observers;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String getURL() {
        return "applications_for_vehicle/" + getIdentifier();
    }
}
