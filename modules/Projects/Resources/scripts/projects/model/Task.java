package projects.model;

import com.exponentus.common.dao.AppEntityListener;
import com.exponentus.common.dao.DAOFactory;
import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.dto.ESPayload;
import com.exponentus.common.model.Attachment;
import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.common.model.constants.*;
import com.exponentus.common.model.constants.converter.ApprovalResultTypeConverter;
import com.exponentus.common.model.constants.converter.ApprovalSchemaTypeConverter;
import com.exponentus.common.model.constants.converter.ApprovalStatusTypeConverter;
import com.exponentus.common.model.converter.ListOfStringConverter;
import com.exponentus.common.model.converter.TimeLineConverter;
import com.exponentus.common.model.embedded.*;
import com.exponentus.common.ui.lifecycle.ILifeCycle;
import com.exponentus.common.ui.lifecycle.LifeCycleNode;
import com.exponentus.common.ui.lifecycle.LifeCycleNodeType;
import com.exponentus.dataengine.jpa.IAppEntity;
import com.exponentus.dataengine.jpa.IESSHandled;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.modulebinding.IOfficeFrame;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.annotation.*;
import helpdesk.model.Demand;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import projects.init.ModuleConst;
import reference.model.Tag;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@EntityListeners(AppEntityListener.class)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = ModuleConst.CODE + "__tasks")
public class Task extends EmbeddedSecureHierarchicalEntity implements IApproval, ILifeCycle, IESSHandled {

    @ManyToOne
    private Project project;

    //@JsonBackReference
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Demand demand;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private Task parent;

    @FTSearchable(ignoreLang = true, regEx = "[^0-9]*")
    @Column(name = "reg_number", unique = true, length = 64)
    private String regNumber;

    @NotNull
    @ManyToOne(optional = false)
    private TaskType taskType;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private StatusType status = StatusType.UNKNOWN;

    private Date statusDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private PriorityType priority = PriorityType.NORMAL;

    @FTSearchable
    @Column(length = 1024, name = "cancel_comment")
    private String cancellationComment;

    @FTSearchable
    @Column(columnDefinition = "TEXT")
    private String body = "";

    @Convert(converter = ListOfStringConverter.class)
    @Column(name = "obsolete_body", columnDefinition = "jsonb")
    private List<String> obsoleteBody = new ArrayList<String>();

    private Long assignee;

    @Column(name = "estimate_hours")
    private float estimateInHours;

