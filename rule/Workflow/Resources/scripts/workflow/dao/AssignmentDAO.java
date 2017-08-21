package workflow.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import staff.model.Employee;
import workflow.dao.filter.AssignmentFilter;
import workflow.dto.AssignmentViewEntry;
import workflow.model.Assignment;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class AssignmentDAO extends DAO<Assignment, UUID> {

    public AssignmentDAO(_Session session) throws DAOException {
        super(Assignment.class, session);
    }

    public List<Assignment> findAllAssignmentByControlStatus(ControlStatusType statusType) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<Assignment> cq = cb.createQuery(Assignment.class);
            Root<Assignment> root = cq.from(Assignment.class);

            cq.select(root).where(cb.equal(root.get("status"), statusType));
            TypedQuery<Assignment> query = em.createQuery(cq);

            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public ViewPage<AssignmentViewEntry> findViewPage(AssignmentFilter filter, SortParams sortParams, int pageNum,
                                                      int pageSize, boolean showAssigneeList) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery cq = cb.createQuery(AssignmentViewEntry.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Assignment> root = cq.from(Assignment.class);

            Predicate condition = null;

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
            }

            if (filter.getControlStatusType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("status"), filter.getControlStatusType()));
                } else {
                    condition = cb.and(cb.equal(root.get("status"), filter.getControlStatusType()), condition);
                }
            }

            if (filter.getControlType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("controlType"), filter.getControlType()));
                } else {
                    condition = cb.and(cb.equal(root.get("controlType"), filter.getControlType()), condition);
                }
            }

            if (filter.getAppliedAuthor() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()));
                } else {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()), condition);
                }
            }

            if (filter.getAssignee() != null) {
                Expression<Employee> assignees = root.<Collection<AssigneeEntry>>get("assigneeEntries").<Employee>get("assignee");
                Predicate predicate = cb.equal(assignees, filter.getAssignee());
                if (condition == null) {
                    condition = cb.and(predicate);
                } else {
                    condition = cb.and(predicate, condition);
                }
            }

            if (showAssigneeList){
                //TODO this is temporary solution
                cq = cb.createQuery(Assignment.class);
                cq.select(root)
                       // .groupBy(root,root.get("controlType").get("locName"))
                        .orderBy(collectSortOrder(cb, root, sortParams));
            }else{
                cq.select(cb.construct(
                        AssignmentViewEntry.class,
                        root.get("id"),
                        root.get("appliedAuthor").get("name"),
                        root.get("title"),
                        root.get("body"),
                        root.get("controlType").get("locName"),
                        root.get("startDate"),
                        root.get("dueDate"),
                        root.get("status")
                ))
                      //  .groupBy(root, root.get("appliedAuthor").get("name"), root.get("controlType").get("locName"))
                        .orderBy(collectSortOrder(cb, root, sortParams));
            }


            countRootCq.select(cb.countDistinct(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<AssignmentViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> countQuery = em.createQuery(countRootCq);

            long count = countQuery.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);
            String sql = getSQL(em,typedQuery);
            return new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
