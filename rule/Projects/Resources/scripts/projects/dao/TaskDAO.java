package projects.dao;

import com.exponentus.common.dao.ViewEntryDAO;
import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import projects.dao.filter.TaskFilter;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class TaskDAO extends DAO<Task, UUID> {

    public TaskDAO(_Session session) {
        super(Task.class, session);
    }

    public ViewPage<Task> findAllByTaskFilter(TaskFilter filter, int pageNum, int pageSize) {
        return findAll(filter, _SortParams.desc("regDate"), pageNum, pageSize);
    }

    public ViewPage<Task> findAll(TaskFilter filter, _SortParams sortParams, int pageNum, int pageSize) {
        if (filter == null) {
            throw new IllegalArgumentException("filter is null");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Task> cq = cb.createQuery(Task.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Task> taskRoot = cq.from(Task.class);
            cq.select(taskRoot).distinct(true);
            countCq.select(cb.countDistinct(taskRoot));

            Predicate condition = null;

            if (filter.getProject() != null) {
                condition = cb.equal(taskRoot.get("project"), filter.getProject());
            }

            if (filter.getAuthorId() != null) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("author"), filter.getAuthorId());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("author"), filter.getAuthorId()), condition);
                }
            }

            if (filter.getParentTask() != null) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("parent"), filter.getParentTask());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("parent"), filter.getParentTask()), condition);
                }
            } else if (filter.isParentOnly()) {
                if (condition == null) {
                    condition = cb.isEmpty(taskRoot.get("parent"));
                } else {
                    condition = cb.and(cb.isEmpty(taskRoot.get("parent")), condition);
                }
            }

            if (filter.getStatus() != TaskStatusType.UNKNOWN) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("status"), filter.getStatus());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("status"), filter.getStatus()), condition);
                }
            }

            if (filter.getPriority() != TaskPriorityType.UNKNOWN) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("priority"), filter.getPriority());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("priority"), filter.getStatus()), condition);
                }
            }

            if (filter.getTaskType() != null) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("taskType"), filter.getTaskType());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("taskType"), filter.getTaskType()), condition);
                }
            }

            if (filter.getAssigneeUserId() != null) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("assignee"), filter.getAssigneeUserId());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("assignee"), filter.getAssigneeUserId()), condition);
                }
            }

            if (filter.isInitiative() != null) {
                if (condition == null) {
                    condition = cb.equal(taskRoot.get("initiative"), filter.isInitiative());
                } else {
                    condition = cb.and(cb.equal(taskRoot.get("initiative"), filter.isInitiative()), condition);
                }
            }

            if (filter.getTags() != null) {
                if (condition == null) {
                    condition = cb.and(taskRoot.get("tags").in(filter.getTags()));
                } else {
                    condition = cb.and(taskRoot.get("tags").in(filter.getTags()), condition);
                }
            }

            if (filter.hasSearch()) {
                if (condition == null) {
                    condition = cb.and(cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%"));
                } else {
                    condition = cb.and(cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%"),
                            condition);
                }
            }

            if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
                Path<Set<Long>> readers = taskRoot.join("readers", JoinType.LEFT);
                Path<Set<Long>> observers = taskRoot.join("observers", JoinType.LEFT);
                Predicate readCondition = cb.or(readers.in(user.getId()), observers.in(user.getId()));
                if (condition == null) {
                    condition = readCondition;
                } else {
                    condition = cb.and(condition, readCondition);
                }
            }

            if (condition != null) {
                cq.where(condition);
                countCq.where(condition);
            }

            if (sortParams != null && !sortParams.isEmpty()) {
                List<Order> orderBy = new ArrayList<>();
                sortParams.values().forEach((fieldName, direction) -> {
                    if (direction.isAscending()) {
                        orderBy.add(cb.asc(taskRoot.get(fieldName)));
                    } else {
                        orderBy.add(cb.desc(taskRoot.get(fieldName)));
                    }
                });
                cq.orderBy(orderBy);
            }

            TypedQuery<Task> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = 1;
            if (pageNum != 0 || pageSize != 0) {
                maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
                if (pageNum == 0) {
                    pageNum = 1;
                }
                int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
                typedQuery.setFirstResult(firstRec);
                typedQuery.setMaxResults(pageSize);
            }

            //ViewEntryDAO veDao = new ViewEntryDAO();
            List<Task> result = typedQuery.getResultList();
            //for (Task task : result) {
            //task.setDescendantsCount(veDao.getResponsesCount(task.getId()));
            //}

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }

    public ViewPage<Task> findAllWithResponses(TaskFilter filter, _SortParams sortParams, int pageNum, int pageSize,
                                               List<UUID> expandedIds) {
        ViewPage<Task> vp = findAll(filter, sortParams, pageNum, pageSize);

        if (vp.getResult().isEmpty()) {
            return vp;
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();

        try {
            vp.getResult()
                    //.stream()
                    //.map(it -> it) // mark has response
                    //.filter(task -> expandedIds.contains(task.getId()))
                    .forEach(task -> {
                        List<IAppEntity> responses = findTaskResponses(task, expandedIds, em);
                        if (responses != null && responses.size() > 0) {
                            task.setResponsesCount((long) responses.size());
                            task.setResponses(responses);
                        }
                    });
            //});
        } finally {
            em.close();
        }

        return vp;
    }

    private List<IAppEntity> findTaskResponses(Task task, List<UUID> expandedIds, EntityManager em) {
        CriteriaBuilder cbt = em.getCriteriaBuilder();
        CriteriaQuery<Task> cqt = cbt.createQuery(Task.class);
        Root<Task> taskRoot = cqt.from(Task.class);
        cqt.select(taskRoot).distinct(true);

        Predicate conditionA = cbt.equal(taskRoot.get("parent"), task);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Task.class)) {
            conditionA = cbt.and(taskRoot.get("readers").in(user.getId()), conditionA);
        }

        cqt.where(conditionA);
        cqt.orderBy(cbt.desc(taskRoot.get("regDate")));

        TypedQuery<Task> typedQueryT = em.createQuery(cqt);
        List<Task> tasks = typedQueryT.getResultList();

        // -----------------------------------------
        CriteriaBuilder cbr = em.getCriteriaBuilder();
        CriteriaQuery<Request> cqr = cbr.createQuery(Request.class);
        Root<Request> requestRoot = cqr.from(Request.class);
        cqr.select(requestRoot).distinct(true);

        Predicate conditionR = cbr.equal(requestRoot.get("task"), task);

