package workflow.model;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.exponentus.common.model.HierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import workflow.model.embedded.Control;

@JsonRootName("assignment")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "assignments")
@NamedQuery(name = "Assignment.findAll", query = "SELECT m FROM Assignment AS m ORDER BY m.regDate")
public class Assignment extends HierarchicalEntity<UUID> {
	
	@JsonIgnore
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	private List<Assignment> childAssignments;
	
	@JsonIgnore
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	private List<Report> reports;
	
	@Column(name = "applied_author", nullable = false, updatable = true)
	protected Long appliedAuthor;
	
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
	
	@JsonProperty("observerUserIds")
	private List<Long> observers;
	
	@Embedded
	private Control control;
	
	@Transient
	private List<IAppEntity> responses;
	
	public Long getAppliedAuthor() {
		return appliedAuthor;
	}
	
	public void setAppliedAuthor(long appliedAuthor) {
		this.appliedAuthor = appliedAuthor;
	}
	
	@JsonIgnore
	public Incoming getIncoming() {
		return incoming;
	}
	
	public void setIncoming(Incoming incoming) {
		this.incoming = incoming;
	}
	
	public Assignment getParent() {
		return parent;
	}
	
	public void setParent(Assignment parent) {
		this.parent = parent;
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	public List<Long> getObservers() {
		return observers;
	}
	
	public void setObservers(List<Long> observers) {
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
	public HierarchicalEntity<UUID> getParentEntity(_Session ses) {
		if (parent != null) {
			return parent;
		} else {
			return incoming;
		}
	}
	
	public List<IAppEntity> getResponses() {
		return responses;
	}
	
	public void setResponses(List<IAppEntity> responses) {
		this.responses = responses;
	}
}
