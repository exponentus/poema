package workflow.dao;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import staff.model.Employee;
import workflow.model.ActionableDocument;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.UUID;

public class ActionableDocumentDAO extends DAO<ActionableDocument, UUID> {

    public ActionableDocumentDAO(_Session session) throws DAOException {
        super(ActionableDocument.class, session);
    }

    public ActionableDocumentDAO(AppEnv appEnv, _Session ses) throws DAOException {
        super(ActionableDocument.class, appEnv, ses);
    }

    public ViewPage<ActionableDocument> findProjectsViewPageByAuthor(Employee author, SortParams sortParams, int pageNum, int pageSize) {
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

//            cq.select(cb.construct(AssignmentViewEntry.class, root.get("id"), root.get("appliedAuthor").get("name"),
//                    root.get("body"), root.get("controlType"), root.get("startDate"), root.get("dueDate"),
//                    root.get("status"))).orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.count(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

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
