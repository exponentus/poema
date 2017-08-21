package resourcereservations.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;

import reference.model.Tag;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.model.ActionableDocument;

@Entity
@Table(name = "rr__reservations")
@NamedQuery(name = "Reservation.findAll", query = "SELECT m FROM Reservation AS m ORDER BY m.regDate")
public class Reservation extends ActionableDocument {

	@Column(name = "reg_number")
	private String regNumber;

	@Column(name = "applied_reg_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date appliedRegDate;

	@JoinColumn(name = "applied_author", nullable = false)
	private Employee appliedAuthor;

	@JoinColumn(nullable = false)
	private Employee recipient;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@Column(name = "use_from")
	@Temporal(TemporalType.TIMESTAMP)
	private Date useFrom;

	@Column(name = "use_to")
	@Temporal(TemporalType.TIMESTAMP)
	private Date useTo;

	@ElementCollection
	@CollectionTable(name = "rr__reservation_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Observer> observers;

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

	public List<Observer> getObservers() {
		return observers;
	}

	public void setObservers(List<Observer> observers) {
		this.observers = observers;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	@Override
	public List<Employee> getRecipientsAfterApproval() {
		List<Employee> recipients = new ArrayList<Employee>();
		recipients.add(recipient);
		return recipients;
	}
}
