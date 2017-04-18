package resourcereservations.model;

import administrator.model.User;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import reference.model.Tag;
import staff.model.Employee;
import workflow.model.embedded.ApprovalSecureAppEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "rr__reservations")
@NamedQuery(name = "Reservation.findAll", query = "SELECT m FROM Reservation AS m ORDER BY m.regDate")
public class Reservation extends ApprovalSecureAppEntity {

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    @JoinColumn(name = "applied_author", nullable = false)
    private Employee appliedAuthor;

    @JoinColumn(nullable = false)
    private Employee recipient;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @FTSearchable
    @Column(name = "use_from")
    private Date useFrom;

    @FTSearchable
    @Column(name = "use_to")
    private Date useTo;

    private List<User> observers;

    @ManyToMany(fetch = FetchType.EAGER)
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
    public List<Employee> getRecipients() {
        List<Employee> recipients = new ArrayList<Employee>();
        recipients.add(recipient);
        return recipients;
    }
}
