package audit.dao;

import audit.dao.filter.ObservationFilter;
import audit.model.Observation;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class ObservationDAO extends DAO<Observation, UUID> {

    public ObservationDAO(_Session session) throws DAOException {
        super(Observation.class, session);
    }

    public ViewPage<Observation> findViewPage(ObservationFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        if (filter == null) {
            throw new IllegalArgumentException("filter is null");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Observation> cq = cb.createQuery(Observation.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Observation> root = cq.from(Observation.class);

            Predicate condition = null;

            if (filter.getStatus() != null) {
                condition = cb.and(cb.equal(root.get("status"), filter.getStatus()));
            }

            if (filter.getProject() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("project"), filter.getProject()));
                } else {
                    condition = cb.and(cb.equal(root.get("project"), filter.getProject()), condition);
                }
            }

            if (filter.getContractor() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("contractor"), filter.getContractor()));
                } else {
                    condition = cb.and(cb.equal(root.get("contractor"), filter.getContractor()), condition);
                }
            }

            if (filter.getWorkType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("workType"), filter.getWorkType()));
                } else {
                    condition = cb.and(cb.equal(root.get("workType"), filter.getWorkType()), condition);
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

            TypedQuery<Observation> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            List<Observation> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
