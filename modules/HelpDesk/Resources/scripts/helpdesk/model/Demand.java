package helpdesk.model;

import administrator.model.User;
import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureAppEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import helpdesk.init.ModuleConst;
import helpdesk.model.constants.DemandStatusType;
import helpdesk.model.constants.converter.DemandStatusConverter;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import projects.model.Project;
import projects.model.Task;
import reference.model.DemandType;
import reference.model.Tag;
import reference.model.WayOfInteraction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = ModuleConst.CODE + "__demands")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Demand extends SecureAppEntity<UUID> {

    private Project project;

    private User originator;

    private List<Task> tasks;

    @FTSearchable(ignoreLang = true)
    @Column(name = "reg_number", unique = true, length = 64)
    private String regNumber;

    @Convert(converter = DemandStatusConverter.class)
    private DemandStatusType status = DemandStatusType.UNKNOWN;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "status_date")
    private Date statusDate;

    @FTSearchable
    @Column(length = 140)
    private String title;

    @ManyToOne(optional = false)
    @JoinColumn(name = "demand_type")
    private DemandType demandType;

    private WayOfInteraction wayOfInteraction;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = ModuleConst.CODE + "__tags")
    private List<Tag> tags;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)

    @JoinTable(name = ModuleConst.CODE + "__attachments", joinColumns = {@JoinColumn(name = "demand_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "demand_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {
            "demand_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    public Project getProject() {
        return project;
    }


    public User getOriginator() {
        return originator;
    }

    public void setOriginator(User originator) {
        this.originator = originator;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public DemandStatusType getStatus() {
        return status;
    }

    public void setStatus(DemandStatusType status) {
        this.status = status;
    }

    public Date getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(Date statusDate) {
        this.statusDate = statusDate;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public DemandType getDemandType() {
        return demandType;
    }

    public void setDemandType(DemandType demandType) {
        this.demandType = demandType;
    }

    public WayOfInteraction getWayOfInteraction() {
        return wayOfInteraction;
    }

    public void setWayOfInteraction(WayOfInteraction wayOfInteraction) {
        this.wayOfInteraction = wayOfInteraction;
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
        return ModuleConst.BASE_URL + "demands/" + getId();
    }
}
