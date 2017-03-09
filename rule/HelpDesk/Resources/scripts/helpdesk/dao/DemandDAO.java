package helpdesk.dao;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import helpdesk.dao.filter.DemandFilter;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class DemandDAO extends DAO<Demand, UUID> {

    public DemandDAO(_Session session) throws DAOException {
        super(Demand.class, session);
    }

    public ViewPage<Demand> findViewPage(DemandFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        if (filter == null) {
            throw new IllegalArgumentException("filter is null");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Demand> cq = cb.createQuery(Demand.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Demand> root = cq.from(Demand.class);

            Predicate condition = null;

            if (filter.getStatus() != DemandStatusType.UNKNOWN) {
                condition = cb.and(cb.equal(root.get("status"), filter.getStatus()));
            }

            if (filter.getDemandType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("demandType"), filter.getDemandType()));
                } else {
                    condition = cb.and(cb.equal(root.get("demandType"), filter.getDemandType()), condition);
                }
            }

            if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
                if (condition == null) {
                    condition = cb.and(root.get("readers").in(user.getId()));
                } else {
                    condition = cb.and(condition, cb.and(root.get("readers").in(user.getId())));
                }
            }

            cq.select(root).distinct(true).orderBy(collectSortOrder(cb, root, sortParams));
            countCq.select(cb.countDistinct(root));

            if (condition != null) {
                cq.where(condition);
                countCq.where(condition);
            }

            TypedQuery<Demand> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = 1;
            if (pageNum != 0 || pageSize != 0) {
                maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
                if (pageNum == 0) {
                    pageNum = 1;
                }
                int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
                typedQuery.setFirstResult(firstRec);
                typedQuery.setMaxResults(pageSize);
            }

            List<Demand> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
