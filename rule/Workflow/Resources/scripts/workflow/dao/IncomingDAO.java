package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.IncomingFilter;
import workflow.dto.IncomingViewEntry;
import workflow.model.Assignment;
import workflow.model.Incoming;
import workflow.model.Report;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class IncomingDAO extends DAO<Incoming, UUID> {

    public IncomingDAO(_Session session) throws DAOException {
        super(Incoming.class, session);
    }

    public ViewPage<IncomingViewEntry> findViewPage(IncomingFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<IncomingViewEntry> cq = cb.createQuery(IncomingViewEntry.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Incoming> root = cq.from(Incoming.class);
            Join atts = root.join("attachments", JoinType.LEFT);

            Predicate condition = null;

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
            }

            if (filter.getSender() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("sender"), filter.getSender()));
                } else {
                    condition = cb.and(cb.equal(root.get("sender"), filter.getSender()), condition);
                }
            }

            if (filter.getAddressee() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("addressee"), filter.getAddressee()));
                } else {
                    condition = cb.and(cb.equal(root.get("addressee"), filter.getAddressee()), condition);
                }
            }

            if (filter.getDocType() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("docType"), filter.getDocType()));
                } else {
                    condition = cb.and(cb.equal(root.get("docType"), filter.getDocType()), condition);
                }
            }

            if (filter.getDocSubject() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("docSubject"), filter.getDocSubject()));
                } else {
                    condition = cb.and(cb.equal(root.get("docSubject"), filter.getDocSubject()), condition);
                }
            }

            cq.select(cb.construct(
                    IncomingViewEntry.class,
                    root.get("id"),
                    root.get("title"),
                    root.get("regNumber"),
                    root.get("appliedRegDate"),
                    root.get("sender").get("name"),
                    root.get("senderRegNumber"),
                    root.get("senderAppliedRegDate"),
                    root.get("addressee").get("name"),
                    root.get("docLanguage").get("locName"),
                    root.get("docType").get("locName"),
                    root.get("docSubject").get("locName"),
                    root.get("body"),
                    cb.count(atts)
            ))
                    .groupBy(root, root.get("sender").get("name"),
                            root.get("addressee").get("name"), root.get("docLanguage"),
                            root.get("docType"), root.get("docSubject"), atts)
                    .orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.count(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<IncomingViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> countQuery = em.createQuery(countRootCq);

            long count = countQuery.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            ViewPage<IncomingViewEntry> vp = new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
//            if (vp.getResult().isEmpty()) {
//                return vp;
//            }
//
//            for (IncomingViewEntry inve : vp.getResult()) {
//                List<IAppEntity<UUID>> responses = findIncomingResponses(incoming, em);
//                if (responses != null && responses.size() > 0) {
//                    incoming.setResponsesCount((long) responses.size());
//                    incoming.setResponses(responses);
//                }
//            }

            return vp;
        } finally {
            em.close();
        }
    }

    private List<IAppEntity<UUID>> findIncomingResponses(Incoming incoming, EntityManager em) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Assignment> cq = cb.createQuery(Assignment.class);
        Root<Assignment> root = cq.from(Assignment.class);
        cq.select(root).distinct(true);

        Predicate condition = cb.equal(root.get("parent"), incoming);
        // condition = cb.and(cb.isEmpty(root.get("parent")), condition);

        if (!user.isSuperUser()) {
            condition = cb.and(root.get("readers").in(user.getId()), condition);
        }

        cq.where(condition);
        cq.orderBy(cb.desc(root.get("regDate")));

        TypedQuery<Assignment> typedQuery = em.createQuery(cq);
        List<Assignment> assignments = typedQuery.getResultList();

//        if (assignments.size() > 0) {
//            for (Assignment assignment : assignments) {
//                List<IAppEntity<UUID>> responses = findAssignmentResponses(assignment, expandedIds, em);
//                if (responses != null && responses.size() > 0) {
//                    assignment.setResponsesCount((long) responses.size());
//                    assignment.setResponses(responses);
//                }
//            }
//            return new ArrayList<>(assignments);
//        }
        return null;
    }

    private List<IAppEntity<UUID>> findAssignmentResponses(Assignment assignment, List<UUID> expandedIds,
                                                           EntityManager em) {
        // --- Assignment
        CriteriaBuilder cba = em.getCriteriaBuilder();
        CriteriaQuery<Assignment> cqa = cba.createQuery(Assignment.class);
        Root<Assignment> rootA = cqa.from(Assignment.class);
        // cqa.select(rootA).distinct(true);
        // UUID id, Date regDate, String title, String body, Long appliedAuthor
        cqa.select(cba.construct(Assignment.class, rootA.get("id"), rootA.get("regDate"), rootA.get("title"),
                rootA.get("body"), rootA.get("appliedAuthor")));

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
        // cqr.select(cba.construct(
        // Report.class,
        // rootR.get("id"),
        // rootR.get("regDate"),
        // rootR.get("title"),
        // rootR.get("body"),
        // rootR.get("appliedAuthor"),
        // rootR.get("appliedRegDate"),
        // cba.count(attCount)));

        Predicate conditionR = cbr.equal(rootR.get("parent"), assignment);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Report.class)) {
            conditionR = cbr.and(rootR.get("readers").in(user.getId()), conditionR);
        }

        cqr.select(rootR).where(conditionR);
        // cqr.groupBy(rootR, rootR.get("appliedAuthor"));
        cqr.orderBy(cbr.desc(rootR.get("regDate")));

        TypedQuery<Report> typedQueryR = em.createQuery(cqr);
        List<Report> reports = typedQueryR.getResultList();

        // --- concat & sort by reg date
        List<IAppEntity<UUID>> result = new LinkedList<>(assignments);
        result.addAll(reports);

        Supplier<List<IAppEntity<UUID>>> supplier = LinkedList::new;
        result = result.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
                .collect(Collectors.toCollection(supplier));

//        if (assignments.size() > 0) {
//            for (Assignment a : assignments) {
//                List<IAppEntity<UUID>> responses = findAssignmentResponses(a, expandedIds, em);
//                if (responses != null && responses.size() > 0) {
//                    a.setResponsesCount((long) responses.size());
//                    a.setResponses(responses);
//                }
//            }
//        }

        return result;
    }
}
