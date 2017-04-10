package audit.dao.filter;

import audit.model.constants.ProjectStatusType;

public class ProjectFilter {

    private ProjectStatusType status;

    public ProjectStatusType getStatus() {
        return status;
    }

    public void setStatus(ProjectStatusType status) {
        this.status = status;
    }
}
