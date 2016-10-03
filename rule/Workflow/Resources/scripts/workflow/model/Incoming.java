package workflow.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.system.IEmployee;
import com.exponentus.dataengine.system.IExtUserDAO;
import com.exponentus.env.Environment;
import com.exponentus.scripting._Session;
import com.exponentus.util.TimeUtil;
import reference.model.DocumentLanguage;
import reference.model.DocumentType;
import staff.model.Organization;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "incomings")
@NamedQuery(name = "Incoming.findAll", query = "SELECT m FROM Incoming AS m ORDER BY m.regDate")
public class Incoming extends SecureAppEntity<UUID> {

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "incoming_attachments",
            joinColumns = {@JoinColumn(name = "incoming_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id", referencedColumnName = "id")})
    private List<Attachment> attachments = new ArrayList<>();

    private Organization sender;

    @Column(name = "sender_reg_number")
    private String senderRegNumber;

    @Column(name = "sender_applied_reg_date")
    private Date senderAppliedRegDate;

    @Column(nullable = false)
    private String summary = "";

    private DocumentLanguage docLanguage;

    private DocumentType docType;

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

    public String getSummary() {
        return summary;
    }

    @Override
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    @Override
    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setSummary(String summary) {
        this.summary = summary;
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

    @Override
    public String getShortXMLChunk(_Session ses) {
        return getFullXMLChunk(ses);
    }

    @Override
    public String getFullXMLChunk(_Session ses) {
        StringBuilder chunk = new StringBuilder(1000);
        chunk.append("<regdate>" + TimeUtil.dateTimeToStringSilently(regDate) + "</regdate>");
        IExtUserDAO eDao = Environment.getExtUserDAO();
        IEmployee user = eDao.getEmployee(author);
        if (user != null) {
            chunk.append("<author>" + user.getName() + "</author>");
        } else {
            chunk.append("<author>" + author + "</author>");
        }

        chunk.append("<regnumber>" + regNumber + "</regnumber>");
        chunk.append("<appliedregdate>" + TimeUtil.dateTimeToStringSilently(appliedRegDate) + "</appliedregdate>");
        if (docLanguage != null) {
            chunk.append("<doclanguage id=\"" + docLanguage.getId() + "\">" + docLanguage.getLocalizedName(ses.getLang()) + "</doclanguage>");
        }
        if (docType != null) {
            chunk.append("<doctype id=\"" + docType.getId() + "\">" + docType.getLocalizedName(ses.getLang()) + "</doctype>");
        }
        if (sender != null) {
            chunk.append("<sender id=\"" + sender.getId() + "\">" + sender.getLocalizedName(ses.getLang()) + "</sender>");
        }
        chunk.append("<senderappliedregdate>" + TimeUtil.dateTimeToStringSilently(senderAppliedRegDate) + "</senderappliedregdate>");
        chunk.append("<summary>" + summary + "</summary>");

        if (getAttachments() != null && !attachments.isEmpty()) {
            chunk.append("<attachments>");
            for (Attachment att : attachments) {
                String downloadUrl = this.getURL() + "&amp;attachment=" + att.getId() + "&amp;fileid=" + att.getRealFileName();
                chunk.append("<attachment id=\"" + att.getId() + "\">");
                chunk.append("<url>" + downloadUrl + "</url>");
                chunk.append(att.getShortXMLChunk(ses));
                chunk.append("</attachment>");
            }
            chunk.append("</attachments>");
        }
        return chunk.toString();
    }
}
