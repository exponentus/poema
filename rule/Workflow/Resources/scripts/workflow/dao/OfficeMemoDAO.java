package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.OfficeMemoFilter;
import workflow.dto.OfficeMemoViewEntry;
import workflow.model.OfficeMemo;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.List;
import java.util.UUID;

public class OfficeMemoDAO extends DAO<OfficeMemo, UUID> {

    public OfficeMemoDAO(_Session session) throws DAOException {
        super(OfficeMemo.class, session);
    }

    public ViewPage<OfficeMemoViewEntry> findViewPage(OfficeMemoFilter filter, SortParams sortParams, int pageNum,
                                                      int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<OfficeMemoViewEntry> cq = cb.createQuery(OfficeMemoViewEntry.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<OfficeMemo> countRoot = countRootCq.from(OfficeMemo.class);
            Root<OfficeMemo> root = cq.from(OfficeMemo.class);
            Join atts = root.join("attachments", JoinType.LEFT);

            Predicate condition = null;

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
            }

            if (filter.getStatus() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("status"), filter.getStatus()));
                } else {
                    condition = cb.and(cb.equal(root.get("status"), filter.getStatus()), condition);
                }
            }

            if (filter.getResult() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("result"), filter.getResult()));
                } else {
                    condition = cb.and(cb.equal(root.get("result"), filter.getResult()), condition);
                }
            }

            if (filter.getAppliedAuthor() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()));
                } else {
                    condition = cb.and(cb.equal(root.get("appliedAuthor"), filter.getAppliedAuthor()), condition);
                }
            }

            if (filter.getRecipient() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("recipient"), filter.getRecipient()));
                } else {
                    condition = cb.and(cb.equal(root.get("recipient"), filter.getRecipient()), condition);
                }
            }

            // cq.select(root).distinct(true).orderBy(collectSortOrder(cb, root, sortParams));

            cq.select(cb.construct(
                    OfficeMemoViewEntry.class,
                    root.get("id"),
                    root.get("status"),
                    root.get("result"),
                    root.get("title"),
                    root.get("regNumber"),
                    root.get("appliedRegDate"),
                    root.get("appliedAuthor").get("name"),
                    root.get("recipient").get("name"),
                    root.get("body"),
                    cb.count(atts)
            ))
                    .groupBy(root, root.get("appliedAuthor").get("name"),
                            root.get("recipient").get("name"), atts)
                    .orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.count(countRoot));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<OfficeMemoViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> query = em.createQuery(countRootCq);

            long count = query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);
            List<OfficeMemoViewEntry> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
