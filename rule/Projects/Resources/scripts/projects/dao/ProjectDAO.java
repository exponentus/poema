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
import com.exponentus.dataengine.jpa.DAO;
//import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;

import projects.model.Project;

public class ProjectDAO extends DAO<Project, UUID> {

	public ProjectDAO(_Session session) {
		super(Project.class, session);
	}

	public ViewPage<Project> findProjects(String keyWord, int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
			CriteriaQuery<Project> cq = cb.createQuery(Project.class);
			Root<Project> c = cq.from(Project.class);
			cq.select(c);
			countCq.select(cb.count(c));

			Predicate condition = null;
//			if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
//				condition = cb.and(c.get("readers").in(user.getId()));
//			}
			if (keyWord != null && !keyWord.isEmpty()) {
//				if (condition != null) {
//					condition = cb.and(cb.like(cb.lower(c.<String> get("name")), "%" + keyWord + "%"), condition);
//				} else {
					condition = cb.and(cb.like(cb.lower(c.<String> get("name")), "%" + keyWord + "%"));
//				}
			}
			if (condition != null) {
				cq.where(condition);
				countCq.where(condition);
			}
			cq.orderBy(cb.asc(c.get("name")));

			Query query = em.createQuery(countCq);
			long count = (long) query.getSingleResult();
			int maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
			if (pageNum == 0) {
				pageNum = 1; //maxPage;
			}
			int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);

			TypedQuery<Project> typedQuery = em.createQuery(cq);
			typedQuery.setFirstResult(firstRec);
			typedQuery.setMaxResults(pageSize);

			List<Project> result = typedQuery.getResultList();

			return new ViewPage<>(result, count, maxPage, pageNum);
		} finally {
			em.close();
		}
	}
}
