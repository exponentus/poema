package audit.dao.filter;

import audit.model.Project;
import audit.model.constants.ObservationStatusType;
import reference.model.WorkType;
import staff.model.Organization;

public class ObservationFilter {

    private ObservationStatusType status;
    private Project project;
    private Organization contractor;
    private WorkType workType;

    public ObservationStatusType getStatus() {
        return status;
    }

    public void setStatus(ObservationStatusType status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Organization getContractor() {
        return contractor;
    }

    public void setContractor(Organization contractor) {
        this.contractor = contractor;
    }

    public WorkType getWorkType() {
        return workType;
    }

    public void setWorkType(WorkType workType) {
        this.workType = workType;
    }
}
