package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.OutgoingFilter;
import workflow.model.Outgoing;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class OutgoingDAO extends DAO<Outgoing, UUID> {

    public OutgoingDAO(_Session session) throws DAOException {
        super(Outgoing.class, session);
    }

    public ViewPage<Outgoing> findViewPage(OutgoingFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Outgoing> cq = cb.createQuery(Outgoing.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Outgoing> countRoot = countRootCq.from(Outgoing.class);
            Root<Outgoing> root = cq.from(Outgoing.class);

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

            cq.select(root).distinct(true).orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.count(countRoot));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<Outgoing> typedQuery = em.createQuery(cq);
            TypedQuery<Long> query = em.createQuery(countRootCq);

            long count = query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);
            List<Outgoing> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
