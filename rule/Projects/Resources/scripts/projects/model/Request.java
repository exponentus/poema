package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import projects.model.constants.ResolutionType;
import reference.model.RequestType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("task")
@Entity
@Table(name = "requests")
@NamedQuery(name = "Request.findAll", query = "SELECT m FROM Request AS m ORDER BY m.regDate")
public class Request extends SecureAppEntity<UUID> {

    @JsonIgnore
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    private Task task;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "request_type")
    private reference.model.RequestType requestType;

    @Enumerated(EnumType.STRING)
    @Column(length = 7)
    private ResolutionType resolution = ResolutionType.UNKNOWN;

    @Column(name = "resolution_time")
    private Date resolutionTime;

    @Column(length = 2048)
    private String comment;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "request_attachments",
            joinColumns = {@JoinColumn(name = "request_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "request_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"request_id", "attachment_id"}))
    private List<Attachment> attachments;

    public void setTask(Task task) {
        this.task = task;
    }

    public RequestType getRequestType() {
        return requestType;
    }

    public void setRequestType(RequestType requestType) {
        this.requestType = requestType;
    }

    public ResolutionType getResolution() {
        return resolution;
    }

    public void setResolution(ResolutionType resolution) {
        this.resolution = resolution;
    }

    public Date getResolutionTime() {
        return resolutionTime;
    }

    public void setResolutionTime(Date resolutionTime) {
        this.resolutionTime = resolutionTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }
}
