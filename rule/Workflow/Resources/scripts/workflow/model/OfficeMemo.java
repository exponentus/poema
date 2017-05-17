package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.Tag;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.init.AppConst;
import workflow.model.embedded.ApprovedControlledDocument;

@JsonRootName("officeMemo")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__office_memos")
@Inheritance(strategy = InheritanceType.JOINED)
public class OfficeMemo extends ApprovedControlledDocument {

	@Column(name = "reg_number", unique = true, length = 64)
	private String regNumber;

	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	@JoinColumn(name = "applied_author", nullable = false)
	private Employee appliedAuthor;

	@JoinColumn(nullable = false)
	private Employee recipient;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "wf__office_memo_attachments", joinColumns = {
			@JoinColumn(name = "office_memo_id") }, inverseJoinColumns = {
					@JoinColumn(name = "attachment_id") }, indexes = {
							@Index(columnList = "office_memo_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
									"office_memo_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "wf__office_memo_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Observer> observers = new ArrayList<Observer>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "wf__officememo_tags")
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

	public Employee getAppliedAuthor() {
		return appliedAuthor;
	}

	public void setAppliedAuthor(Employee appliedAuthor) {
		this.appliedAuthor = appliedAuthor;
	}

	public Employee getRecipient() {
		return recipient;
	}

	public void setRecipient(Employee recipient) {
		this.recipient = recipient;
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
	public List<Employee> getRecipients() {
		List<Employee> recipients = new ArrayList<Employee>();
		recipients.add(recipient);
		return recipients;
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
		return AppConst.BASE_URL + "office-memos/" + getIdentifier();
	}
}
