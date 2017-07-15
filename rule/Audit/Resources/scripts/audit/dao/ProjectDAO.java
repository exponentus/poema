package audit.dao;

import administrator.model.User;
import audit.dao.filter.ProjectFilter;
import audit.model.Project;
import com.exponentus.common.dao.DAO;
import com.exponentus.common.model.SecureAppEntity;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;

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

public class ProjectDAO extends DAO<Project, UUID> {

    public ProjectDAO(_Session session) throws DAOException {
        super(Project.class, session);
    }

    public ViewPage<Project> findViewPage(ProjectFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        if (filter == null) {
            throw new IllegalArgumentException("filter is null");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Project> cq = cb.createQuery(Project.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Project> root = cq.from(Project.class);

            Predicate condition = null;

            if (filter.getStatus() != null) {
                condition = cb.and(cb.equal(root.get("status"), filter.getStatus()));
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

            TypedQuery<Project> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            List<Project> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }

    public List<Project> findProjectsByInspector(User inspector) {
        if (inspector == null) {
            throw new IllegalArgumentException("inspector required");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<Project> cq = cb.createQuery(Project.class);
            Root<Project> root = cq.from(Project.class);

            Predicate condition = cb.and(cb.equal(root.get("inspector"), inspector));

            cq.select(root).where(condition);

            TypedQuery<Project> typedQuery = em.createQuery(cq);
            return typedQuery.getResultList();
        } finally {
            em.close();
        }
    }
}
