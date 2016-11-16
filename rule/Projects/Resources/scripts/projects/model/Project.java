package projects.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.NamedEntityGraphs;
import javax.persistence.NamedQuery;
import javax.persistence.NamedSubgraph;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.listeners.TreeListener;
import com.exponentus.dataengine.jpa.IHierarchicalEntity;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting._Session;
import com.exponentus.user.SuperUser;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.constants.ProjectStatusType;
import staff.model.Organization;

@JsonRootName("project")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "projects")
@EntityListeners(TreeListener.class)
@NamedQuery(name = "Project.findAll", query = "SELECT m FROM Project AS m ORDER BY m.regDate")
@NamedEntityGraphs({ @NamedEntityGraph(name = Project.SHORT_GRAPH, attributeNodes = {
		@NamedAttributeNode(value = "customer", subgraph = "customer"),
		@NamedAttributeNode(value = "attachments", subgraph = "attachments") }, subgraphs = {
				@NamedSubgraph(name = "customer", attributeNodes = { @NamedAttributeNode("id"),
						@NamedAttributeNode("name"), @NamedAttributeNode("localizedName") }),
				@NamedSubgraph(name = "attachments", attributeNodes = { @NamedAttributeNode("id"),
						@NamedAttributeNode("realFileName"), @NamedAttributeNode("size") }) }) })
public class Project extends SecureAppEntity<UUID> implements IHierarchicalEntity {

	public final static String SHORT_GRAPH = "Project.SHORT_GRAPH";

	@FTSearchable
	@Column(length = 140)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private ProjectStatusType status = ProjectStatusType.UNKNOWN;

	@Column(name = "primary_lang")
	private LanguageCode primaryLanguage;

	private Organization customer;

	@JsonProperty("managerUserId")
	private long manager;

	@JsonProperty("programmerUserId")
	private long programmer;

	@JsonProperty("testerUserId")
	private long tester;

	@JsonProperty("representativesUserIds")
	private List<Long> representatives;

	@JsonProperty("observerUserIds")
	private List<Long> observers;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date finishDate;

	@FTSearchable
	@Column(length = 2048)
	private String comment;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "project_attachments", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = {
			@JoinColumn(name = "attachment_id") }, indexes = {
					@Index(columnList = "project_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
							"project_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ProjectStatusType getStatus() {
		return status;
	}

	public void setStatus(ProjectStatusType status) {
		this.status = status;
	}

	public LanguageCode getPrimaryLanguage() {
		return primaryLanguage;
	}

	public void setPrimaryLanguage(LanguageCode primaryLanguage) {
		this.primaryLanguage = primaryLanguage;
	}

	// TODO short graph
	public Organization getCustomer() {
		return customer;
	}

	public void setCustomer(Organization customer) {
		this.customer = customer;
	}

	public long getManager() {
		return manager;
	}

	public void setManager(long manager) {
		this.manager = manager;
	}

	public long getProgrammer() {
		return programmer;
	}

	public void setProgrammer(long programmer) {
		this.programmer = programmer;
	}

	public long getTester() {
		return tester;
	}

	public void setTester(long tester) {
		this.tester = tester;
	}
	
	public List<Long> getRepresentatives() {
		return representatives;
	}
	
	public void setRepresentatives(List<Long> representatives) {
		this.representatives = representatives;
	}
	
	public List<Long> getObservers() {
		return observers;
	}

	public void setObservers(List<Long> observers) {
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

	public boolean isHasAttachments() {
		return attachments.size() > 0;
	}

	// TODO short graph
	@Override
	public List<Attachment> getAttachments() {
		return attachments;
	}

	@Override
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}

	@Override
	public String getURL() {
		return "p?id=" + this.getClass().getSimpleName().toLowerCase() + "-form&projectId=" + getIdentifier();
	}

	@Override
	@Transient
	public List<UUID> getResponses() {
		List<UUID> resp = new ArrayList<UUID>();
		TaskDAO dao = new TaskDAO(new _Session(new SuperUser()));
		TaskFilter filter = new TaskFilter();
		filter.setProject(this);
		ViewPage<Task> vp = dao.findAll(filter, null, 0, 0);
		for (Task r : vp.getResult()) {
			resp.add(r.getId());
		}
		return resp;
	}
}
