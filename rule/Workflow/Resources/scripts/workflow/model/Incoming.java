package workflow.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import reference.model.Tag;
import staff.model.Employee;
import staff.model.Organization;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("incoming")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "incomings")
public class Incoming extends SecureHierarchicalEntity<UUID> {

    @JsonIgnore
    @OneToMany(mappedBy = "incoming", fetch = FetchType.LAZY)
    private List<Assignment> assignments;

    @Column(name = "reg_number", unique = true)
    private String regNumber;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    private Organization sender;

    @Column(name = "sender_reg_number")
    private String senderRegNumber;

    @Column(name = "sender_applied_reg_date")
    private Date senderAppliedRegDate;

    private Employee addressee;

    private DocumentLanguage docLanguage;

    private DocumentType docType;

    private DocumentSubject docSubject;

    private Outgoing responseTo;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "incoming_attachments", joinColumns = {
            @JoinColumn(name = "incoming_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "incoming_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {
            "incoming_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "incoming_tags")
    private List<Tag> tags;

    @Transient
    private List<IAppEntity> responses;

    public Incoming() {
    }

    // test
    public Incoming(UUID id, String title, String body, String regNumber, Date appliedRegDate,
                    Organization sender, String senderRegNumber, Date senderAppliedRegDate,
                    Employee addressee, DocumentLanguage docLanguage, DocumentType docType,
                    DocumentSubject docSubject, Outgoing responseTo/*, Attachment[] atts*/) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.regNumber = regNumber;
        this.appliedRegDate = appliedRegDate;
        this.sender = sender;
        this.senderRegNumber = senderRegNumber;
        this.senderAppliedRegDate = senderAppliedRegDate;
        this.addressee = addressee;
        this.docLanguage = docLanguage;
        this.docType = docType;
        this.docSubject = docSubject;
        this.responseTo = responseTo;
//        if (atts.length > 0) {
//            this.attachments = Arrays.stream(atts).collect(Collectors.toList());
//        }
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

    public Employee getAddressee() {
        return addressee;
    }

    public void setAddressee(Employee addressee) {
        this.addressee = addressee;
    }

    @Override
    public List<Attachment> getAttachments() {
        return attachments;
    }

    @Override
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
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

    public Outgoing getResponseTo() {
        return responseTo;
    }

    public void setResponseTo(Outgoing responseTo) {
        this.responseTo = responseTo;
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

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }

    @Override
    public String getURL() {
        return "incomings/" + getIdentifier();
    }

    public List<IAppEntity> getResponses() {
        return responses;
    }

    public void setResponses(List<IAppEntity> responses) {
        this.responses = responses;
    }
}
