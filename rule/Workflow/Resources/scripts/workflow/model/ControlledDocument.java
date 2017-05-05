package workflow.model;

import com.exponentus.common.model.SecureHierarchicalEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "wf__controlled_documents")
public class ControlledDocument extends SecureHierarchicalEntity {

    @OneToMany
    private List<Assignment> assignments;

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }
}
