package projects.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;
import projects.model.Project;
import projects.model.Task;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.List;
import java.util.UUID;

public class ProjectDAO extends DAO<Project, UUID> {

    public ProjectDAO(_Session session) throws DAOException {
        super(Project.class, session);
    }

    public List<Tuple> findProjectByPreference(Long authorId, int listSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Tuple> criteriaQuery = cb.createTupleQuery();
            Root<Task> root = criteriaQuery.from(Task.class);
            Predicate condition = cb.equal(root.get("author").get("id"), authorId);
            Expression count = cb.count(root);
            criteriaQuery.multiselect(count, root.get("project")).orderBy(cb.desc(count));
            criteriaQuery.groupBy(root.get("project"));
            criteriaQuery.where(condition);
            TypedQuery<Tuple> typedQuery = em.createQuery(criteriaQuery);
            typedQuery.setMaxResults(listSize);
            return typedQuery.getResultList();
        } finally {
            em.close();
        }
    }
}
