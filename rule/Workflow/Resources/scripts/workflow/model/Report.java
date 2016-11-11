package workflow.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;

@Entity
@Table(name = "reports")
@NamedQuery(name = "Report.findAll", query = "SELECT m FROM Report AS m ORDER BY m.regDate")
public class Report extends SecureAppEntity<UUID> {

	@Column(name = "applied_author", nullable = false)
	protected Long appliedAuthor;

	@Column(name = "applied_reg_date")
	private Date appliedRegDate;

	@FTSearchable
	@Column(length = 140)
	private String title;

	@NotNull
	@ManyToOne
	private Assignment parent;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@JoinTable(name = "report_attachments", joinColumns = { @JoinColumn(name = "report_id") }, inverseJoinColumns = {
	        @JoinColumn(name = "attachment_id") }, indexes = {
	                @Index(columnList = "report_id, attachment_id") }, uniqueConstraints = @UniqueConstraint(columnNames = { "report_id",
	                        "attachment_id" }))
	@CascadeOnDelete
	private List<Attachment> attachments = new ArrayList<>();

	public Long getAppliedAuthor() {
		return appliedAuthor;
	}

	public void setAppliedAuthor(long appliedAuthor) {
		this.appliedAuthor = appliedAuthor;
	}

	public Date getAppliedRegDate() {
		return appliedRegDate;
	}

	public void setAppliedRegDate(Date appliedRegDate) {
		this.appliedRegDate = appliedRegDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Assignment getParent() {
		return parent;
	}

	public void setParent(Assignment parent) {
		this.parent = parent;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	@Override
	public List<Attachment> getAttachments() {
		return attachments;
	}

	@Override
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
}