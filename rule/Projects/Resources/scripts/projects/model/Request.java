package projects.model;

import administrator.model.User;
import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import projects.model.constants.ResolutionType;
import reference.model.RequestType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("request")
@Entity
@Table(name = "requests")
public class Request extends SecureHierarchicalEntity<UUID> {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(updatable = false, nullable = false)
    private Task task;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "request_type")
    private RequestType requestType;

    @Enumerated(EnumType.STRING)
    @Column(length = 8)
    private ResolutionType resolution = ResolutionType.UNKNOWN;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "resolution_time")
    private Date resolutionTime;

    @Column(length = 2048)
    private String decisionComment;

    @Column(length = 2048)
    private String comment;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "request_attachments",
            joinColumns = {@JoinColumn(name = "request_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "request_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"request_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    public Request() {
        super();
    }

    public Request(UUID id, Date regDate, User author, RequestType requestType, ResolutionType resolution,
                   Date resolutionTime, String decisionComment, String comment, Long countAtt) {
        this.id = id;
        this.regDate = regDate;
        this.author = author;
        this.requestType = requestType;
        this.resolution = resolution;
        this.resolutionTime = resolutionTime;
        this.decisionComment = decisionComment;
        this.comment = comment;
        if (countAtt > 0) {
            this.attachments = new ArrayList<>();
            for (int i = 0; i < countAtt; i++) {
                this.attachments.add(new Attachment());
            }
        }
    }

    @JsonIgnore
    public Task getTask() {
        return task;
    }

    @JsonProperty
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

    public String getDecisionComment() {
        return decisionComment;
    }

    public void setDecisionComment(String decisionComment) {
        this.decisionComment = decisionComment;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
        return "p?id=task-requests&requestId=" + getIdentifier();
    }

    @Override
    @JsonIgnore
    public SecureHierarchicalEntity<UUID> getParentEntity(_Session ses) {
        return task;
    }

    @Override
    public String getTitle() {
        return StringUtils.abbreviate(comment, 140);
    }
}
