package projects.dao;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class TaskDAO extends DAO<Task, UUID> {

    public TaskDAO(_Session session) {
        super(Task.class, session);
    }

    public ViewPage<Task> findAllByTaskFilter(TaskFilter filter, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Task> cq = cb.createQuery(Task.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Task> taskRoot = cq.from(Task.class);
            cq.select(taskRoot);
            countCq.select(cb.count(taskRoot));

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
                    condition = cb.and(cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%"), condition);
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
            cq.orderBy(cb.asc(taskRoot.get("regDate")));

            TypedQuery<Task> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = 1;
            if (pageNum != 0 || pageSize != 0) {
                maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
                if (pageNum == 0) {
                    pageNum = maxPage;
                }
                int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
                typedQuery.setFirstResult(firstRec);
                typedQuery.setMaxResults(pageSize);
            }

            List<Task> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }

    public List<Object> findTaskStream(Task task) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            String jpql = "SELECT t, r, c FROM Task t LEFT JOIN t.requests r LEFT JOIN t.comments c WHERE t.parent = :parentTask";
            TypedQuery<Object> query = em.createQuery(jpql, Object.class);
            query.setParameter("parentTask", task);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
}
