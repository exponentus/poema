package workflow.dao;

import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;

import staff.model.Employee;
import workflow.model.ActionableDocument;

public class ActionableDocumentDAO extends DAO<ActionableDocument, UUID> {

	public ActionableDocumentDAO(_Session session) throws DAOException {
		super(ActionableDocument.class, session);
	}

	public ActionableDocumentDAO(AppEnv appEnv, _Session ses) throws DAOException {
		super(ActionableDocument.class, appEnv, ses);
	}

	public ViewPage<ActionableDocument> findProjectsByAuthorViewPage(Employee author, SortParams sortParams, int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<ActionableDocument> cq = cb.createQuery(ActionableDocument.class);
			CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
			Root<ActionableDocument> root = cq.from(ActionableDocument.class);

			/*Predicate condition = cb.and(cb.or(cb.equal(root.get("result"), ApprovalResultType.PROJECT),
					cb.equal(root.get("result"), ApprovalResultType.REJECTED)));*/
			Predicate condition = cb.equal(root.get("author"), author.getUser());

			if (!user.isSuperUser()) {
				condition = cb.and(root.get("readers").in(user.getId()), condition);
			}

			countRootCq.select(cb.countDistinct(root));

			if (condition != null) {
				cq.where(condition);
				countRootCq.where(condition);
			}

			cq.orderBy(collectSortOrder(cb, root, sortParams));

			TypedQuery<ActionableDocument> typedQuery = em.createQuery(cq);
			TypedQuery<Long> countQuery = em.createQuery(countRootCq);

			long count = countQuery.getSingleResult();
			int maxPage = pageable(typedQuery, count, pageNum, pageSize);

			return new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
		} finally {
			em.close();
		}
	}

	public ViewPage<ActionableDocument> findApprovalPendingByCurrentEmployeeViewPage(Employee emp, SortParams sortParams, int pageNum,
			int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<ActionableDocument> cq = cb.createQuery(ActionableDocument.class);
			CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
			Root<ActionableDocument> root = cq.from(ActionableDocument.class);

			Predicate condition = null;

			if (!user.isSuperUser()) {
				condition = cb.and(root.get("readers").in(user.getId()));
			}

			if (condition == null) {
				condition = cb.and(cb.equal(root.get("blocks").get("approvers").get("employee"), emp));
				condition = cb.and(cb.isTrue(root.get("blocks").get("approvers").get("isCurrent")), condition);
			} else {
				condition = cb.and(cb.equal(root.get("blocks").get("approvers").get("employee"), emp), condition);
				condition = cb.and(cb.isTrue(root.get("blocks").get("approvers").get("isCurrent")), condition);
			}

			countRootCq.select(cb.countDistinct(root));

			if (condition != null) {
				cq.where(condition);
				countRootCq.where(condition);
			}

			cq.orderBy(collectSortOrder(cb, root, sortParams));

			TypedQuery<ActionableDocument> typedQuery = em.createQuery(cq);
			TypedQuery<Long> countQuery = em.createQuery(countRootCq);

			long count = countQuery.getSingleResult();
			int maxPage = pageable(typedQuery, count, pageNum, pageSize);

			return new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
		} finally {
			em.close();
		}
	}
}
