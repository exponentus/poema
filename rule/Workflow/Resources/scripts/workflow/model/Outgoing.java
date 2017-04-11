package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
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
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import reference.model.Tag;
import staff.model.Organization;
import workflow.model.embedded.Approval;

/**
 * @author Kayra created 07-04-2016
 */

@JsonRootName("outgoing")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "outgoings")
@Inheritance(strategy = InheritanceType.JOINED)
public class Outgoing extends Approval {

	@Column(name = "reg_number")
	private String regNumber;

	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	private Organization recipient;

	private DocumentLanguage docLanguage;

	private DocumentType docType;

	private DocumentSubject docSubject;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	private Incoming responseTo;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "outgoing_attachments", joinColumns = {
			@JoinColumn(name = "outgoing_id") }, inverseJoinColumns = {
					@JoinColumn(name = "attachment_id") }, indexes = {
							@Index(columnList = "outgoing_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
									"outgoing_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@JsonProperty("observerUserIds")
	@ElementCollection
	private List<Long> observers;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "outgoing_tags")
	private List<Tag> tags;

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

	public Organization getRecipient() {
		return recipient;
	}

	public void setRecipient(Organization recipient) {
		this.recipient = recipient;
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

	public Incoming getResponseTo() {
		return responseTo;
	}

	public void setResponseTo(Incoming responseTo) {
		this.responseTo = responseTo;
	}

	public List<Long> getObservers() {
		return observers;
	}

	public void setObservers(List<Long> observers) {
		this.observers = observers;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
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
	public String getURL() {
		return "outgoings/" + getIdentifier();
	}
}
