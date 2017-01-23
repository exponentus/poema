package projects.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import projects.model.Dashboard;

public class DashboardDAO extends DAO<Dashboard, UUID> {
	
	public DashboardDAO(_Session session) throws DAOException {
		super(Dashboard.class, session);
	}
	
	public Dashboard findUserDashboard(IUser<Long> user) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Dashboard> cq = cb.createQuery(Dashboard.class);
			Root<Dashboard> c = cq.from(Dashboard.class);
			cq.select(c);
			
			Predicate condition = cb.equal(c.get("author"), user.getId());
			cq.where(condition);
			
			TypedQuery<Dashboard> typedQuery = em.createQuery(cq);
			List<Dashboard> ds = typedQuery.getResultList();
			if (ds.isEmpty()) {
				return null;
			}
			return ds.get(0);
		} finally {
			em.close();
		}
	}
}
