package projects.model;

import com.exponentus.dataengine.jpa.AppEntity;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.util.List;
import java.util.UUID;

@JsonRootName("dashboard")
@Entity
@Table(name = "dashboards")
@NamedQuery(name = "Dashboard.findAll", query = "SELECT m FROM Dashboard AS m ORDER BY m.regDate ASC")
public class Dashboard extends AppEntity<UUID> {

    private List<Project> projects;

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
