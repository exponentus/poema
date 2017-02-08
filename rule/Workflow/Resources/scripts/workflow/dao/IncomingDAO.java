package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.Report;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class IncomingDAO extends DAO<Incoming, UUID> {

    public IncomingDAO(_Session session) throws DAOException {
        super(Incoming.class, session);
    }

    public ViewPage<Incoming> findAllWithResponses(SortParams sortParams, int pageNum, int pageSize,
                                                   List<UUID> expandedIds) {
        ViewPage<Incoming> vp = findViewPage(sortParams, pageNum, pageSize);

        if (vp.getResult().isEmpty()) {
            return vp;
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            for (Incoming incoming : vp.getResult()) {
                List<IAppEntity> responses = findIncomingResponses(incoming, expandedIds, em);
                if (responses != null && responses.size() > 0) {
                    incoming.setResponsesCount((long) responses.size());
                    incoming.setResponses(responses);
                }
            }
        } finally {
            em.close();
        }

        return vp;
    }

    private List<IAppEntity> findIncomingResponses(Incoming incoming, List<UUID> expandedIds, EntityManager em) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Assignment> cq = cb.createQuery(Assignment.class);
        Root<Assignment> root = cq.from(Assignment.class);
        cq.select(root).distinct(true);

        Predicate condition = cb.equal(root.get("incoming"), incoming);
        condition = cb.and(cb.isEmpty(root.get("parent")), condition);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Assignment.class)) {
            condition = cb.and(root.get("readers").in(user.getId()), condition);
        }

        cq.where(condition);
        cq.orderBy(cb.desc(root.get("regDate")));

        TypedQuery<Assignment> typedQuery = em.createQuery(cq);
        List<Assignment> assignments = typedQuery.getResultList();

        if (assignments.size() > 0) {
            for (Assignment assignment : assignments) {
                List<IAppEntity> responses = findAssignmentResponses(assignment, expandedIds, em);
                if (responses != null && responses.size() > 0) {
                    assignment.setResponsesCount((long) responses.size());
                    assignment.setResponses(responses);
                }
            }
            return new ArrayList<>(assignments);
        }
        return null;
    }

    private List<IAppEntity> findAssignmentResponses(Assignment assignment, List<UUID> expandedIds, EntityManager em) {
        // --- Assignment
        CriteriaBuilder cba = em.getCriteriaBuilder();
        CriteriaQuery<Assignment> cqa = cba.createQuery(Assignment.class);
        Root<Assignment> rootA = cqa.from(Assignment.class);
        // cqa.select(rootA).distinct(true);
        // UUID id, Date regDate, String title, String body, Long appliedAuthor
        cqa.select(cba.construct(
                Assignment.class,
                rootA.get("id"),
                rootA.get("regDate"),
                rootA.get("title"),
                rootA.get("body"),
                rootA.get("appliedAuthor")));

        Predicate conditionA = cba.equal(rootA.get("parent"), assignment);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Assignment.class)) {
            conditionA = cba.and(rootA.get("readers").in(user.getId()), conditionA);
        }

        cqa.where(conditionA);
        cqa.orderBy(cba.desc(rootA.get("regDate")));

        TypedQuery<Assignment> typedQueryA = em.createQuery(cqa);
        List<Assignment> assignments = typedQueryA.getResultList();

        // --- Report
        CriteriaBuilder cbr = em.getCriteriaBuilder();
        CriteriaQuery<Report> cqr = cbr.createQuery(Report.class);
        Root<Report> rootR = cqr.from(Report.class);
        Join attCount = rootR.join("attachments", JoinType.LEFT);
        cqr.select(cba.construct(
                Report.class,
                rootR.get("id"),
                rootR.get("regDate"),
                rootR.get("title"),
                rootR.get("body"),
                rootR.get("appliedAuthor"),
                rootR.get("appliedRegDate"),
                cba.count(attCount)));

        Predicate conditionR = cbr.equal(rootR.get("parent"), assignment);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Report.class)) {
            conditionR = cbr.and(rootR.get("readers").in(user.getId()), conditionR);
        }

        cqr.where(conditionR);
        cqr.groupBy(rootR);
        cqr.orderBy(cbr.desc(rootR.get("regDate")));

        TypedQuery<Report> typedQueryR = em.createQuery(cqr);
        List<Report> reports = typedQueryR.getResultList();

        // --- concat & sort by reg date
        List<IAppEntity> result = new LinkedList<>(assignments);
        result.addAll(reports);

        Supplier<List<IAppEntity>> supplier = LinkedList::new;
        result = result.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
                .collect(Collectors.toCollection(supplier));

        if (assignments.size() > 0) {
            for (Assignment a : assignments) {
                List<IAppEntity> responses = findAssignmentResponses(a, expandedIds, em);
                if (responses != null && responses.size() > 0) {
                    a.setResponsesCount((long) responses.size());
                    a.setResponses(responses);
                }
            }
        }

        return result;
    }
}
