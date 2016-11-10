package workflow.model;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonProperty;

import workflow.model.embedded.Control;

@Entity
@Table(name = "assignments")
@NamedQuery(name = "Assignment.findAll", query = "SELECT m FROM Assignment AS m ORDER BY m.regDate")
public class Assignment extends SecureAppEntity<UUID> {
	
	@Column(name = "applied_author", nullable = false, updatable = true)
	protected Long appliedAuthor;
	
	@FTSearchable
	@Column(length = 140)
	private String title;
	
	@NotNull
	@ManyToOne
	private Incoming incoming;
	
	@NotNull
	@ManyToOne
	private Assignment parent;
	
	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;
	
	@JsonProperty("observerUserIds")
	private List<Long> observers;
	
	@Embedded
	private Control control;
	
	public Long getAppliedAuthor() {
		return appliedAuthor;
	}
	
	public void setAppliedAuthor(long appliedAuthor) {
		this.appliedAuthor = appliedAuthor;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
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
	
}
