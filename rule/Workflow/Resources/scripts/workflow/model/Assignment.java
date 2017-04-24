package workflow.model;

import com.exponentus.common.model.SecureHierarchicalEntity;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.init.AppConst;
import workflow.model.embedded.Control;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("assignment")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "wf__assignments")
@Inheritance(strategy = InheritanceType.JOINED)
public class Assignment extends ControlledDocument {

    @JsonIgnore
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private List<Report> reports;

    @JoinColumn(name = "applied_author", nullable = false)
    private Employee appliedAuthor;

    @ManyToOne(optional = false)
    private ControlledDocument parent;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body;

    @ElementCollection
    @CollectionTable(name = "wf__assignment_observers", joinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Observer> observers;

    @Embedded
    private Control control;

    @Transient
    private List<IAppEntity<UUID>> responses;

    public Assignment() {

    }

    // test
    public Assignment(UUID id, Date regDate, String title, String body, Employee appliedAuthor) {
        this.id = id;
        this.regDate = regDate;
        this.title = title;
        this.body = body;
        this.appliedAuthor = appliedAuthor;
    }

    public Employee getAppliedAuthor() {
        return appliedAuthor;
    }

    public void setAppliedAuthor(Employee appliedAuthor) {
        this.appliedAuthor = appliedAuthor;
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

    public Control getControl() {
        return control;
    }

    public void setControl(Control control) {
        this.control = control;
    }

    public List<Report> getReports() {
        return reports;
    }

    public ControlledDocument getParent() {
        return parent;
    }

    public void setParent(ControlledDocument parent) {
        this.parent = parent;
    }

    @Override
    public String getURL() {
        return AppConst.BASE_URL + "assignments/" + getIdentifier();
    }

    @Override
    public SecureHierarchicalEntity getParentEntity(_Session ses) {
        return parent;
    }

    public List<IAppEntity<UUID>> getResponses() {
        return responses;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }
}
