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
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonSetter;

import reference.model.DocumentLanguage;
import reference.model.DocumentType;
import staff.model.Organization;

@JsonRootName("incoming")
@Entity
@Table(name = "incomings")
@NamedQuery(name = "Incoming.findAll", query = "SELECT m FROM Incoming AS m ORDER BY m.regDate")
public class Incoming extends SecureAppEntity<UUID> {

	@FTSearchable
	@Column(length = 140)
	private String title;

	@Column(name = "reg_number", unique = true)
	private String regNumber;

	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	private Organization sender;

	@Column(name = "sender_reg_number")
	private String senderRegNumber;

	@Column(name = "sender_applied_reg_date")
	private Date senderAppliedRegDate;

	private DocumentLanguage docLanguage;

	private DocumentType docType;

	private Outgoing responseTo;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "incoming_attachments", joinColumns = { @JoinColumn(name = "incoming_id") }, inverseJoinColumns = {
	        @JoinColumn(name = "attachment_id") }, indexes = {
	                @Index(columnList = "incoming_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = { "incoming_id",
	                        "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	@Override
	public String getURL() {
		return "incomings/" + getIdentifier();
	}
}
