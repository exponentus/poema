package workflow.model;

import com.exponentus.common.dto.ILifeCycle;
import com.exponentus.common.dto.constants.LifeCycleNodeType;
import com.exponentus.common.dto.embedded.LifeCycleNode;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.common.model.constants.SolutionType;
import com.exponentus.common.model.constants.converter.SolutionTypeConverter;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.init.AppConst;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("report")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__reports")
public class Report extends EmbeddedSecureHierarchicalEntity implements ILifeCycle {

    @JoinColumn(name = "applied_author", nullable = false)
    private Employee appliedAuthor;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

   // @JsonBackReference(value = "assignment-report")
    @NotNull
    @ManyToOne
    @JoinColumn(updatable = false)
    private Assignment parent;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;


    @Convert(converter = SolutionTypeConverter.class)
    private SolutionType solution;


    @Column(length = 2048, name="solution_comment")
    private String solutionComment;

    @ElementCollection
    @CollectionTable(name = "wf__report_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Observer> observers = new ArrayList<Observer>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "wf__report_attachments", joinColumns = {@JoinColumn(name = "report_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "report_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {"report_id",
            "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

    public Employee getAppliedAuthor() {
        return appliedAuthor;
    }

    public void setAppliedAuthor(Employee appliedAuthor) {
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

    @JsonProperty
    public void setParent(Assignment parent) {
        this.parent = parent;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public SolutionType getSolution() {
        return solution;
    }

    public void setSolution(SolutionType solution) {
        this.solution = solution;
    }


    public String getSolutionComment() {
        return solutionComment;
    }

    public void setSolutionComment(String solutionComment) {
        this.solutionComment = solutionComment;
    }

    public List<Observer> getObservers() {
        return observers;
    }

    public void setObservers(List<Observer> observers) {
        this.observers = observers;
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
        return AppConst.BASE_URL + "reports/" + getIdentifier();
    }

    @Override
    public LifeCycleNode getLifeCycle(IUser user, UUID id) {
        return getNode(user, id);
    }

    @Override
    public LifeCycleNode getNode(IUser user, UUID id) {
        LifeCycleNode lc = new LifeCycleNode();
        lc.setType(LifeCycleNodeType.REPORT);
        if (user.isSuperUser() || getReaders().contains(user.getId())){
            lc.setAvailable(true);
            lc.setTitle(getTitle());
            lc.setStatus(solution.name());
            lc.setUrl(getURL());
        }
        if (id.equals(this.id)){
            lc.setCurrent(true);
        }
        return lc;
    }

    @Override
    public TimeLine getTimeLine() {
        return null;
    }
}
