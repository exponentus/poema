package workflow.dao;

import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;

import workflow.dto.AsProjectViewEntry;
import workflow.model.OfficeMemo;
import workflow.model.Outgoing;

public class AsProjectViewEntryDAO extends DAO<AsProjectViewEntry, UUID> {

	public AsProjectViewEntryDAO(AppEnv env, _Session ses) throws DAOException {
		super(AsProjectViewEntry.class, env, ses);
	}

	@Override
	public ViewPage<AsProjectViewEntry> findViewPage(int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<AsProjectViewEntry> cq = cb.createQuery(AsProjectViewEntry.class);
			CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
			Root<OfficeMemo> root1 = cq.from(OfficeMemo.class);
			Root<Outgoing> root2 = cq.from(Outgoing.class);
			//cq.where(cb.equal(root1.get("address"), address.get("address"));
			/*cq.multiselect(
					cb.construct(AsProjectViewEntry.class, root1.get("id"), root1.get("title"), root1.get("regNumber"),
							root1.get("appliedRegDate"), root1.get("version")),
					cb.construct(AsProjectViewEntry.class, root2.get("id"), root2.get("title"), root2.get("regNumber"),
							root2.get("appliedRegDate"), root2.get("version")));*/
			cq.multiselect(root1, root2);
			countRootCq.multiselect(cb.count(root1), (cb.count(root2)));

			TypedQuery<AsProjectViewEntry> typedQuery = em.createQuery(cq);
			TypedQuery<Long> countQuery = em.createQuery(countRootCq);

			long count = countQuery.getSingleResult();
			int maxPage = pageable(typedQuery, count, pageNum, pageSize);

			return new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			em.close();
		}
		return null;
	}
}
