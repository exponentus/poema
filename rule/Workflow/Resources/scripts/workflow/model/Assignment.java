package workflow.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import administrator.model.User;
import staff.model.Employee;
import workflow.model.embedded.Control;

@JsonRootName("assignment")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "assignments")
public class Assignment extends SecureHierarchicalEntity<UUID> {

	@JsonIgnore
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	private List<Assignment> childAssignments;

	@JsonIgnore
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	private List<Report> reports;

	@JoinColumn(name = "applied_author", nullable = false)
	private Employee appliedAuthor;

	@JsonIgnore
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Incoming incoming;

	@JsonIgnore
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Assignment parent;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	private List<User> observers;

	@Embedded
	private Control control;

	@Transient
	private List<IAppEntity<UUID>> responses;

	public Assignment() {

	}

	// test
	public Assignment(UUID id, Date regDate, String title, String body, Employee appliedAuthor) {
		this.id = id;
		this.regDate = regDate;
		this.title = title;
		this.body = body;
		this.appliedAuthor = appliedAuthor;
	}

	public Employee getAppliedAuthor() {
		return appliedAuthor;
	}

	public void setAppliedAuthor(Employee appliedAuthor) {
		this.appliedAuthor = appliedAuthor;
	}

	@JsonIgnore
	public Incoming getIncoming() {
		return incoming;
	}

	@JsonProperty
	public void setIncoming(Incoming incoming) {
		this.incoming = incoming;
	}

	public Assignment getParent() {
		return parent;
	}

	@JsonProperty
	public void setParent(Assignment parent) {
		this.parent = parent;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public List<User> getObservers() {
		return observers;
	}

	public void setObservers(List<User> observers) {
		this.observers = observers;
	}

	public Control getControl() {
		return control;
	}

	public void setControl(Control control) {
		this.control = control;
	}

	//
	public List<Assignment> getChildAssignments() {
		return childAssignments;
	}

	public List<Report> getReports() {
		return reports;
	}

	@Override
	public SecureHierarchicalEntity<UUID> getParentEntity(_Session ses) {
		if (parent != null) {
			return parent;
		} else {
			return incoming;
		}
	}

	public List<IAppEntity<UUID>> getResponses() {
		return responses;
	}

	public void setResponses(List<IAppEntity<UUID>> responses) {
		this.responses = responses;
	}
}
