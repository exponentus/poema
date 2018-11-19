package projects.model;

import com.exponentus.common.dao.AppEntityListener;
import com.exponentus.common.dao.DAOFactory;
import com.exponentus.common.dto.ESPayload;
import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.dataengine.jpa.IESSHandled;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.env.EnvConst;
import com.exponentus.localization.constants.LanguageCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import projects.init.ModuleConst;
import projects.model.constants.ProjectStatusType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.Organization;

import javax.persistence.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@EntityListeners(AppEntityListener.class)
@Table(name = ModuleConst.CODE + "__projects", uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
public class Project extends EmbeddedSecureHierarchicalEntity implements IESSHandled {

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
    @ElementCollection
    private List<Long> observers;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date finishDate;

    @FTSearchable
    @Column(length = 2048)
    private String comment;

    public List<Task> getTasks() {
        return tasks;
    }

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = ModuleConst.CODE + "__project_attachments",
            joinColumns = {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "project_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

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
        return ModuleConst.BASE_URL + "projects/" + getId();
    }

    @Override
    @JsonIgnore
    public ESPayload getESSDocument() throws IOException {
        EmployeeDAO employeeDAO = (EmployeeDAO) DAOFactory.get( Employee.class);

        XContentBuilder document = XContentFactory.jsonBuilder();
        document.startObject();
        document.field("type", getEntityKind().toLowerCase());
        document.field("title", getTitle());
        document.field("primaryLanguage", primaryLanguage);
        document.field("regDate", getRegDate());
        Employee authorEmp = employeeDAO.findByUser(getAuthor());
        if (authorEmp != null){
            document.field("author", authorEmp.getName());
        }
        document.field("authorId", getAuthorId());
        document.field("projectName", getName());
        document.field("projectStatus", getStatus());
        document.field("projectCustomer", getCustomer().getName());
        for(LanguageCode code: EnvConst.getDefaultLangs()) {
              document.field("projectCustomer" + code, getCustomer().getLocName(code));
          }
        document.field("status", getStatus());
        document.field("manager", employeeDAO.getEmployeeNameSilently(manager));
        document.field("programmer", employeeDAO.getEmployeeNameSilently(programmer));
        document.field("tester", employeeDAO.getEmployeeNameSilently(tester));
       /* Employee employee = employeeDAO.findByUserId(getAssignee());
        if (employee != null) {
            document.field("representatives",employee.getName());
        }
        document.field("observers", getStartDate());*/
        document.field("startDate", startDate);
        document.field("finishDate", finishDate);
        document.field("comment", comment);
        //	document.field("stages", task.getStages().toString());

        document.endObject();
        return new ESPayload(getEntityKind(), id.toString(), getReaders().keySet().stream().map(v -> Long.toString(v)).collect(Collectors.toList()),document);

    }
}
