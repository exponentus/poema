package workflow.model.embedded;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "control_assignees")
public class AssigneeEntry {

    @Id
    @GeneratedValue(generator = "uuid-gen")
    @org.eclipse.persistence.annotations.Convert("uuidConverter")
    @Column(name = "id", nullable = false)
    protected UUID id;

    private Long assignee;

    @Column(name = "reset_time")
    private Date resetTime;

    @Column(name = "resetter_info")
    private String resetterInfo;

    public Long getAssignee() {
        return assignee;
    }

    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }

    public Date getResetTime() {
        return resetTime;
    }

    public void setResetTime(Date resetTime) {
        this.resetTime = resetTime;
    }

    public String getResetterInfo() {
        return resetterInfo;
    }

    public void setResetterInfo(String resetterInfo) {
        this.resetterInfo = resetterInfo;
    }
}
