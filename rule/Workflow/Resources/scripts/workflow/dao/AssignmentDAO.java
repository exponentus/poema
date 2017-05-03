package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.AssignmentFilter;
import workflow.model.Assignment;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class AssignmentDAO extends ControlledDocumentDAO<Assignment, UUID> {

    public AssignmentDAO(_Session session) throws DAOException {
        super(Assignment.class, session);
    }

    public ViewPage<Assignment> findViewPage(AssignmentFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Assignment> cq = cb.createQuery(Assignment.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Assignment> countRoot = countRootCq.from(Assignment.class);
            Root<Assignment> root = cq.from(Assignment.class);

            Predicate condition = null;
            // Predicate conditionCount = null;

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
                // conditionCount = cb.and(countRoot.get("readers").in(user.getId()));
            }

            if (filter.getAppliedAuthor() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()));
                    // conditionCount = cb.and(cb.equal(countRoot.get("appliedAuthor"), filter.getAppliedAuthor()));
                } else {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()), condition);
                    // conditionCount = cb.and(cb.equal(countRoot.get("appliedAuthor"), filter.getAppliedAuthor()), conditionCount);
                }
            }

            if (filter.getAssignee() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("control").get("assigneeEntries").get("assignee"), filter.getAssignee()));
                    // conditionCount = cb.and(countRoot.get("control").get("assigneeEntries").in(filter.getAssigneeEntries()));
                } else {
                    condition = cb.and(cb.equal(root.get("control").get("assigneeEntries").get("assignee"), filter.getAssignee()), condition);
                    // conditionCount = cb.and(countRoot.get("control").get("assigneeEntries").in(filter.getAssigneeEntries()), conditionCount);
                }
            }

            cq.select(root).distinct(true).orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.count(countRoot));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<Assignment> typedQuery = em.createQuery(cq);
            TypedQuery<Long> query = em.createQuery(countRootCq);

            long count = query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);
            List<Assignment> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
