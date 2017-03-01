package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.localization.LanguageCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import projects.model.constants.ProjectStatusType;
import staff.model.Organization;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("project")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "projects")
public class Project extends SecureHierarchicalEntity<UUID> {

    @JsonIgnore
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<Task> tasks;

    @FTSearchable
    @Column(length = 140)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ProjectStatusType status = ProjectStatusType.UNKNOWN;

    @Column(name = "primary_lang")
    private LanguageCode primaryLanguage;

    private Organization customer;

    @JsonProperty("managerUserId")
    private long manager;

    @JsonProperty("programmerUserId")
    private long programmer;

    @JsonProperty("testerUserId")
    private long tester;

    @JsonProperty("representativesUserIds")
    private List<Long> representatives;

    @JsonProperty("observerUserIds")
    private List<Long> observers;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date finishDate;

    @FTSearchable
    @Column(length = 2048)
    private String comment;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "project_attachments",
            joinColumns = {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "project_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    public Project() {
    }

    // Constructor for view
    public Project(UUID id, Date regDate, String name, ProjectStatusType status, String customer,
                   long manager, long programmer, long tester, Date finishDate, Long countAtt) {
        this.id = id;
        this.regDate = regDate;
        this.name = name;
        this.status = status;
        //
        this.customer = new Organization();
        this.customer.setName(customer);
        //
        this.manager = manager;
        this.programmer = programmer;
        this.tester = tester;
        this.finishDate = finishDate;
        if (countAtt > 0) {
            this.attachments = new ArrayList<>();
            for (int i = 0; i < countAtt; i++) {
                this.attachments.add(new Attachment());
            }
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectStatusType getStatus() {
        return status;
    }

    public void setStatus(ProjectStatusType status) {
        this.status = status;
    }

    public LanguageCode getPrimaryLanguage() {
        return primaryLanguage;
    }

    public void setPrimaryLanguage(LanguageCode primaryLanguage) {
        this.primaryLanguage = primaryLanguage;
    }

    public Organization getCustomer() {
        return customer;
    }

    public void setCustomer(Organization customer) {
        this.customer = customer;
    }

    public long getManager() {
        return manager;
    }

    public void setManager(long manager) {
        this.manager = manager;
    }

    public long getProgrammer() {
        return programmer;
    }

    public void setProgrammer(long programmer) {
        this.programmer = programmer;
    }

    public long getTester() {
        return tester;
    }

    public void setTester(long tester) {
        this.tester = tester;
    }

    public List<Long> getRepresentatives() {
        return representatives;
    }

    public void setRepresentatives(List<Long> representatives) {
        this.representatives = representatives;
    }

    public List<Long> getObservers() {
        return observers;
    }

    public void setObservers(List<Long> observers) {
        this.observers = observers;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
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
        return "p?id=" + this.getClass().getSimpleName().toLowerCase() + "-form&projectId=" + getIdentifier();
    }

    @Override
    public String getTitle() {
        return name;
    }
}
