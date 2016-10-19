package workflow.model;

/**
 * @author Kayra created 07-04-2016
 */

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "office_memos")
@NamedQuery(name = "OfficeMemo.findAll", query = "SELECT m FROM OfficeMemo AS m ORDER BY m.regDate")
public class OfficeMemo extends SecureAppEntity<UUID> {

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    @NotNull
    @ManyToOne(optional = true)
    private Approval approval;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "office_memo_attachments",
            joinColumns = {@JoinColumn(name = "office_memo_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "office_memo_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"office_memo_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    @Column(nullable = false, length = 128)
    private String summary = "";

    private String content = "";

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setContent(String briefContent) {
        this.content = briefContent;
    }

    public void setSummary(String summary) {
        this.summary = summary;
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

    public Approval getApproval() {
        return approval;
    }

    public void setApproval(Approval approval) {
        this.approval = approval;
    }

    public String getSummary() {
        return summary;
    }

    public Date getRegDate() {
        return regDate;
    }

    public String getContent() {
        return content;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }
}
