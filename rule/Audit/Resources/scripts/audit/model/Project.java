package audit.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

import administrator.model.User;
import audit.init.AppConst;
import audit.model.constants.ProjectStatusType;

@JsonRootName("project")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "audit__constr__projects")
public class Project extends EmbeddedSecureHierarchicalEntity {

	@JsonIgnore
	@OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
	private List<Observation> observations;

	@FTSearchable
	@Column(length = 140)
	private String name;

	@FTSearchable
	@Column(length = 64)
	private String code;

	@Column(length = 140)
	private String prefix;

	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private ProjectStatusType status = ProjectStatusType.UNKNOWN;

	private User manager;

	@JoinColumn(name = "deputy_manager_id")
	private User deputyManager;

	private User inspector;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "audit__constr__projects_observers")
	private List<User> observers;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_date")
	private Date startDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "finish_date")
	private Date finishDate;

	@FTSearchable
	@Column(length = 2048)
	private String comment;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "audit__constr__project_attachments", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = {
			@JoinColumn(name = "attachment_id") }, indexes = {
					@Index(columnList = "project_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = { "project_id",
							"attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	public Project() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public ProjectStatusType getStatus() {
		return status;
	}

	public void setStatus(ProjectStatusType status) {
		this.status = status;
	}

	public User getManager() {
		return manager;
	}

	public void setManager(User manager) {
		this.manager = manager;
	}

	public User getDeputyManager() {
		return deputyManager;
	}

	public void setDeputyManager(User deputyManager) {
		this.deputyManager = deputyManager;
	}

	public User getInspector() {
		return inspector;
	}

	public void setInspector(User inspector) {
		this.inspector = inspector;
	}

	public List<User> getObservers() {
		return observers;
	}

	public void setObservers(List<User> observers) {
		this.observers = observers;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public List<Attachment> getAttachments() {
		return attachments;
	}

	@Override
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}

	@Override
	public String getTitle() {
		return name;
	}

	@Override
	public String getURL() {
		return AppConst.BASE_URL + "projects/" + getIdentifier();
	}
}