//        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Request.class)) {
//            conditionR = cbr.and(requestRoot.get("readers").in(user.getId()), conditionR);
//        }

        cqr.where(conditionR);
        cqr.orderBy(cbr.desc(requestRoot.get("regDate")));

        TypedQuery<Request> typedQueryR = em.createQuery(cqr);
        List<Request> requests = typedQueryR.getResultList();

        // ---------------------------------------------
        List<IAppEntity> result = new ArrayList<>(tasks);
        result.addAll(requests);

        Supplier<List<IAppEntity>> supplier = LinkedList::new;
        result = result.stream()
                .sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
                .collect(Collectors.toCollection(supplier));

        if (tasks.size() > 0) {
            for (Task t : tasks) {
                //.stream()
                //.filter(it -> expandedIds.contains(it.getId()))
                //.forEach(it -> {
                List<IAppEntity> responses = findTaskResponses(t, expandedIds, em);
                if (responses != null && responses.size() > 0) {
                    t.setResponsesCount((long) responses.size());
                    t.setResponses(responses);
                }
                //});
            }
        }

        return result;
    }

    public ViewPage<Task> findAllWithRespMarked(TaskFilter filter, _SortParams sortParams, int pageNum, int pageSize,
                                                List<UUID> expandedIdList) {
        ViewPage<Task> vp = findAll(filter, sortParams, pageNum, pageSize);
        ViewEntryDAO dao = new ViewEntryDAO(ses);
        for (Task task : vp.getResult()) {
            task.setResponsesCount(dao.getResponsesCount(task.getId()));
        }
        return vp;
    }
}
