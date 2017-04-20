package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import reference.model.Tag;
import staff.model.Employee;
import staff.model.Organization;
import staff.model.embedded.Observer;

@JsonRootName("incoming")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__incomings")
@Inheritance(strategy = InheritanceType.JOINED)
public class Incoming extends ControlledDocument {

	@Column(name = "reg_number", unique = true)
	private String regNumber;

	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	private Organization sender;

	@Column(name = "sender_reg_number")
	private String senderRegNumber;

	@Column(name = "sender_applied_reg_date")
	private Date senderAppliedRegDate;

	private Employee addressee;

	private DocumentLanguage docLanguage;

	private DocumentType docType;

	private DocumentSubject docSubject;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "wf__incoming_attachments", joinColumns = {
			@JoinColumn(name = "incoming_id") }, inverseJoinColumns = {
					@JoinColumn(name = "attachment_id") }, indexes = {
							@Index(columnList = "incoming_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
									"incoming_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "wf__incoming_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Observer> observers;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "wf__incoming_tags")
	private List<Tag> tags;

	@Transient
	private List<IAppEntity<UUID>> responses;

	public Incoming() {
	}

	// test
	public Incoming(UUID id, String title, String body, String regNumber, Date appliedRegDate, Organization sender,
			String senderRegNumber, Date senderAppliedRegDate, Employee addressee, DocumentLanguage docLanguage,
			DocumentType docType, DocumentSubject docSubject,
			Outgoing responseTo/* , Attachment[] atts */) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.regNumber = regNumber;
		this.appliedRegDate = appliedRegDate;
		this.sender = sender;
		this.senderRegNumber = senderRegNumber;
		this.senderAppliedRegDate = senderAppliedRegDate;
		this.addressee = addressee;
		this.docLanguage = docLanguage;
		this.docType = docType;
		this.docSubject = docSubject;
		// this.responseTo = responseTo;
		// if (atts.length > 0) {
		// this.attachments = Arrays.stream(atts).collect(Collectors.toList());
		// }
	}

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

	public Employee getAddressee() {
		return addressee;
	}

	public void setAddressee(Employee addressee) {
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

	@Override
	public String getURL() {
		return "incomings/" + getIdentifier();
	}

	public List<IAppEntity<UUID>> getResponses() {
		return responses;
	}

	public void setResponses(List<IAppEntity<UUID>> responses) {
		this.responses = responses;
	}
}
