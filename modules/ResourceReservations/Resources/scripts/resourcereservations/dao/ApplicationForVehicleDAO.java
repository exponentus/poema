package resourcereservations.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.model.ApplicationForVehicle;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class ApplicationForVehicleDAO extends DAO<ApplicationForVehicle, UUID> {

	public ApplicationForVehicleDAO(_Session session) throws DAOException {
		super(ApplicationForVehicle.class, session);
	}

	public ViewPage<ApplicationForVehicle> findViewPage(ApplicationFilter filter, SortParams sortParams, int pageNum,
														int pageSize) {
		if (filter == null) {
			throw new IllegalArgumentException("filter is null");
		}

		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<ApplicationForVehicle> cq = cb.createQuery(ApplicationForVehicle.class);
			CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
			Root<ApplicationForVehicle> root = cq.from(ApplicationForVehicle.class);

			Predicate condition = null;

			if (!user.isSuperUser()) {
				condition = cb.and(root.get("readers").in(user.getId()));
			}

			if (filter.getStatus() != null) {
				if (condition == null) {
					condition = cb.equal(root.get("status"), filter.getStatus());
				} else {
					condition = cb.and(cb.equal(root.get("status"), filter.getStatus()), condition);
				}
			}

			if (filter.getResult() != null) {
				if (condition == null) {
					condition = cb.equal(root.get("result"), filter.getResult());
				} else {
					condition = cb.and(cb.equal(root.get("result"), filter.getResult()), condition);
				}
			}

			if (filter.getVehicle() != null) {
				if (condition == null) {
					condition = cb.equal(root.get("vehicle"), filter.getVehicle());
				} else {
					condition = cb.and(cb.equal(root.get("vehicle"), filter.getVehicle()), condition);
				}
			}

			if (filter.getTags() != null) {
				if (condition == null) {
					condition = root.get("tags").in(filter.getTags());
				} else {
					condition = cb.and(root.get("tags").in(filter.getTags()), condition);
				}
			}

			cq.select(root).distinct(true).orderBy(collectSortOrder(cb, root, sortParams));
			countRootCq.select(cb.countDistinct(root));

			if (condition != null) {
				cq.where(condition);
			}

			TypedQuery<ApplicationForVehicle> typedQuery = em.createQuery(cq);
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
			List<ApplicationForVehicle> result = typedQuery.getResultList();

			return new ViewPage<>(result, count, maxPage, pageNum);
		} finally {
			em.close();
		}
	}
}
