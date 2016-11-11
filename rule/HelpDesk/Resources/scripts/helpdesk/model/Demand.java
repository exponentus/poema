package helpdesk.model;

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
import javax.persistence.ManyToMany;
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
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

import helpdesk.model.constants.DemandStatusType;
import projects.model.Project;
import reference.model.Tag;
import staff.model.Organization;

@JsonRootName("demand")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "demands")
@NamedQuery(name = "Demand.findAll", query = "SELECT m FROM Demand AS m ORDER BY m.regDate")
@NamedEntityGraphs({ @NamedEntityGraph(name = Demand.SHORT_GRAPH, attributeNodes = {
		@NamedAttributeNode(value = "customer", subgraph = "customer"),
		@NamedAttributeNode(value = "attachments", subgraph = "attachments") }, subgraphs = {
				@NamedSubgraph(name = "customer", attributeNodes = { @NamedAttributeNode("id"),
						@NamedAttributeNode("name"), @NamedAttributeNode("localizedName") }),
				@NamedSubgraph(name = "attachments", attributeNodes = { @NamedAttributeNode("id"),
						@NamedAttributeNode("realFileName"), @NamedAttributeNode("size") }) }) })
public class Demand extends SecureAppEntity<UUID> {
	
	public final static String SHORT_GRAPH = "Demand.SHORT_GRAPH";

	private Project project;
	
	@FTSearchable(ignoreLang = true)
	@Column(name = "reg_number", length = 140)
	private String regNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private DemandStatusType status = DemandStatusType.UNKNOWN;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "status_date")
	private Date statusDate;
	
	@FTSearchable
	@Column(length = 140)
	private String title;
	
	private Organization customer;
	
	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "demand_tags")
	private List<Tag> tags;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "demand_attachments", joinColumns = { @JoinColumn(name = "demand_id") }, inverseJoinColumns = {
			@JoinColumn(name = "attachment_id") }, indexes = {
					@Index(columnList = "demand_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
							"demand_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();
	
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public DemandStatusType getStatus() {
		return status;
	}

	public void setStatus(DemandStatusType status) {
		this.status = status;
		statusDate = new Date();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Organization getCustomer() {
		return customer;
	}

	public void setCustomer(Organization customer) {
		this.customer = customer;
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
		return "p?id=" + this.getClass().getSimpleName().toLowerCase() + "-form&demandId=" + getIdentifier();
	}
}
