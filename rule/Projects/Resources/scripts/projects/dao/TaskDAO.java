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
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;

public class TaskDAO extends DAO<Task, UUID> {

    public TaskDAO(_Session session) {
        super(Task.class, session);
    }

    public ViewPage<Task> findSubtasksForTask(Task task, int pageNum, int pageSize) {
        return null;
    }

    public ViewPage<Task> findAllByTaskFilter(TaskFilter filter, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Task> cq = cb.createQuery(entityClass);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Task> c = cq.from(entityClass);
            cq.select(c);
            countCq.select(cb.count(c));

            Predicate condition = null;

            if (filter.getProject() != null) {
                condition = cb.equal(c.get("project"), filter.getProject());
            }

            if (filter.getAuthorId() != null) {
                if (condition == null) {
                    condition = cb.equal(c.get("author"), filter.getAuthorId());
                } else {
                    condition = cb.and(cb.equal(c.get("author"), filter.getAuthorId()), condition);
                }
            }

            if (filter.getParentTask() != null) {
                if (condition == null) {
                    condition = cb.equal(c.get("parent"), filter.getParentTask());
                } else {
                    condition = cb.and(cb.equal(c.get("parent"), filter.getParentTask()), condition);
                }
            } else if (filter.isParentOnly()) {
                if (condition == null) {
                    condition = cb.isEmpty(c.get("parent"));
                } else {
                    condition = cb.and(cb.isEmpty(c.get("parent")), condition);
                }
            }

            if (filter.getStatus() != TaskStatusType.UNKNOWN) {
                if (condition == null) {
                    condition = cb.equal(c.get("status"), filter.getStatus());
                } else {
                    condition = cb.and(cb.equal(c.get("status"), filter.getStatus()), condition);
                }
            }

            if (filter.getPriority() != TaskPriorityType.UNKNOWN) {
                if (condition == null) {
                    condition = cb.equal(c.get("priority"), filter.getPriority());
                } else {
                    condition = cb.and(cb.equal(c.get("priority"), filter.getStatus()), condition);
                }
            }

            if (filter.getTaskType() != null) {
                if (condition == null) {
                    condition = cb.equal(c.get("taskType"), filter.getTaskType());
                } else {
                    condition = cb.and(cb.equal(c.get("taskType"), filter.getTaskType()), condition);
                }
            }

            if (filter.getAssigneeUserId() != null) {
                if (condition == null) {
                    condition = cb.equal(c.get("assignee"), filter.getAssigneeUserId());
                } else {
                    condition = cb.and(cb.equal(c.get("assignee"), filter.getAssigneeUserId()), condition);
                }
            }

            if (filter.getTags() != null) {
                if (condition == null) {
                    condition = cb.and(c.get("tags").in(filter.getTags()));
                } else {
                    condition = cb.and(c.get("tags").in(filter.getTags()), condition);
                }
            }

            if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
                if (condition == null) {
                    condition = cb.and(c.get("readers").in(user.getId()));
                } else {
                    condition = cb.and(c.get("readers").in(user.getId()), condition);
                }
            }

            cq.orderBy(cb.asc(c.get("regDate")));
            if (condition != null) {
                cq.where(condition);
                countCq.where(condition);
            }

            TypedQuery<Task> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
            if (pageNum == 0) {
                pageNum = maxPage;
            }
            int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
            typedQuery.setFirstResult(firstRec);
            typedQuery.setMaxResults(pageSize);
            List<Task> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
