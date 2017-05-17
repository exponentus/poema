package resourcereservations.dao;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import resourcereservations.dao.filter.ApplicationFilter;
import resourcereservations.model.ApplicationForMeetingRoom;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class ApplicationForMeetingRoomDAO extends DAO<ApplicationForMeetingRoom, UUID> {

    public ApplicationForMeetingRoomDAO(_Session session) throws DAOException {
        super(ApplicationForMeetingRoom.class, session);
    }

    public ApplicationForMeetingRoomDAO(EntityManagerFactory emf) {
        super(ApplicationForMeetingRoom.class, emf);
    }

    public ViewPage<ApplicationForMeetingRoom> findViewPage(ApplicationFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        if (filter == null) {
            throw new IllegalArgumentException("filter is null");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<ApplicationForMeetingRoom> cq = cb.createQuery(ApplicationForMeetingRoom.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<ApplicationForMeetingRoom> root = cq.from(ApplicationForMeetingRoom.class);

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

            if (filter.getRoom() != null) {
                if (condition == null) {
                    condition = cb.equal(root.get("room"), filter.getRoom());
                } else {
                    condition = cb.and(cb.equal(root.get("room"), filter.getRoom()), condition);
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

            TypedQuery<ApplicationForMeetingRoom> typedQuery = em.createQuery(cq);
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
            List<ApplicationForMeetingRoom> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
