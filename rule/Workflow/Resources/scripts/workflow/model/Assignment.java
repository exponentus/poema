package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.Tag;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.init.AppConst;
import workflow.model.embedded.Control;

@JsonRootName("assignment")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__assignments")
@Inheritance(strategy = InheritanceType.JOINED)
public class Assignment extends ControlledDocument {

	@JsonIgnore
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	@OrderBy("appliedRegDate")
	private List<Report> reports;

	@JoinColumn(name = "applied_author", nullable = false)
	private Employee appliedAuthor;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	@ManyToOne(optional = false)
	private ControlledDocument parent;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@ElementCollection
	@CollectionTable(name = "wf__assignment_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Observer> observers = new ArrayList<Observer>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "wf__assignment_tags")
	private List<Tag> tags;

	@Embedded
	private Control control;

	@Transient
	private List<IAppEntity<UUID>> responses;

	public Employee getAppliedAuthor() {
		return appliedAuthor;
	}

	public void setAppliedAuthor(Employee appliedAuthor) {
		this.appliedAuthor = appliedAuthor;
	}

	public Date getAppliedRegDate() {
		return appliedRegDate;
	}

	public void setAppliedRegDate(Date appliedRegDate) {
		this.appliedRegDate = appliedRegDate;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
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

	public Control getControl() {
		return control;
	}

	public void setControl(Control control) {
		this.control = control;
	}

	public List<Report> getReports() {
		return reports;
	}

	public ControlledDocument getParent() {
		return parent;
	}

	public void setParent(ControlledDocument parent) {
		this.parent = parent;
	}

	@Override
	public String getURL() {
		return AppConst.BASE_URL + "assignments/" + getIdentifier();
	}

	@Override
	public SecureHierarchicalEntity getParentEntity(_Session ses) {
		return parent;
	}

	public List<IAppEntity<UUID>> getResponses() {
		return responses;
	}

	public void setResponses(List<IAppEntity<UUID>> responses) {
		this.responses = responses;
	}
}
