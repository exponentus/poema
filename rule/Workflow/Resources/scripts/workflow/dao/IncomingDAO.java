package workflow.dao;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;

import workflow.model.Assignment;
import workflow.model.Incoming;

public class IncomingDAO extends DAO<Incoming, UUID> {

	public IncomingDAO(_Session session) {
		super(Incoming.class, session);
	}

	public ViewPage<Incoming> findAllWithResponses(_SortParams sortParams, int pageNum, int pageSize,
			List<UUID> expandedIds) {
		//        ViewPage<Incoming> vp = findViewPage(pageNum, pageSize);
		//
		//        if (vp.getResult().isEmpty() || expandedIds.isEmpty()) {
		//            return vp;
		//        }

		EntityManager em = getEntityManagerFactory().createEntityManager();
		try {
			String query = "SELECT i " + " FROM " + Incoming.class.getName() + " AS i "
					+ " JOIN FETCH i.assignments AS a "
					//+ " JOIN FETCH a.reports AS r "
					// + " WHERE i.incoming.id in :ids "
					+ " ORDER BY i.regDate";

			TypedQuery<Incoming> q = em.createQuery(query, Incoming.class);
			//q.setParameter("ids", expandedIds);

			List<Incoming> ins = q.getResultList();

			return new ViewPage<>(ins, ins.size(), 20, 1);

			//            for (Incoming in : vp.getResult()) {
			//                String query = "SELECT a "
			//                        + " FROM " + Assignment.class.getName() + " AS a "
			//                        + " WHERE a.incoming = :in "
			//                        + " ORDER BY a.regDate";
			//
			//                TypedQuery<Assignment> q = em.createQuery(query, Assignment.class);
			//                q.setParameter("in", in);
			//
			//                List<Assignment> children = q.getResultList();
			//
			//                if (in.getResponses() == null) {
			//                    in.setResponses(new ArrayList<>());
			//                }
			//                in.getResponses().addAll(children);
			//
			//                for (Assignment a : children) {
			//                    a.setParent(null);
			//                    if (a.getChildAssignments() != null) {
			//                        List<IAppEntity> list = new ArrayList<>(a.getChildAssignments());
			//                        a.setResponses(list);
			//                        if (a.getReports() != null) {
			//                            a.getResponses().addAll(a.getReports());
			//                        }
			////                for (Assignment assignment : incoming.getAssignments()) {
			////                    findResponses(assignment, expandedIds);
			////                }
			//                    }
			//                }
			//            }
		} finally {
			em.close();
		}

		//return vp;
	}

	private List<IAppEntity> findResponses(Assignment assignment, List<UUID> expandedIds) {
		List<IAppEntity> result = new ArrayList<>();

		//EntityManager em = getEntityManagerFactory().createEntityManager();
		try {

			List<IAppEntity> children = new ArrayList<>(assignment.getChildAssignments());
			children.addAll(assignment.getReports());

			Supplier<List<IAppEntity>> supplier = LinkedList::new;
			children = children.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
					.collect(Collectors.toCollection(supplier));

			// assignment.setResponses(children);

			//            for (Assignment a : assignment.getChildAssignments()) {
			//                findResponses(a, expandedIds);
			//            }

			//            CriteriaBuilder cb = em.getCriteriaBuilder();
			//
			//            CriteriaQuery<Incoming> cq = cb.createQuery(Incoming.class);
			//            Root<Incoming> root = cq.from(Incoming.class);
			//            Fetch<Assignment, Report> aFetch = root.fetch(Assignment.class.getName(), JoinType.LEFT);
			//            aFetch.fetch(Report.class.getName(), JoinType.LEFT);
			//            cq.select(root);

			/*
			 * select a.id, r.id from assignments as a join reports as r on
			 * r.parent_id=a.id where
			 * a.incoming_id='7a30f159-61ec-4413-8caf-3bdb07d84aae'
			 */

			//            String query = "SELECT a "
			//                    + " FROM " + Assignment.class.getName() + " AS a "
			//                    + " JOIN FETCH a.childAssignments AS ca "
			//                    + " JOIN FETCH a.reports AS r "
			//                    + " WHERE a.incoming.id in :ids "
			//                    + " ORDER BY a.regDate";
			//
			//            TypedQuery<Assignment> q = em.createQuery(query, Assignment.class);
			//            q.setParameter("ids", expandedIds);
			//
			//            List<Assignment> children = q.getResultList();
			//
			//            Supplier<List<IAppEntity>> supplier = LinkedList::new;
			//
			//
			//            children = children.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
			//                    .collect(Collectors.toCollection(IAppEntity.class));
			//
			return result;
		} finally {
			//em.close();
		}
	}
}
