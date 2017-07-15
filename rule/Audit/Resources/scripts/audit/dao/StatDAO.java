package audit.dao;

import audit.dto.StatInspectorDTO;
import audit.dto.StatObsStatusDTO;
import audit.model.Observation;
import com.exponentus.common.dao.DAO;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting._Session;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class StatDAO extends DAO<Observation, UUID> {

    public StatDAO(_Session session) throws DAOException {
        super(Observation.class, session);
    }

    public List<StatObsStatusDTO> findStatDataByObsStatus() {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<StatObsStatusDTO> cq = cb.createQuery(StatObsStatusDTO.class);
            Root<Observation> root = cq.from(Observation.class);

            cq.select(cb.construct(StatObsStatusDTO.class, root.get("status"), cb.count(root)))
                    .groupBy(root.get("status"));

            TypedQuery<StatObsStatusDTO> typedQueryR = em.createQuery(cq);
            return typedQueryR.getResultList();
        } finally {
            em.close();
        }
    }

    public List<StatInspectorDTO> findStatInspector() {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<StatInspectorDTO> cq = cb.createQuery(StatInspectorDTO.class);
            Root<Observation> root = cq.from(Observation.class);

            List<Order> orderBy = new ArrayList<>();
            orderBy.add(cb.asc(root.get("author").get("login")));
            orderBy.add(cb.asc(root.get("status")));

            cq.select(
                    cb.construct(
                            StatInspectorDTO.class,
                            root.get("author").get("login"),
                            root.get("status"),
                            cb.count(root))
            )
                    .groupBy(root.get("author").get("login"), root.get("status"))
                    .orderBy(orderBy);

            TypedQuery<StatInspectorDTO> typedQueryR = em.createQuery(cq);
            return typedQueryR.getResultList();
        } finally {
            em.close();
        }
    }
}
