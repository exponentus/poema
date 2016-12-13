package workflow.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.HierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.user.AnonymousUser;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import reference.model.Tag;
import workflow.model.embedded.Approval;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author Kayra created 07-04-2016
 */

@JsonRootName("officeMemo")
@Entity
@Table(name = "office_memos")
@NamedQuery(name = "OfficeMemo.findAll", query = "SELECT m FROM OfficeMemo AS m ORDER BY m.regDate")
public class OfficeMemo extends HierarchicalEntity<UUID> {

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    @Column(name = "applied_author", nullable = false, updatable = true)
    protected Long appliedAuthor;

    @Column(nullable = false)
    protected Long recipient = AnonymousUser.ID;

    @Embedded
    private Approval approval;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "office_memo_attachments",
            joinColumns = {@JoinColumn(name = "office_memo_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "office_memo_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"office_memo_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "officememo_tags")
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

    public Long getAppliedAuthor() {
        return appliedAuthor;
    }

    public void setAppliedAuthor(Long appliedAuthor) {
        this.appliedAuthor = appliedAuthor;
    }

    public long getRecipient() {
        return recipient;
    }

    public void setRecipient(long recipient) {
        this.recipient = recipient;
    }

    public Approval getApproval() {
        return approval;
    }

    public void setApproval(Approval approval) {
        this.approval = approval;
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
    public List<Attachment> getAttachments() {
        return attachments;
    }

    @Override
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    @Override
    public String getURL() {
        return "office-memos/" + getIdentifier();
    }
}
