package projects.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;

import projects.model.Project;
import projects.model.constants.ProjectStatusType;

public class ProjectDAO extends DAO<Project, UUID> {

	public ProjectDAO(_Session session) throws DAOException {
		super(Project.class, session);
	}

	public ViewPage<Project> findViewPage1(SortParams sortParams, ProjectStatusType status, int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Project> cq = cb.createQuery(Project.class);
			CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
			Root<Project> countRoot = countRootCq.from(Project.class);
			Root<Project> root = cq.from(Project.class);
			Join atts = root.join("attachments", JoinType.LEFT);

			Predicate condition = null;
			Predicate conditionCount = null;

			if (!user.isSuperUser()) {
				condition = cb.and(root.get("readers").in(user.getId()));
				conditionCount = cb.and(countRoot.get("readers").in(user.getId()));
			}

			if (status != null) {
				condition = cb.and(cb.equal(root.get("status"), status), condition);
				conditionCount = cb.and(cb.equal(countRoot.get("status"), status), conditionCount);
			}

			cq.select(cb.construct(Project.class, root.get("id"), root.get("regDate"), root.get("name"),
					root.get("status"), root.get("customer").get("name"), root.get("manager"), root.get("programmer"),
					root.get("tester"), root.get("finishDate"), cb.count(atts)))
					.groupBy(root, root.get("customer").get("name")).orderBy(collectSortOrder(cb, root, sortParams));

			countRootCq.select(cb.count(countRoot));

			if (condition != null) {
				cq.where(condition);
				countRootCq.where(conditionCount);
			}

			TypedQuery<Project> typedQuery = em.createQuery(cq);
			TypedQuery<Long> query = em.createQuery(countRootCq);

			long count = query.getSingleResult();
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
