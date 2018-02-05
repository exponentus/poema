package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.ui.ILifeCycle;
import com.exponentus.common.ui.constants.LifeCycleNodeType;
import com.exponentus.common.ui.embedded.LifeCycleNode;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import projects.init.ModuleConst;
import projects.model.constants.ResolutionType;
import reference.model.RequestType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = ModuleConst.CODE + "__requests")
public class Request extends EmbeddedSecureHierarchicalEntity implements ILifeCycle {

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
    @JoinTable(name = ModuleConst.CODE + "__request_attachments",
            joinColumns = {@JoinColumn(name = "request_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "request_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"request_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

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
        return ModuleConst.BASE_URL + "requests/" + getId();
    }

    @Override
    public String getTitle() {
        return StringUtils.abbreviate(comment, 140);
    }

    @Override
    public LifeCycleNode getLifeCycle(IUser user, UUID id) {
        return null;
    }

    @Override
    public LifeCycleNode getNode(IUser user, UUID id) {
        LifeCycleNode lc = new LifeCycleNode();

        lc.setType(LifeCycleNodeType.REPORT);
        if (id.equals(this.id)) {
            lc.setCurrent(true);
        }

        if (user.isSuperUser() || getReaders().containsKey(user.getId())) {
            lc.setAvailable(true);
            lc.setTitle(getTitle());
            lc.setStatus(resolution.name());
        }
        lc.setUrl(getURL());
        return lc;
    }

    @Override
    public TimeLine getTimeLine() {
        return null;
    }
}
