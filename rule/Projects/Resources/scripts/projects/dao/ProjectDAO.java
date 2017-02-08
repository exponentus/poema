package projects.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.user.SuperUser;

import projects.model.Project;

public class ProjectDAO extends DAO<Project, UUID> {

	public ProjectDAO(_Session session) throws DAOException {
		super(Project.class, session);
	}

	// TEST
	//@Override
	public ViewPage<Project> findViewPage1(SortParams sortParams, int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Project> cq = cb.createQuery(Project.class);
			CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
			Root<Project> root = cq.from(Project.class);
			// cq.select(root);
			Join atts = root.join("attachments", JoinType.LEFT);
			cq.select(cb.construct(Project.class, root.get("id"), root.get("regDate"), root.get("name"),
					root.get("status"), root.get("customer").get("name"), root.get("manager"), root.get("programmer"),
					root.get("tester"), root.get("finishDate"), cb.count(atts)));
			countCq.select(cb.count(root));

			Predicate condition = null;
			if (user.getId() != SuperUser.ID && SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
				condition = cb.and(root.get("readers").in(user.getId()));
			}

			if (sortParams != null && !sortParams.isEmpty()) {
				List<Order> orderByList = new ArrayList<>();
				sortParams.values().forEach((fieldName, direction) -> {
					if (direction.isAscending()) {
						orderByList.add(cb.asc(root.get(fieldName)));
					} else {
						orderByList.add(cb.desc(root.get(fieldName)));
					}
				});
				cq.orderBy(orderByList);
			} else {
				cq.orderBy(cb.desc(root.get("regDate")));
			}

			if (condition != null) {
				cq.where(condition);
				countCq.where(condition);
			}
			cq.groupBy(root, root.get("customer").get("name"));

			TypedQuery<Project> typedQuery = em.createQuery(cq);
			Query query = em.createQuery(countCq);
			long count = (long) query.getSingleResult();
			int maxPage = 1;
			if (pageNum != 0 || pageSize != 0) {
				maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
				if (pageNum < 0) {
					pageNum = 1;
				}
				int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
				typedQuery.setFirstResult(firstRec);
				typedQuery.setMaxResults(pageSize);
			}
			List<Project> result = typedQuery.getResultList();

			return new ViewPage<>(result, count, maxPage, pageNum);
		} finally {
			em.close();
		}
	}
}
