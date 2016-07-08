package projects.dao;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class RequestDAO extends DAO<Request, UUID> {

    public RequestDAO(_Session session) {
        super(Request.class, session);
    }

    public List<Request> findTaskRequests(Task task, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            CriteriaQuery<Request> cq = cb.createQuery(Request.class);
            Root<Request> c = cq.from(Request.class);
            cq.select(c);
            countCq.select(cb.count(c));

            Predicate condition = cb.equal(c.get("task"), task);
            cq.orderBy(cb.desc(c.get("regDate")));
            cq.where(condition);
            countCq.where(condition);

            Query countQuery = em.createQuery(countCq);
            long count = (long) countQuery.getSingleResult();
            int maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
            if (pageNum == 0) {
                pageNum = maxPage;
            }
            int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);

            TypedQuery<Request> typedQuery = em.createQuery(cq);
            typedQuery.setFirstResult(firstRec);
            typedQuery.setMaxResults(pageSize);
            return typedQuery.getResultList();
        } finally {
            em.close();
        }
    }

    public Request findUnResolvedRequest(Task task) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Request> cq = cb.createQuery(Request.class);
            Root<Request> c = cq.from(Request.class);
            cq.select(c);

            Predicate condition = cb.equal(c.get("task"), task);
            condition = cb.and(cb.equal(c.get("resolution"), ResolutionType.UNKNOWN), condition);
            cq.where(condition);

            TypedQuery<Request> typedQuery = em.createQuery(cq);
            return typedQuery.getSingleResult();
        } finally {
            em.close();
        }
    }
}
