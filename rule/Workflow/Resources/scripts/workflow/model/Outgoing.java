package workflow.model;


import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.ui.ILifeCycle;
import com.exponentus.common.ui.constants.LifeCycleNodeType;
import com.exponentus.common.ui.embedded.LifeCycleNode;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.extconnect.IExtUser;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import reference.model.Tag;
import staff.model.Organization;
import staff.model.embedded.Observer;
import workflow.init.ModuleConst;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author Kayra created 07-04-2016
 */

@JsonRootName("outgoing")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__outgoings")
@Inheritance(strategy = InheritanceType.JOINED)
public class Outgoing extends ActionableDocument implements ILifeCycle {

	@Column(name = "reg_number", unique = true, length = 64)
	private String regNumber;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	private Organization recipient;

	private DocumentLanguage docLanguage;

	private DocumentType docType;

	private DocumentSubject docSubject;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "wf__outgoing_attachments", joinColumns = { @JoinColumn(name = "outgoing_id") }, inverseJoinColumns = {
			@JoinColumn(name = "attachment_id") }, indexes = {
					@Index(columnList = "outgoing_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
							"outgoing_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "wf__outgoing_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Observer> observers = new ArrayList<Observer>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "wf__outgoing_tags")
	private List<Tag> tags;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String signature;

	@Override
	@PrePersist
	protected void prePersist() {
		regDate = new Date();
		lastModifiedDate = new Date();
		if (appliedRegDate == null) {
			appliedRegDate = regDate;
		}
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

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
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
		return ModuleConst.BASE_URL + "outgoings/" + getIdentifier();
	}

	@Override
	public List<IExtUser> getRecipientsAfterApproval() {
		List<IExtUser> recipients = new ArrayList<IExtUser>();
		// recipients.add(recipient);
		return recipients;
	}

	@Override
	public LifeCycleNode getLifeCycle(IUser user, UUID id) {
		LifeCycleNode lc = getNode(user, id);

		return lc;
	}

	@Override
	public LifeCycleNode getNode(IUser user, UUID id) {
		LifeCycleNode lc = new LifeCycleNode();
		lc.setType(LifeCycleNodeType.DISCUSSED);
		if (id.equals(this.id)){
			lc.setCurrent(true);
		}

		if (user.isSuperUser() || getReaders().contains(user.getId())){
			lc.setAvailable(true);
			lc.setTitle(getTitle());
			lc.setStatus(getApprovalStatus().name());
		}
		lc.setUrl(getURL());
		return lc;
	}

	@Override
	public TimeLine getTimeLine() {
		return null;
	}
}
