package audit.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

import administrator.model.User;
import audit.model.constants.ObservationStatusType;
import reference.model.Tag;
import reference.model.WorkType;
import staff.model.Organization;

@JsonRootName("observation")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "audit__constr__observations")
public class Observation extends SecureHierarchicalEntity {

	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	private Project project;

	@FTSearchable(ignoreLang = true, regEx = "[^0-9]*")
	@Column(name = "reg_number", unique = true, length = 64)
	private String regNumber;

	@NotNull
	@ManyToOne(optional = false)
	@JoinColumn(name = "work_type_id")
	private WorkType workType;

	@Enumerated(EnumType.STRING)
	@Column(length = 16)
	private ObservationStatusType status = ObservationStatusType.UNKNOWN;

	@Column(name = "status_date")
	private Date statusDate;

	@Embedded
	private PlaceOfOrigin placeOfOrigin;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	private Organization contractor;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_date")
	private Date startDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "due_date")
	private Date dueDate;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "audit__constr__observation_tags")
	private List<Tag> tags;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "audit__constr__observation_observers")
	private List<User> observers;

	// @Embedded
	// private Approval approval;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "audit__constr__observation_attachments", joinColumns = {
			@JoinColumn(name = "observation_id") }, inverseJoinColumns = {
					@JoinColumn(name = "attachment_id") }, indexes = {
							@Index(columnList = "observation_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
									"observation_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@Transient
	private List<IAppEntity> responses;

	public Observation() {
		super();
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getRegNumber() {
		return regNumber;
	}

	public void setRegNumber(String regNumber) {
		this.regNumber = regNumber;
	}

	public WorkType getWorkType() {
		return workType;
	}

	public void setWorkType(WorkType workType) {
		this.workType = workType;
	}

	public ObservationStatusType getStatus() {
		return status;
	}

	public void setStatus(ObservationStatusType status) {
		this.status = status;
	}

	public Date getStatusDate() {
		return statusDate;
	}

	public void setStatusDate(Date date) {
		statusDate = date;
	}

	public PlaceOfOrigin getPlaceOfOrigin() {
		return placeOfOrigin;
	}

	public void setPlaceOfOrigin(PlaceOfOrigin placeOfOrigin) {
		this.placeOfOrigin = placeOfOrigin;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Organization getContractor() {
		return contractor;
	}

	public void setContractor(Organization o) {
		this.contractor = o;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public List<User> getObservers() {
		return observers;
	}

	public void setObservers(List<User> observers) {
		this.observers = observers;
	}

	@Override
	public List<Attachment> getAttachments() {
		return attachments;
	}

	@Override
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}

	//
	public List<IAppEntity> getResponses() {
		return responses;
	}

	public void setResponses(List<IAppEntity> responses) {
		this.responses = responses;
	}

	@Override
	public SecureHierarchicalEntity getParentEntity(_Session ses) {
		return project;
	}

	@Override
	public String getURL() {
		return "observations/" + getIdentifier();
	}
}
