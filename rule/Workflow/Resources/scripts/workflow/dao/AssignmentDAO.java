package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.AssignmentFilter;
import workflow.dto.AssignmentViewEntryDTO;
import workflow.model.Assignment;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.UUID;

public class AssignmentDAO extends ControlledDocumentDAO<Assignment, UUID> {

    public AssignmentDAO(_Session session) throws DAOException {
        super(Assignment.class, session);
    }

    public ViewPage<AssignmentViewEntryDTO> findViewPage(AssignmentFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<AssignmentViewEntryDTO> cq = cb.createQuery(AssignmentViewEntryDTO.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Assignment> root = cq.from(Assignment.class);

            Predicate condition = null;
            Predicate conditionCount = null;

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
                conditionCount = cb.and(root.get("readers").in(user.getId()));
            }

            if (filter.getControlStatusType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("control").get("status"), filter.getControlStatusType()));
                    conditionCount = cb.and(cb.equal(root.get("control").get("status"), filter.getControlStatusType()));
                } else {
                    condition = cb.and(cb.equal(root.get("control").get("status"), filter.getControlStatusType()), condition);
                    conditionCount = cb.and(cb.equal(root.get("control").get("status"), filter.getControlStatusType()), conditionCount);
                }
            }

            if (filter.getControlType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("control").get("controlType"), filter.getControlType()));
                    conditionCount = cb.and(cb.equal(root.get("control").get("controlType"), filter.getControlType()));
                } else {
                    condition = cb.and(cb.equal(root.get("control").get("controlType"), filter.getControlType()), condition);
                    conditionCount = cb.and(cb.equal(root.get("control").get("controlType"), filter.getControlType()), conditionCount);
                }
            }

            if (filter.getAppliedAuthor() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()));
                    conditionCount = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()));
                } else {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()), condition);
                    conditionCount = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()), conditionCount);
                }
            }

            if (filter.getAssignee() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("control").get("assigneeEntries").get("assignee"), filter.getAssignee()));
                    conditionCount = cb.and(cb.equal(root.get("control").get("assigneeEntries").get("assignee"), filter.getAssignee()));
                } else {
                    condition = cb.and(cb.equal(root.get("control").get("assigneeEntries").get("assignee"), filter.getAssignee()), condition);
                    conditionCount = cb.and(cb.equal(root.get("control").get("assigneeEntries").get("assignee"), filter.getAssignee()), conditionCount);
                }
            }

            cq.select(cb.construct(
                    AssignmentViewEntryDTO.class,
                    root.get("id"),
                    root.get("appliedAuthor").get("name"),
                    root.get("body"),
                    root.get("control")
            ))
                    .orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.count(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(conditionCount);
            }

            TypedQuery<AssignmentViewEntryDTO> typedQuery = em.createQuery(cq);
            TypedQuery<Long> countQuery = em.createQuery(countRootCq);

            long count = countQuery.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            return new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
