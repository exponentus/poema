package workflow.dao;

import java.util.UUID;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.log.Lg;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;

import staff.model.Employee;
import workflow.model.ActionableDocument;
import workflow.model.constants.ApprovalStatusType;

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

    public ViewPage<ActionableDocument> findApprovalPendingByCurrentEmployeeViewPage(Employee emp, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            try {
                Query countQ = em.createQuery(
                        "SELECT count(ad.id) FROM ActionableDocument ad JOIN ad.blocks b JOIN b.approvers a " +
                                "WHERE b.status =:s AND a.isCurrent =:ic AND a.employee=:e").
                        setParameter("s", ApprovalStatusType.PENDING).
                        setParameter("ic", true).
                        setParameter("e",emp);
                long count = (long)countQ.getSingleResult();
                int maxPage = 1;
                int firstRec = 0;
                if (pageNum != 0 || pageSize != 0) {
                    maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
                    if (pageNum < 0) {
                        pageNum = 1;
                    }
                    firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
                }
                Query q = em.createQuery(
                        "SELECT ad FROM ActionableDocument ad JOIN ad.blocks b JOIN b.approvers a " +
                                "WHERE b.status =:s AND a.isCurrent =:ic AND a.employee=:e").
                        setParameter("s", ApprovalStatusType.PENDING).
                        setParameter("ic", true).
                        setParameter("e",emp).
                        setMaxResults(pageSize).setFirstResult(firstRec);


                return new ViewPage<>(q.getResultList(), count, maxPage, pageNum);
            } catch (NonUniqueResultException e) {
                e.printStackTrace();
            } catch (NoResultException e) {

            }
        } catch (Exception e) {
            Lg.exception(e);
        } finally {
            em.close();
        }
        return null;

    }

   public ViewPage<ActionableDocument> findApprovalPendingByCurrentEmployeeViewPage1(Employee emp, SortParams sortParams, int pageNum,
                                                                                     int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<ActionableDocument> cq = cb.createQuery(ActionableDocument.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<ActionableDocument> root = cq.from(ActionableDocument.class);


            Predicate condition = cb.and(cb.isTrue(root.get("blocks").get("approvers").get("isCurrent")),
                    cb.equal(root.get("blocks").get("approvers").get("employee"), emp));

            condition = cb.and(cb.equal(root.get("blocks").get("status"), ApprovalStatusType.PENDING), condition);

            if (!user.isSuperUser()) {
                condition = cb.and(cb.and(root.get("readers").in(user.getId())), condition);
            }

            countRootCq.select(cb.countDistinct(root));

            cq.where(condition).distinct(true);
            countRootCq.where(condition);

            cq.orderBy(collectSortOrder(cb, root, sortParams));

            TypedQuery<ActionableDocument> typedQuery = em.createQuery(cq);
            TypedQuery<Long> countQuery = em.createQuery(countRootCq);

            System.out.println("SQL=" + getSQL(em, typedQuery));

            long count = countQuery.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            return new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
