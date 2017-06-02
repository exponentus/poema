package workflow.dao;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import workflow.dao.filter.IncomingFilter;
import workflow.dto.AssignmentViewEntry;
import workflow.dto.IDTO;
import workflow.dto.IncomingViewEntry;
import workflow.model.Assignment;
import workflow.model.Incoming;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

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
                    .distinct(true)
                    .groupBy(root, root.get("sender").get("name"),
                            root.get("addressee").get("name"), root.get("docLanguage").get("locName"),
                            root.get("docType").get("locName"), root.get("docSubject").get("locName"), atts)
                    .orderBy(collectSortOrder(cb, root, sortParams));

            countRootCq.select(cb.countDistinct(root));

            if (condition != null) {
                cq.where(condition);
                countRootCq.where(condition);
            }

            TypedQuery<IncomingViewEntry> typedQuery = em.createQuery(cq);
            TypedQuery<Long> countQuery = em.createQuery(countRootCq);

            long count = countQuery.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            ViewPage<IncomingViewEntry> vp = new ViewPage<>(typedQuery.getResultList(), count, maxPage, pageNum);
            if (vp.getResult().isEmpty()) {
                return vp;
            }

            for (IncomingViewEntry inve : vp.getResult()) {
                Incoming incoming = em.getReference(Incoming.class, inve.id);
                List<IDTO> responses = findIncomingResponses(incoming, em);
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

    private List<IDTO> findIncomingResponses(Incoming incoming, EntityManager em) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<AssignmentViewEntry> cq = cb.createQuery(AssignmentViewEntry.class);
        Root<Assignment> root = cq.from(Assignment.class);

        Predicate condition = cb.equal(root.get("parent"), incoming);

        if (!user.isSuperUser()) {
            condition = cb.and(root.get("readers").in(user.getId()), condition);
        }

        cq.select(cb.construct(
                AssignmentViewEntry.class,
                root.get("id"),
                root.get("appliedAuthor").get("name"),
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

        Predicate conditionA = cba.equal(rootA.get("parent").get("id"), assignment.getId());

        if (!user.isSuperUser()) {
            conditionA = cba.and(rootA.get("readers").in(user.getId()), conditionA);
        }

        cqa.select(cba.construct(
                AssignmentViewEntry.class,
                rootA.get("id"),
                rootA.get("appliedAuthor").get("name"),
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
/*        CriteriaBuilder cbr = em.getCriteriaBuilder();
        CriteriaQuery<Report> cqr = cbr.createQuery(Report.class);
        Root<Report> rootR = cqr.from(Report.class);
        Join attCount = rootR.join("attachments", JoinType.LEFT);

        Predicate conditionR = cbr.equal(rootR.get("parent"), assignment);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Report.class)) {
            conditionR = cbr.and(rootR.get("readers").in(user.getId()), conditionR);
        }

        cqr.select(rootR).where(conditionR);

        cqr.orderBy(cbr.desc(rootR.get("regDate")));

        TypedQuery<Report> typedQueryR = em.createQuery(cqr);
        List<Report> reports = typedQueryR.getResultList();

        // --- concat & sort by reg date
        List<IDto> result = new LinkedList<>(assignments);
        result.addAll(reports);

        Supplier<List<IAppEntity<UUID>>> supplier = LinkedList::new;
        result = result.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
                .collect(Collectors.toCollection(supplier));
*/
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
