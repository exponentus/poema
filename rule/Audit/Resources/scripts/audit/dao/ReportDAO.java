package audit.dao;

import audit.model.Report;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class ReportDAO extends DAO<Report, UUID> {

    public ReportDAO(_Session session) throws DAOException {
        super(Report.class, session);
    }

    public ViewPage<Report> findViewPage() {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Report> cq = cb.createQuery(Report.class);
            Root<Report> root = cq.from(Report.class);

            cq.select(root).distinct(true);
            TypedQuery<Report> typedQuery = em.createQuery(cq);
            List<Report> result = typedQuery.getResultList();

            return new ViewPage<>(result, result.size(), 1, 1);
        } finally {
            em.close();
        }
    }
}
