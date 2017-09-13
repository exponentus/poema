package workflow.model;

import com.exponentus.common.dto.ILifeCycle;
import com.exponentus.common.dto.constants.LifeCycleNodeType;
import com.exponentus.common.dto.embedded.LifeCycleNode;
import com.exponentus.common.model.embedded.TimeLine;
import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import reference.model.ControlType;
import reference.model.Tag;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.init.AppConst;
import workflow.model.constants.ControlStatusType;
import workflow.model.constants.converter.ControlStatusTypeConverter;
import workflow.model.embedded.AssigneeEntry;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("assignment")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__assignments")
public class Assignment extends EmbeddedSecureHierarchicalEntity implements ILifeCycle {
    @JsonIgnore
    //@JsonManagedReference(value = "assignment-report")
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy("appliedRegDate")
    private List<Report> reports;

    @JoinColumn(name = "applied_author", nullable = false)
    private Employee appliedAuthor;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "applied_reg_date")
    private Date appliedRegDate;

   // @JsonBackReference(value = "primary-assignment")
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private ActionableDocument primary;

   // @JsonBackReference(value = "assignment-assignment")
    @ManyToOne
    @JoinColumn(name = "actionable_document_id")
    private Assignment parent;

  //  @JsonManagedReference(value = "assignment-assignment")
    @JsonIgnore
    @OneToMany(mappedBy="parent")
    private List<Assignment> assignments;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @ElementCollection
    @CollectionTable(name = "wf__assignment_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Observer> observers = new ArrayList<Observer>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "wf__assignment_tags")
    private List<Tag> tags;

    @JoinColumn(name = "control_type", nullable = false)
    private ControlType controlType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "due_date")
    private Date dueDate;

    @Convert(converter = ControlStatusTypeConverter.class)
    private ControlStatusType status = ControlStatusType.DRAFT;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "status_time")
    private Date statusTime;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "wf__assignee_entries", uniqueConstraints = {@UniqueConstraint(columnNames = {"assignment_id", "sort"}),
            @UniqueConstraint(columnNames = {"assignment_id", "assignee"})})
    @OrderBy("sort")
    private List<AssigneeEntry> assigneeEntries;

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

    public ActionableDocument getPrimary() {
        return primary;
    }

    public void setPrimary(ActionableDocument primary) {
        this.primary = primary;
    }

    public Assignment getParent() {
        return parent;
    }

    public void setParent(Assignment parent) {
        this.parent = parent;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<Observer> getObservers() {
        return observers;
    }

    public void setObservers(List<Observer> observers) {
        this.observers = observers;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<Report> getReports() {
        return reports;
    }

    @Override
    public String getURL() {
        return AppConst.BASE_URL + "assignments/" + getIdentifier();
    }

    public ControlType getControlType() {
        return controlType;
    }

    public void setControlType(ControlType controlType) {
        this.controlType = controlType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public ControlStatusType getStatus() {
        return status;
    }

    public void setStatus(ControlStatusType status) {
        this.status = status;
    }

    public Date getStatusTime() {
        return statusTime;
    }

    public void setStatusTime(Date statusTime) {
        this.statusTime = statusTime;
    }

    public List<AssigneeEntry> getAssigneeEntries() {
        return assigneeEntries;
    }

    public void setAssigneeEntries(List<AssigneeEntry> assigneeEntries) {
        this.assigneeEntries = assigneeEntries;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    public boolean assigneesContainsUser(IUser user) {
        if (this.getAssigneeEntries() == null) {
            return false;
        }

        for (AssigneeEntry ae : this.getAssigneeEntries()) {
            Employee assignee = ae.getAssignee();
            if (assignee != null) {
                if (assignee.getUser().getId().equals(user.getId())) {
                    return true;
                }
            }
        }

        return false;
    }

    @Override
    public LifeCycleNode getLifeCycle(IUser user, UUID id) {
        return (((ILifeCycle)getPrimary(this)).getLifeCycle(user, id ));
    }

    private ActionableDocument getPrimary(Assignment entity){
        ActionableDocument primary = entity.getPrimary();
        if (primary != null){
            return primary;
        }else{
            Assignment assignment = entity.getParent();
            return getPrimary(assignment);
        }
    }

    @Override
    public LifeCycleNode getNode(IUser user, UUID id) {
        LifeCycleNode lc = new LifeCycleNode();
        lc.setType(LifeCycleNodeType.ASSIGNMENT);

        if (user.isSuperUser() || getReaders().contains(user.getId())){
            lc.setAvailable(true);
            lc.setTitle(getTitle());
            lc.setStatus(status.name());
        }

      /*  List<Assignment> assignments = getAssignments();

        if (assignments != null) {
            for (Assignment a : assignments) {
                lc.addResponse(a.getNode(user, id));
            }
        }*/

        List<Report> reports = getReports();

        if (reports != null) {
            for (Report a : reports) {
                lc.addResponse(a.getNode(user, id));
            }
        }

        if (id.equals(this.id)){
            lc.setCurrent(true);
        }

        lc.setUrl(getURL());

        return lc;
    }

    @Override
    public TimeLine getTimeLine() {
        return null;
    }
}
