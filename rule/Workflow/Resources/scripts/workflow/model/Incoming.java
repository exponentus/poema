package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.HierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonSetter;

import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import reference.model.Tag;
import staff.model.Organization;

@JsonRootName("incoming")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "incomings")
@NamedQuery(name = "Incoming.findAll", query = "SELECT m FROM Incoming AS m ORDER BY m.regDate")
public class Incoming extends HierarchicalEntity<UUID> {
	
	@JsonIgnore
	@OneToMany(mappedBy = "incoming", fetch = FetchType.LAZY)
	private List<Assignment> assignments;
	
	@Column(name = "reg_number", unique = true)
	private String regNumber;
	
	@Column(name = "applied_reg_date")
	private Date appliedRegDate;
	
	private Organization sender;
	
	@Column(name = "sender_reg_number")
	private String senderRegNumber;
	
	@Column(name = "sender_applied_reg_date")
	private Date senderAppliedRegDate;
	
	@Column(nullable = false)
	protected Long addressee;
	
	private DocumentLanguage docLanguage;
	
	private DocumentType docType;
	
	private DocumentSubject docSubject;
	
	private Outgoing responseTo;
	
	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "incoming_attachments", joinColumns = {
			@JoinColumn(name = "incoming_id") }, inverseJoinColumns = {
					@JoinColumn(name = "attachment_id") }, indexes = {
							@Index(columnList = "incoming_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
									"incoming_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "incoming_tags")
	private List<Tag> tags;
	
	@Transient
	private List<IAppEntity> responses;
	
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
	
	public Organization getSender() {
		return sender;
	}
	
	public void setSender(Organization sender) {
		this.sender = sender;
	}
	
	@JsonSetter("sender")
	public void setSenderId(UUID id) {
		if (id != null) {
			sender = new Organization();
			sender.setId(id);
		}
	}
	
	public String getSenderRegNumber() {
		return senderRegNumber;
	}
	
	public void setSenderRegNumber(String senderRegNumber) {
		this.senderRegNumber = senderRegNumber;
	}
	
	public Date getSenderAppliedRegDate() {
		return senderAppliedRegDate;
	}
	
	public void setSenderAppliedRegDate(Date senderAppliedRegDate) {
		this.senderAppliedRegDate = senderAppliedRegDate;
	}
	
	public Long getAddressee() {
		return addressee;
	}
	
	public void setAddressee(Long addressee) {
		this.addressee = addressee;
	}
	
	@Override
	public List<Attachment> getAttachments() {
		return attachments;
	}
	
	@Override
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
	
	public DocumentLanguage getDocLanguage() {
		return docLanguage;
	}
	
	public void setDocLanguage(DocumentLanguage docLanguage) {
		this.docLanguage = docLanguage;
	}
	
	@JsonSetter("docLanguage")
	public void setDocLanguageId(UUID id) {
		if (id != null) {
			docLanguage = new DocumentLanguage();
			docLanguage.setId(id);
		}
	}
	
	public DocumentType getDocType() {
		return docType;
	}
	
	public void setDocType(DocumentType docType) {
		this.docType = docType;
	}
	
	public DocumentSubject getDocSubject() {
		return docSubject;
	}
	
	public void setDocSubject(DocumentSubject docSubject) {
		this.docSubject = docSubject;
	}
	
	@JsonSetter("docType")
	public void setDocTypeId(UUID id) {
		if (id != null) {
			docType = new DocumentType();
			docType.setId(id);
		}
	}
	
	public Outgoing getResponseTo() {
		return responseTo;
	}
	
	public void setResponseTo(Outgoing responseTo) {
		this.responseTo = responseTo;
	}
	
	@JsonSetter("responseTo")
	public void setResponseToId(UUID id) {
		if (id != null) {
			responseTo = new Outgoing();
			responseTo.setId(id);
		}
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	public List<Tag> getTags() {
		return tags;
	}
	
	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
	
	@Override
	public String getURL() {
		return "incomings/" + getIdentifier();
	}
	
	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
	}
	
	public List<IAppEntity> getResponses() {
		return responses;
	}
	
	public void setResponses(List<IAppEntity> responses) {
		this.responses = responses;
	}
}
