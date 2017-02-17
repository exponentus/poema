package workflow.model.embedded;

import com.exponentus.dataengine.jpa.SimpleAppEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "assignee_entries")
public class AssigneeEntry extends SimpleAppEntity {

    @Column(name = "is_coordinator")
    private boolean isCoordinator;

    private Long assignee;

    private Long resetter;

    @Column(name = "reset_time")
    private Date resetTime;

    @Column(name = "resetter_info")
    private String resetterInfo;

    public boolean isCoordinator() {
        return isCoordinator;
    }

    public void setCoordinator(boolean isCoordinator) {
        this.isCoordinator = isCoordinator;
    }

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