    @JsonIgnore
    @Convert(converter = TimeLineConverter.class)
    @Column(name = "time_line", columnDefinition = "jsonb")
    private TimeLine timeLine;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    private boolean initiative;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = ModuleConst.CODE + "__task_tags")
    private List<Tag> tags;

    @Column(name = "customer_observation")
    private boolean customerObservation;

    @JsonProperty("observerUserIds")
    @ElementCollection
    private List<Long> observers;

    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    private List<Task> subtasks;

    @JsonIgnore
    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id")
    @CascadeOnDelete
    private List<Request> requests;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = ModuleConst.CODE + "__task_attachments", joinColumns = {@JoinColumn(name = "task_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "task_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {"task_id",
            "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();
    @Transient
    private List<IAppEntity<UUID>> responses;

    @Convert(converter = ApprovalStatusTypeConverter.class)
    private ApprovalStatusType approvalStatus = ApprovalStatusType.DRAFT;

    @Convert(converter = ApprovalSchemaTypeConverter.class)
    private ApprovalSchemaType schema = ApprovalSchemaType.REJECT_IF_NO;

    @Convert(converter = ApprovalResultTypeConverter.class)
    private ApprovalResultType result = ApprovalResultType.PROJECT;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @OrderBy("sort")
    @CascadeOnDelete
    private List<Block> blocks = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = ModuleConst.CODE + "__task_stages", joinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Stage> stages = new ArrayList<Stage>();

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @JsonIgnore
    public Task getParent() {
        return parent;
    }

    @JsonProperty
    public void setParent(Task parent) {
        this.parent = parent;
    }

    public Demand getDemand() {
        return demand;
    }

    public void setDemand(Demand demand) {
        this.demand = demand;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public StatusType getStatus() {
        return status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
        Date current = new Date();
        statusDate = current;
        getTimeLine().addStage(current, status.name());
        addStage(current, status);
    }

    public void addStage(Date current, StatusType status) {
        if (stages.size() == 0 || stages.get(stages.size() - 1).getStatus() != status.getCode()) {
            Stage stage = new Stage();
            stage.setStageTime(current);
            stage.setStatus(status.getCode());
            stages.add(stage);
        }
    }

    public Date getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(Date date) {
        statusDate = date;
    }

    public PriorityType getPriority() {
        return priority;
    }

    public void setPriority(PriorityType priority) {
        this.priority = priority;
    }

    public String getCancellationComment() {
        return cancellationComment;
    }

    public void setCancellationComment(String cancellationComment) {
        this.cancellationComment = cancellationComment;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<String> getObsoleteBody() {
        return obsoleteBody;
    }

    public void setObsoleteBody(List<String> obsoleteBody) {
        this.obsoleteBody = obsoleteBody;
    }

    @Override
    public void backupContent() {
        obsoleteBody.add(body);
        body = "";
    }

    @JsonProperty("assigneeUserId")
    public Long getAssignee() {
        return assignee;
    }

    public TimeLine getTimeLine() {
        if (timeLine == null) {
            timeLine = new TimeLine();
        }
        return timeLine;
    }

    public void setTimeLine(TimeLine timeLine) {
        this.timeLine = timeLine;
    }

    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }

    public float getEstimateInHours() {
        return estimateInHours;
    }

    public void setEstimateInHours(float estimateInHours) {
        this.estimateInHours = estimateInHours;
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

    public boolean isInitiative() {
        return initiative;
    }

    public void setInitiative(boolean initiative) {
        this.initiative = initiative;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public boolean isCustomerObservation() {
        return customerObservation;
    }

    public void setCustomerObservation(boolean customerObservation) {
        this.customerObservation = customerObservation;
    }

    public List<Long> getObservers() {
        return observers;
    }

    public void setObservers(List<Long> observers) {
        this.observers = observers;
    }

    public List<Task> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<Task> subtasks) {
        this.subtasks = subtasks;
    }

    public List<Request> getRequests() {
        return requests;
    }

    @Override
    public List<Attachment> getAttachments() {
        return attachments;
    }

    @Override
    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public List<IAppEntity<UUID>> getResponses() {
        return responses;
    }

    public void setResponses(List<IAppEntity<UUID>> responses) {
        this.responses = responses;
    }

    @Override
    @Transient
    public String getURL() {
        return ModuleConst.BASE_URL + "tasks/" + getId();
    }

    @Override
    public List<Block> getBlocks() {
        return blocks;
    }

    @JsonIgnore
    public List<Stage> getStages() {
        Collections.sort(stages, (a, b) -> a.getStageTime().compareTo(b.getStageTime()));
        return stages;
    }

    @Override
    public void setResult(ApprovalResultType result) {
        this.result = result;
    }

    @Override
    public ApprovalResultType getApprovalResult() {
        return result;
    }

    @Override
    public ApprovalSchemaType getApprovalSchema() {
        return schema;
    }

    @Override
    public ApprovalStatusType getApprovalStatus() {
        return approvalStatus;
    }

    @Override
    @JsonIgnore
    public List<Employee> getRecipientsAfterApproval() {
        IOfficeFrame dao = Environment.getOfficeFrame();
        List<Employee> recipients = new ArrayList<Employee>();
        recipients.add((Employee) dao.getEmployee(assignee));
        for (Long userId : getObservers()) {
            recipients.add((Employee) dao.getEmployee(userId));
        }
        return recipients;
    }

    @Override
    public boolean isVersionsSupport() {
        return false;
    }

    @Override
    public void setVersionsSupport(boolean vs) {
    }

    @Override
    public int getVersion() {
        return 0;
    }

    @Override
    public void setBlocks(List<Block> blocks) {
        this.blocks = blocks;
    }


    @Override
    public void setApprovalSchema(ApprovalSchemaType schema) {
        this.schema = schema;
    }

    @Override
    public void setApprovalStatus(ApprovalStatusType as) {
        Date current = new Date();
        approvalStatus = as;
        //getTimeLine().addApprovalStage(current, as);
    }

    @Override
    public void setVersion(int version) {
    }

    @Deprecated
    public boolean userCanDoDecision(Employee emp) {
        if (getApprovalStatus() == ApprovalStatusType.PENDING) {
            Block block = ApprovalLifecycle.getProcessingBlock(this);
            if (block != null) {
                if (block.getType() == ApprovalType.SERIAL || block.getType() == ApprovalType.SIGNING) {
                    Approver approver = block.getCurrentFirstApprover();
                    if (approver != null) {
                        return block.getCurrentFirstApprover().getEmployee().getId().equals(emp.getId());
                    }
                } else if (block.getType() == ApprovalType.PARALLEL) {
                    return block.getApprovers().stream()
                            .filter(it -> it.getEmployee().getId().equals(emp.getId()) && it.getDecisionType() == DecisionType.UNKNOWN)
                            .count() > 0;
                }
            }
        }

        return false;
    }

    @Override
    public EmbeddedSecureHierarchicalEntity getParentEntity(_Session ses) {
        if (parent != null) {
            return parent;
        } else {
            return project;
        }
    }

    @Override
    public LifeCycleNode getLifeCycle(IUser user, UUID id) {
        LifeCycleNode lc = getNode(user, id);

        if (subtasks != null) {
            for (Task a : subtasks) {
                lc.addResponse(a.getNode(user, id));
            }
        }

        if (requests != null) {
            for (Request a : requests) {
                lc.addResponse(a.getNode(user, id));
            }
        }

        return lc;
    }

    @Override
    public LifeCycleNode getNode(IUser user, UUID id) {
        LifeCycleNode lc = new LifeCycleNode();
        lc.setType(LifeCycleNodeType.ASSIGNMENT);
        if (id.equals(this.id)) {
            lc.setCurrent(true);
        }

        if (user.isSuperUser() || getReaders().containsKey(user.getId())) {
            lc.setAvailable(true);
            lc.setTitle(getTitle());
            lc.setStatus(getApprovalStatus().name());
        }
        lc.setUrl(getURL());
        return lc;
    }

    @Override
    @JsonIgnore
    public ESPayload getESSDocument() throws IOException {
        EmployeeDAO employeeDAO = (EmployeeDAO) DAOFactory.get( Employee.class);

        XContentBuilder document = XContentFactory.jsonBuilder();
        document.startObject();
        document.field("type", getEntityKind().toLowerCase());
        document.field("title", getTitle());
        if (regNumber != null) {
            document.field("regNumber", regNumber);
            document.field("regNumberDigit", Integer.parseInt(regNumber.replaceAll("\\D+", "")));
        }
        document.field("regDate", getRegDate());
        Employee authorEmp = employeeDAO.findByUser(getAuthor());
        if (authorEmp != null){
            document.field("author", authorEmp.getName());
        }
        document.field("authorId", getAuthorId());
        Project project = getProject();
        if (project != null) {
            document.field("projectName", project.getName());
            document.field("projectStatus", project.getStatus());
            document.field("projectCustomer", project.getCustomer().getName());
            for(LanguageCode code: EnvConst.getDefaultLangs()) {
                document.field("projectCustomer" + code, project.getCustomer().getLocName(code));
            }
            document.field("projectFinishDate", project.getFinishDate());
        }
        document.field("status", getStatus());
        document.field("priority", getPriority());
        document.field("body", getBody());
        document.field("estimateInHours", getEstimateInHours());
        Employee employee = employeeDAO.findByUserId(getAssignee());
        if (employee != null) {
            document.field("assignee",employee.getName());
        }
        document.field("startDate", getStartDate());
        document.field("dueDate", getDueDate());
        document.field("taskType", getTaskType().getName());
        document.field("cancellationComment", getCancellationComment());
        //	document.field("stages", task.getStages().toString());

        document.endObject();
        return new ESPayload(getEntityKind(), id.toString(), getReaders().keySet().stream().map(v -> Long.toString(v)).collect(Collectors.toList()),document);

    }
}
