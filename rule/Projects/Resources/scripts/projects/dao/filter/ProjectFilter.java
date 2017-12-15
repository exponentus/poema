package projects.dao.filter;

import com.exponentus.runtimeobj.IFilter;
import projects.model.constants.ProjectStatusType;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class ProjectFilter implements IFilter {

    private ProjectStatusType status;

    public ProjectStatusType getStatus() {
        return status;
    }

    public void setStatus(ProjectStatusType status) {
        this.status = status;
    }

    @Override
    public Predicate collectPredicate(Root root, CriteriaBuilder cb, Predicate condition) {
        if (status != null) {
            if (condition == null) {
                condition = cb.and(cb.equal(root.get("status"), status));
            } else {
                condition = cb.and(cb.equal(root.get("status"), status), condition);
            }
        }

        return condition;
    }
}
