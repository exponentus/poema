package workflow.dao;

import com.exponentus.common.dao.DAO;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.OutgoingFilter;
import workflow.dto.AssignmentViewEntry;
import workflow.dto.IDTO;
import workflow.dto.OutgoingViewEntry;
import workflow.dto.ReportViewEntry;
import workflow.model.Assignment;
import workflow.model.Outgoing;
import workflow.model.Report;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

public class OutgoingDAO extends DAO<Outgoing, UUID> {

    public OutgoingDAO(_Session session) throws DAOException {
        super(Outgoing.class, session);
    }

    public ViewPage<OutgoingViewEntry> findViewPage(OutgoingFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<OutgoingViewEntry> cq = cb.createQuery(OutgoingViewEntry.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Outgoing> root = cq.from(Outgoing.class);
            Join atts = root.join("attachments", JoinType.LEFT);

            Predicate condition = null;

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
            }

            if (filter.getApprovalStatus() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("status"), filter.getApprovalStatus()));
                } else {
                    condition = cb.and(cb.equal(root.get("status"), filter.getApprovalStatus()), condition);
                }
            }

            if (filter.getApprovalResult() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("result"), filter.getApprovalResult()));
                } else {
                    condition = cb.and(cb.equal(root.get("result"), filter.getApprovalResult()), condition);
                }
            }

            if (filter.getRecipient() != null) {
                if (condition == null) {
                    condition = cb.and(cb.equal(root.get("recipient"), filter.getRecipient()));
                } else {
                    condition = cb.and(cb.equal(root.get("recipient"), filter.getRecipient()), condition);
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
                    OutgoingViewEntry.class,
                    root.get("id"),
                    root.get("status"),
                    root.get("result"),
                    root.get("title"),
                    root.get("regNumber"),
                    root.get("appliedRegDate"),
                    root.get("recipient").get("name"),
                    root.get("docLanguage").get("locName"),
                    root.get("docType").get("locName"),
                    root.get("docSubject").get("locName"),
                    root.get("body"),
                    cb.count(atts)
            ))
                    .distinct(true)
                    .groupBy(root, root.get("recipient").get("name"), root.get("docLanguage").get("locName"),
                            root.get("docType").get("locName"), root.get("docSubject").get("locName"), atts)
                    .orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.countDistinct(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<OutgoingViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> query = em.createQuery(countRootCq);

            long count = query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            ViewPage<OutgoingViewEntry> vp = new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
            if (vp.getResult().isEmpty()) {
                return vp;
            }

            for (OutgoingViewEntry ove : vp.getResult()) {
                Outgoing _outgoing = em.getReference(Outgoing.class, ove.id);
                List<IDTO> responses = findResponses(_outgoing, em);
                if (responses != null && responses.size() > 0) {
                    ove.setResponsesCount((long) responses.size());
                    ove.setResponses(responses);
                }
            }

            return vp;
        } finally {
            em.close();
        }
    }

    public ViewPage<OutgoingViewEntry> findResponsesViewPage(Outgoing outgoing) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<OutgoingViewEntry> cq = cb.createQuery(OutgoingViewEntry.class);
            CriteriaQuery<Long> countRootCq = cb.createQuery(Long.class);
            Root<Outgoing> root = cq.from(Outgoing.class);
            Join atts = root.join("attachments", JoinType.LEFT);

            Predicate condition = cb.equal(root, outgoing);

            if (!user.isSuperUser()) {
                condition = cb.and(root.get("readers").in(user.getId()));
            }

            cq.select(cb.construct(
                    OutgoingViewEntry.class,
                    root.get("id"),
                    root.get("status"),
                    root.get("result"),
                    root.get("title"),
                    root.get("regNumber"),
                    root.get("appliedRegDate"),
                    root.get("recipient").get("name"),
                    root.get("docLanguage").get("locName"),
                    root.get("docType").get("locName"),
                    root.get("docSubject").get("locName"),
                    root.get("body"),
                    cb.count(atts)
            ))
                    .distinct(true)
                    .groupBy(root, root.get("recipient").get("name"), root.get("docLanguage").get("locName"),
                            root.get("docType").get("locName"), root.get("docSubject").get("locName"), atts);

            countRootCq.select(cb.countDistinct(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<OutgoingViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> countQuery = em.createQuery(countRootCq);

            long count = countQuery.getSingleResult();

            ViewPage<OutgoingViewEntry> vp = new ViewPage<>(typedQuery.getResultList(), count, 0, 0);
            if (vp.getResult().isEmpty()) {
                return vp;
            }

            for (OutgoingViewEntry inve : vp.getResult()) {
                Outgoing _outgoing = em.getReference(Outgoing.class, inve.id);
                List<IDTO> responses = findResponses(_outgoing, em);
                if (responses != null && responses.size() > 0) {
                    inve.setResponsesCount((long) responses.size());
                    inve.setResponses(responses);
                }
            }

            return vp;
        } finally {
            em.close();
        }
    }

    private List<IDTO> findResponses(Outgoing outgoing, EntityManager em) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<AssignmentViewEntry> cq = cb.createQuery(AssignmentViewEntry.class);
        Root<Assignment> root = cq.from(Assignment.class);

        Predicate condition = cb.equal(root.get("primary"), outgoing);
        condition = cb.and(cb.isNull(root.get("parent")), condition);

        if (!user.isSuperUser()) {
            condition = cb.and(root.get("readers").in(user.getId()), condition);
        }

        cq.select(cb.construct(
                AssignmentViewEntry.class,
                root.get("id"),
                root.get("appliedAuthor").get("name"),
                root.get("title"),
                root.get("body"),
                root.get("controlType").get("locName"),
                root.get("startDate"),
                root.get("dueDate"),
                root.get("status")
        ))
                .distinct(true)
                .where(condition)
                .groupBy(root, root.get("appliedAuthor").get("name"), root.get("controlType").get("locName"))
                .orderBy(cb.desc(root.get("regDate")));

        TypedQuery<AssignmentViewEntry> typedQuery = em.createQuery(cq);
        List<AssignmentViewEntry> assignments = typedQuery.getResultList();

        if (assignments.size() > 0) {
            for (AssignmentViewEntry ave : assignments) {
                Assignment assignment = em.getReference(Assignment.class, ave.id);
                List<IDTO> responses = findAssignmentResponses(assignment, em);
                if (responses != null && responses.size() > 0) {
                    ave.setResponsesCount((long) responses.size());
                    ave.setResponses(responses);
                }
            }
            return new ArrayList<>(assignments);
        }
        return null;
    }

    private List<IDTO> findAssignmentResponses(Assignment assignment, EntityManager em) {
        // --- Assignment
        CriteriaBuilder cba = em.getCriteriaBuilder();
        CriteriaQuery<AssignmentViewEntry> cqa = cba.createQuery(AssignmentViewEntry.class);
        Root<Assignment> rootA = cqa.from(Assignment.class);

        Predicate conditionA = cba.equal(rootA.get("parent"), assignment);

        if (!user.isSuperUser()) {
            conditionA = cba.and(rootA.get("readers").in(user.getId()), conditionA);
        }

        cqa.select(cba.construct(
                AssignmentViewEntry.class,
                rootA.get("id"),
                rootA.get("appliedAuthor").get("name"),
                rootA.get("title"),
                rootA.get("body"),
                rootA.get("controlType").get("locName"),
                rootA.get("startDate"),
                rootA.get("dueDate"),
                rootA.get("status")
        ))
                .distinct(true)
                .where(conditionA)
                .groupBy(rootA, rootA.get("appliedAuthor").get("name"), rootA.get("controlType").get("locName"))
                .orderBy(cba.desc(rootA.get("regDate")));

        TypedQuery<AssignmentViewEntry> typedQueryA = em.createQuery(cqa);
        List<AssignmentViewEntry> assignmentsVE = typedQueryA.getResultList();

        List<IDTO> result = new LinkedList<>(assignmentsVE);

        // --- Report
        CriteriaBuilder cbr = em.getCriteriaBuilder();
        CriteriaQuery<ReportViewEntry> cqr = cbr.createQuery(ReportViewEntry.class);
        Root<Report> rootR = cqr.from(Report.class);
        Join reportAtts = rootR.join("attachments", JoinType.LEFT);

        Predicate conditionR = cbr.equal(rootR.get("parent"), assignment);

        if (!user.isSuperUser()) {
            conditionR = cbr.and(rootR.get("readers").in(user.getId()), conditionR);
        }

        cqr.select(cbr.construct(
                ReportViewEntry.class,
                rootR.get("id"),
                rootR.get("appliedAuthor").get("name"),
                rootR.get("title"),
                rootR.get("appliedRegDate"),
                rootR.get("body"),
                cbr.count(reportAtts)
        ))
                .distinct(true)
                .where(conditionR)
                .groupBy(rootR, rootR.get("appliedAuthor").get("name"), reportAtts)
                .orderBy(cbr.desc(rootR.get("regDate")));

        cqr.orderBy(cbr.desc(rootR.get("regDate")));

        TypedQuery<ReportViewEntry> typedQueryR = em.createQuery(cqr);
        List<ReportViewEntry> reports = typedQueryR.getResultList();

        // --- concat & sort by reg date
        result.addAll(reports);

//        Supplier<List<IAppEntity<UUID>>> supplier = LinkedList::new;
//        result = result.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
//                .collect(Collectors.toCollection(supplier));

        if (assignmentsVE.size() > 0) {
            for (AssignmentViewEntry ave : assignmentsVE) {
                Assignment a = em.getReference(Assignment.class, ave.id);
                List<IDTO> responses = findAssignmentResponses(a, em);
                if (responses != null && responses.size() > 0) {
                    ave.setResponsesCount((long) responses.size());
                    ave.setResponses(responses);
                }
            }
        }

        return result;
    }
}
