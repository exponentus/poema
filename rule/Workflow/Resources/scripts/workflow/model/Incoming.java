package workflow.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import reference.model.DocumentLanguage;
import reference.model.DocumentType;
import staff.model.Organization;
import workflow.model.embedded.Control;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("incoming")
@Entity
@Table(name = "incomings")
@NamedQuery(name = "Incoming.findAll", query = "SELECT m FROM Incoming AS m ORDER BY m.regDate")
public class Incoming extends SecureAppEntity<UUID> {

    @Column(nullable = false)
    private String title = "";

    @Column(name = "reg_number")
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
    @JoinTable(name = "incoming_attachments",
            joinColumns = {@JoinColumn(name = "incoming_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "incoming_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"incoming_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    @Embedded
    private Control control = new Control();

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
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    @Override
    public List<Attachment> getAttachments() {
        return attachments;
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

    public Outgoing getResponseTo() {
        return responseTo;
    }

    public void setResponseTo(Outgoing responseTo) {
        this.responseTo = responseTo;
    }
}
