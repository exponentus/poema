package workflow.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("report")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "reports")
@NamedQuery(name = "Report.findAll", query = "SELECT m FROM Report AS m ORDER BY m.regDate")
public class Report extends SecureHierarchicalEntity<UUID> {

    @Column(name = "applied_author", nullable = false)
    protected Long appliedAuthor;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    @JsonIgnore
    @NotNull
    @ManyToOne
    private Assignment parent;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @JoinTable(name = "report_attachments", joinColumns = {@JoinColumn(name = "report_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "report_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {
            "report_id", "attachment_id"}))
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

    @Override
    public SecureHierarchicalEntity<UUID> getParentEntity(_Session ses) {
        return parent;
    }
}
