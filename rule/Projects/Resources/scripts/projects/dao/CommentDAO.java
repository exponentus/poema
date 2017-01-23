package projects.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import projects.model.Comment;
import projects.model.Task;

public class CommentDAO extends DAO<Comment, UUID> {
	
	public CommentDAO(_Session session) throws DAOException {
		super(Comment.class, session);
	}
	
	public List<Comment> findTaskComments(Task task, int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
			CriteriaQuery<Comment> cq = cb.createQuery(Comment.class);
			Root<Comment> c = cq.from(Comment.class);
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
				pageNum = 1; // maxPage;
			}
			int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
			
			TypedQuery<Comment> typedQuery = em.createQuery(cq);
			typedQuery.setFirstResult(firstRec);
			typedQuery.setMaxResults(pageSize);
			return typedQuery.getResultList();
		} finally {
			em.close();
		}
	}
}
