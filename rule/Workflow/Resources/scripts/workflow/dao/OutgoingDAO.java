package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.OutgoingFilter;
import workflow.dto.OutgoingViewEntry;
import workflow.model.Outgoing;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.List;
import java.util.UUID;

public class OutgoingDAO extends DAO<Outgoing, UUID> {

    public OutgoingDAO(_Session session) throws DAOException {
        super(Outgoing.class, session);
    }

    public ViewPage<OutgoingViewEntry> findViewPage(OutgoingFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<OutgoingViewEntry> cq = cb.createQuery(OutgoingViewEntry.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Outgoing> root = cq.from(Outgoing.class);
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

            if (filter.getRecipient() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("recipient"), filter.getRecipient()));
                } else {
                    condition = cb.and(cb.equal(root.get("recipient"), filter.getRecipient()), condition);
                }
            }

            if (filter.getDocType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("docType"), filter.getDocType()));
                } else {
                    condition = cb.and(cb.equal(root.get("docType"), filter.getDocType()), condition);
                }
            }

            if (filter.getDocSubject() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("docSubject"), filter.getDocSubject()));
                } else {
                    condition = cb.and(cb.equal(root.get("docSubject"), filter.getDocSubject()), condition);
                }
            }

            cq.select(cb.construct(
                    OutgoingViewEntry.class,
                    root.get("id"),
                    root.get("status"),
                    root.get("result"),
                    root.get("title"),
                    root.get("regNumber"),
                    root.get("appliedRegDate"),
                    root.get("recipient").get("name"),
                    root.get("docLanguage").get("locName"),
                    root.get("docType").get("locName"),
                    root.get("docSubject").get("locName"),
                    root.get("body"),
                    cb.count(atts)
            ))
                    .distinct(true)
                    .groupBy(root, root.get("recipient").get("name"), root.get("docLanguage").get("locName"),
                            root.get("docType").get("locName"), root.get("docSubject").get("locName"), atts)
                    .orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.countDistinct(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<OutgoingViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> query = em.createQuery(countRootCq);

            long count = query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);
            List<OutgoingViewEntry> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
