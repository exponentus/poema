package projects.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.localization.LanguageCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import projects.model.constants.ProjectStatusType;
import staff.model.Organization;

@JsonRootName("project")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "projects")
@NamedQuery(name = "Project.findAll", query = "SELECT m FROM Project AS m ORDER BY m.regDate")

// ?
@NamedEntityGraphs({
        @NamedEntityGraph(name = Project.ORGANIZATION_SHORT, attributeNodes = @NamedAttributeNode(value = "customer", subgraph = "customer"), subgraphs = @NamedSubgraph(name = "customer", attributeNodes = {
                @NamedAttributeNode("id"), @NamedAttributeNode("name"), @NamedAttributeNode("localizedName") })),
        @NamedEntityGraph(name = Project.ATTACHMENT_SHORT, attributeNodes = @NamedAttributeNode(value = "attachments", subgraph = "attachments"), subgraphs = @NamedSubgraph(name = "attachments", attributeNodes = {
                @NamedAttributeNode("realFileName"), @NamedAttributeNode("size") })) })

public class Project extends SecureAppEntity<UUID> {

	public final static String ORGANIZATION_SHORT = "PROJECT.ORGANIZATION_SHORT";
	public final static String ATTACHMENT_SHORT = "PROJECT.ATTACHMENT_SHORT";

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

	@JsonProperty("observerUserIds")
	private List<Long> observers;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date finishDate;

	@FTSearchable
	@Column(length = 2048)
	private String comment;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "project_attachments", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = {
	        @JoinColumn(name = "attachment_id") }, indexes = {
	                @Index(columnList = "project_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = { "project_id",
	                        "attachment_id" }))
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

	@JsonIgnore
	public Organization getCustomer() {
		return customer;
	}

	public String getCustomerId() {
		return customer != null ? customer.getIdentifier() : null;
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

	@Override
	@JsonIgnore
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

}
