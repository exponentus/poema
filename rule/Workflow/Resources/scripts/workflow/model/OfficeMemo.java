package workflow.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.ui.ILifeCycle;
import com.exponentus.common.ui.constants.LifeCycleNodeType;
import com.exponentus.common.ui.embedded.LifeCycleNode;
import com.exponentus.extconnect.IExtUser;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import reference.model.Tag;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.init.AppConst;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("officeMemo")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__office_memos")
@Inheritance(strategy = InheritanceType.JOINED)
public class OfficeMemo extends ActionableDocument  implements ILifeCycle {

	@Column(name = "reg_number", unique = true, length = 64)
	private String regNumber;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	@JoinColumn(name = "applied_author", nullable = false)
	private Employee appliedAuthor;

	@JoinColumn(nullable = false)
	private Employee recipient;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "wf__office_memo_attachments", joinColumns = { @JoinColumn(name = "office_memo_id") }, inverseJoinColumns = {
			@JoinColumn(name = "attachment_id") }, indexes = {
					@Index(columnList = "office_memo_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = {
							"office_memo_id", "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	@ElementCollection
	@CollectionTable(name = "wf__office_memo_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
	private List<Observer> observers = new ArrayList<Observer>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "wf__office_memo_tags")
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
	public List<IExtUser> getRecipientsAfterApproval() {
		List<IExtUser> recipients = new ArrayList<IExtUser>();
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
		return AppConst.BASE_URL + "office-memos/" + getId();
	}

	@Override
	public LifeCycleNode getLifeCycle(IUser user, UUID id) {
		LifeCycleNode lc = getNode(user, this.id);
		List<Assignment> assignments = getAssignments();

		if (assignments != null) {
			for (Assignment a : assignments) {
				lc.addResponse(a.getNode(user, id));
			}
		}
		return lc;
	}

	@Override
	public LifeCycleNode getNode(IUser user, UUID id) {
		LifeCycleNode lc = new LifeCycleNode();
		lc.setType(LifeCycleNodeType.DISCUSSED_AND_ACTIONABLE);

		if (user.isSuperUser() || getReaders().contains(user.getId())){
			lc.setAvailable(true);
			lc.setTitle(getTitle());
			lc.setStatus(getApprovalStatus().name());
		}

		if (id.equals(this.id)){
			lc.setCurrent(true);
		}
		lc.setUrl(getURL());
		return lc;
	}

	@Override
	public TimeLine getTimeLine() {
		return null;
	}
}
