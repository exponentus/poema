package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;

import reference.model.Tag;
import staff.model.Employee;
import workflow.model.embedded.Approval;
import workflow.model.embedded.IApproval;

/**
 * @author Kayra created 07-04-2016
 */

@JsonRootName("officeMemo")
@Entity
@Table(name = "office_memos")
public class OfficeMemo extends SecureHierarchicalEntity<UUID> implements IApproval {

	@JsonIgnore
	private List<Assignment> assignments;

	@Column(name = "reg_number")
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
	@JoinTable(name = "office_memo_attachments", joinColumns = {
			@JoinColumn(name = "office_memo_id") }, inverseJoinColumns = {
					@JoinColumn(name = "attachment_id") }, indexes = {
							@Index(columnList = "office_memo_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
									"office_memo_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "officememo_tags")
	private List<Tag> tags;

	@Embedded
	private Approval approval;

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

	public List<Assignment> getAssignments() {
		return assignments;
	}

	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
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

	public Approval getApproval() {
		return approval;
	}

	public void setApproval(Approval approval) {
		this.approval = approval;
	}

	@Override
	public String getURL() {
		return "office-memos/" + getIdentifier();
	}
}
