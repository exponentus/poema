package helpdesk.dao.filter;

import com.exponentus.dataengine.IFilter;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import projects.model.Project;
import reference.model.DemandType;
import reference.model.Tag;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class DemandFilter implements IFilter<Demand> {

    private DemandStatusType status = DemandStatusType.UNKNOWN;
    private DemandType demandType;
    private Project project;
    private List<Tag> tags;

    public DemandStatusType getStatus() {
        return status;
    }

    public void setStatus(DemandStatusType status) {
        this.status = status;
    }

    public DemandType getDemandType() {
        return demandType;
    }

    public void setDemandType(DemandType demandType) {
        this.demandType = demandType;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public Predicate collectPredicate(Root<Demand> root, CriteriaBuilder cb, Predicate condition) {
        if (status != DemandStatusType.UNKNOWN) {
            if (condition == null) {
                condition = cb.and(cb.equal(root.get("status"), status));
            } else {
                condition = cb.and(cb.equal(root.get("status"), status), condition);
            }
        }

        if (demandType != null) {
            if (condition == null) {
                condition = cb.and(cb.equal(root.get("demandType"), demandType));
            } else {
                condition = cb.and(cb.equal(root.get("demandType"), demandType), condition);
            }
        }

        if (project != null) {
            if (condition == null) {
                condition = cb.and(cb.equal(root.get("project"), project));
            } else {
                condition = cb.and(cb.equal(root.get("project"), project), condition);
            }
        }

        if (tags != null) {
            if (condition == null) {
                condition = cb.and(root.get("tags").in(tags));
            } else {
                condition = cb.and(root.get("tags").in(tags), condition);
            }
        }

        return condition;
    }
}
