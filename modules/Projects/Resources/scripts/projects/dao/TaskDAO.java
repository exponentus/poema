package projects.dao;

import administrator.dao.CollationDAO;
import com.exponentus.common.dao.DAO;
import com.exponentus.common.dto.converter.ExtConverter;
import com.exponentus.common.model.SecureAppEntity;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.constants.PriorityType;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.common.model.embedded.Reader;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.exception.DAOExceptionType;
import com.exponentus.dataengine.jpa.IAppEntity;
import com.exponentus.dataengine.jpa.ISecureAppEntity;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import com.exponentus.user.SuperUser;
import com.exponentus.util.TimeUtil;
import org.apache.poi.ss.formula.functions.T;
import org.eclipse.persistence.config.HintValues;
import org.eclipse.persistence.config.QueryHints;
import projects.dao.filter.TaskFilter;
import projects.dto.converter.TaskDtoConverter;
import projects.dto.stat.CountStat;
import projects.model.Request;
import projects.model.Task;

import javax.persistence.*;
import javax.persistence.criteria.*;
import java.sql.Timestamp;
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class TaskDAO extends DAO<Task, UUID> {

    public TaskDAO(_Session session) throws DAOException {
        super(Task.class, session);
    }

    public List<Task> findAllByTaskFilter(TaskFilter filter) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Task> cq = cb.createQuery(Task.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Task> taskRoot = cq.from(Task.class);

            Predicate condition = getCondition(filter, cb, taskRoot);

            cq.select(taskRoot).distinct(true).orderBy(collectSortOrder(cb, taskRoot, SortParams.desc("regDate")));
            countCq.select(cb.countDistinct(taskRoot));

            if (condition != null) {
                cq.where(condition);
                countCq.where(condition);
            }

            TypedQuery<Task> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);

            //TODO to test
            typedQuery.setHint(QueryHints.READ_ONLY, HintValues.TRUE);
            query.setHint(QueryHints.READ_ONLY, HintValues.TRUE);

            return typedQuery.getResultList();
        } finally {
            em.close();
        }
    }

    public ViewPage<Task> findViewPage(TaskFilter filter, SortParams sortParams, int pageNum, int pageSize) {
        if (filter == null) {
            throw new IllegalArgumentException("filter is null");
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Task> cq = cb.createQuery(Task.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Task> taskRoot = cq.from(Task.class);

            Predicate condition = getCondition(filter, cb, taskRoot);

            cq.select(taskRoot).distinct(true).orderBy(collectSortOrder(cb, taskRoot, sortParams));
            countCq.select(cb.countDistinct(taskRoot));


            if (condition != null) {
                cq.where(condition);
                countCq.where(condition);
            }

            TypedQuery<Task> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);

            //TODO to test
            typedQuery.setHint(QueryHints.READ_ONLY, HintValues.TRUE);
            query.setHint(QueryHints.READ_ONLY, HintValues.TRUE);

            long count = (long) query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            TaskDtoConverter dtoConverter = new TaskDtoConverter(user);
            List<Task> result = dtoConverter.convert(typedQuery.getResultList());

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }

    public ViewPage<Task> findAllWithResponses(TaskFilter filter, SortParams sortParams, int pageNum, int pageSize,
                                               List<UUID> expandedIds) {
        ViewPage<Task> vp = findViewPage(filter, sortParams, pageNum, pageSize);

        if (vp.getResult().isEmpty() || !filter.isTreeMode()) {
            return vp;
        }

        EntityManager em = getEntityManagerFactory().createEntityManager();

        try {
            vp.getResult().forEach(task -> {
                List<IAppEntity<UUID>> responses = findTaskResponses(task, filter, expandedIds, em);
                if (responses != null && responses.size() > 0) {
                    task.setResponsesCount((long) responses.size());
                    task.setResponses(responses);
                }
            });
        } finally {
            em.close();
        }

        return vp;
    }

    public ViewPage<Task> findTaskExecution(Task task) {
        List<Task> list = new ArrayList<>();
        list.add(task);
        task.setWasRead(ExtConverter.checkReadingState(user, task.getReaders()));
        ViewPage<Task> vp = new ViewPage(list, 1, 1, 1);

        EntityManager em = getEntityManagerFactory().createEntityManager();

        try {
            List<IAppEntity<UUID>> responses = findTaskResponses(task, null, null, em);
            if (responses != null && responses.size() > 0) {
                task.setResponsesCount((long) responses.size());
                task.setResponses(responses);
            }
        } finally {
            em.close();
        }

        return vp;
    }

    private List<IAppEntity<UUID>> findTaskResponses(Task task, TaskFilter filter, List<UUID> expandedIds, EntityManager em) {

        List<Task> tasks;

        // Task
        CriteriaBuilder cbt = em.getCriteriaBuilder();
        CriteriaQuery<Task> cqt = cbt.createQuery(Task.class);
        Root<Task> taskRoot = cqt.from(Task.class);
        cqt.select(taskRoot).distinct(true);

        Predicate conditionA = cbt.equal(taskRoot.get("parent"), task);

        if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Task.class)) {
            MapJoin<T, Long, Reader> mapJoin = taskRoot.joinMap("readers");
            conditionA = cbt.and(cbt.equal(mapJoin.key(), user.getId()), conditionA);
            // conditionA = cbt.and(taskRoot.get("readers").in(user.getId()), conditionA);
        }

        cqt.where(conditionA);
        cqt.orderBy(cbt.desc(taskRoot.get("regDate")));

        TypedQuery<Task> typedQueryT = em.createQuery(cqt);
        TaskDtoConverter dtoConverter = new TaskDtoConverter(user);
        tasks = dtoConverter.convert(typedQueryT.getResultList());

        // Request
        CriteriaBuilder cbr = em.getCriteriaBuilder();
        CriteriaQuery<Request> cqr = cbr.createQuery(Request.class);
        Root<Request> requestRoot = cqr.from(Request.class);
        Join attCount = requestRoot.join("attachments", JoinType.LEFT);
        cqr.select(requestRoot).distinct(true);
        // TODO does not worked if choose hierarchy view
        /*
         * cqr.select(cbr.construct(Request.class, requestRoot.get("regDate"),
         * requestRoot.get("author"),cbr.construct(ReportQueryType.class,
         * requestRoot.get("requestType").get("name"),
         * requestRoot.get("requestType").get("locName")),
         * requestRoot.get("resolution"), requestRoot.get("resolutionTime"),
         * requestRoot.get("decisionComment"), requestRoot.get("comment"),
         * cbr.count(attCount)));
         */

        Predicate conditionR = cbr.equal(requestRoot.get("task"), task);

        cqr.where(conditionR);
        // cqr.groupBy(requestRoot);
        cqr.orderBy(cbr.desc(requestRoot.get("regDate")));

        TypedQuery<Request> typedQueryR = em.createQuery(cqr);
        List<Request> requests = typedQueryR.getResultList();

        // ---------------------------------------------
        List<IAppEntity<UUID>> result = new ArrayList<>(tasks);
        result.addAll(requests);

        Supplier<List<IAppEntity<UUID>>> supplier = LinkedList::new;
        result = result.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
                .collect(Collectors.toCollection(supplier));

        if (tasks.size() > 0) {
            for (Task t : tasks) {
                List<IAppEntity<UUID>> responses = findTaskResponses(t, filter, expandedIds, em);
                if (responses != null && responses.size() > 0) {
                    t.setResponsesCount((long) responses.size());
                    t.setResponses(responses);
                }
            }
        }

        return result;
    }

    public ViewPage<Task> findAssignedToUser(Date startDate, Date endDate, IUser user, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Task> cq = cb.createQuery(Task.class);
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            Root<Task> root = cq.from(Task.class);

            ParameterExpression<Date> from = cb.parameter(Date.class);
            ParameterExpression<Date> to = cb.parameter(Date.class);
            Predicate startPredicate = cb.greaterThanOrEqualTo(root.<Date>get("regDate"), from);
            Predicate endPredicate = cb.lessThanOrEqualTo(root.<Date>get("regDate"), to);
            Predicate periodCondition = cb.and(startPredicate, endPredicate);

            Predicate condition = cb.equal(root.get("assignee"), user.getId());
            condition = cb.and(condition, periodCondition);

            cq.select(root).orderBy(cb.asc(root.get("priority")));
            countCq.select(cb.count(root));

            cq.where(condition);
            countCq.where(condition);

            TypedQuery<Task> typedQuery = em.createQuery(cq);
            Query query = em.createQuery(countCq);
            typedQuery.setParameter(from, startDate, TemporalType.DATE);
            typedQuery.setParameter(to, endDate, TemporalType.DATE);
            query.setParameter(from, startDate, TemporalType.DATE);
            query.setParameter(to, endDate, TemporalType.DATE);
            long count = (long) query.getSingleResult();
            int maxPage = pageable(typedQuery, count, pageNum, pageSize);

            List<Task> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }

    public List<CountStat<Timestamp>> getCountByStatus(Date from, Date to, String periodType, String userType, List<IUser> users, StatusType... statusTypes) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        StringJoiner userChunk = new StringJoiner(" OR ");
        for (IUser u : users) {
            userChunk.add("t." + userType + "=" + u.getId());
        }

        StringJoiner statusChunk = new StringJoiner(" OR ");
        for (StatusType s : statusTypes) {
            statusChunk.add("s.status=" + s.getCode());
        }

        try {
            String sql = new StringBuilder()
                    .append("SELECT date_trunc('" + periodType + "', stage_time) AS \"" + periodType + "\" , count(*) AS \"count\" ")
                    .append("FROM prj__task_stages s WHERE (").append(statusChunk.toString()).append(") ")
                    .append("AND s.stage_time >= '" + TimeUtil.dateToPGString(from) + "' ")
                    .append("AND s.stage_time <= '" + TimeUtil.dateToPGString(to) + "' ")
                    .append("AND s.task_id IN (SELECT t.id FROM prj__tasks t, prj__task_readers r WHERE t.id = r.entity_id AND (")
                    .append(userChunk.toString())
                    .append(")) GROUP BY 1 ORDER BY 1;").toString();
            Query q = em.createNativeQuery(sql);

            List<CountStat<Timestamp>> result = new ArrayList<>();
            List<Object[]> objs = q.getResultList();
            for (Object[] obj : objs) {
                result.add(new CountStat((Timestamp) obj[0], (long) obj[1]));
            }

            return result;
        } finally {
            em.close();
        }
    }

    public List<CountStat> getTaskStatusStats() {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<CountStat> cq = cb.createQuery(CountStat.class);
            Root<Task> root = cq.from(Task.class);

            Predicate condition = null;

            if (!user.isSuperUser()) {
                MapJoin<T, Long, Reader> readers = root.joinMap("readers", JoinType.LEFT);
                condition = readers.key().in(user.getId());
            }

            cq.select(cb.construct(CountStat.class, root.get("status"), cb.count(root.get("status")))).groupBy(root.get("status"));

            if (condition != null) {
                cq.where(condition);
            }

            TypedQuery<CountStat> typedQuery = em.createQuery(cq);
            return typedQuery.getResultList();
        } finally {
            em.close();
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public void delete(Task entity) throws SecureException, DAOException {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        try {
            if (!user.isSuperUser()) {
                boolean isEditor = false;
                if (SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
                    ISecureAppEntity<UUID> se = (ISecureAppEntity<UUID>) entity;
                    Iterator<Long> it = se.getEditors().iterator();
                    while (it.hasNext()) {
                        if (it.next().longValue() == user.getId().longValue()) {
                            isEditor = true;
                            break;
                        }
                    }
                }
                if (!isEditor) {
                    throw new SecureException(Environment.getAppEnvByAlias(Task.class.getCanonicalName()).appName,
                            "deleting_is_restricted", ses.getLang());
                }
            } else {
                Server.logger.warning("it is going to delete behalf " + SuperUser.USER_NAME + " " + entity.toString());
             /*   Query q = em.createNativeQuery("SELECT a.firstname, a.lastname FROM Author a");
                int authors = q.executeUpdate();
                DELETE FROM prj__task_readers WHERE task_id IN (SELECT id FROM prj__tasks where reg_number = 'doc17');
                DELETE FROM prj__task_tags WHERE task_id IN (SELECT id FROM prj__tasks where reg_number = 'doc17');
                DELETE FROM prj__tasks__blocks WHERE task_id IN (SELECT id FROM prj__tasks where reg_number = 'doc17');
                DELETE FROM prj__tasks_wf__blocks WHERE task_id IN (SELECT id FROM prj__tasks where reg_number = 'doc17');
                DELETE FROM prj__tasks where reg_number = 'doc17'*/
            }


            EntityTransaction t = em.getTransaction();
            try {
                t.begin();
                entity = em.merge(entity);
                em.remove(entity);
                if (Environment.integrationHubEnable) {
                    CollationDAO collationDAO = new CollationDAO(ses);
                    try {
                        collationDAO.delete(entity.getId());
                    } catch (DAOException e) {
                        if (e.getType() != DAOExceptionType.ENTITY_NOT_FOUND) {
                            throw e;
                        }
                    }
                }
                t.commit();
            } catch (PersistenceException e) {
                throw new DAOException(e);
            } finally {
                if (t.isActive()) {
                    t.rollback();
                }
            }
        } finally {
            em.close();
        }
    }

    private Predicate getCondition(TaskFilter filter, CriteriaBuilder cb, Root<Task> taskRoot){

        Predicate condition = null;

        if (filter.getProject() != null) {
            condition = cb.equal(taskRoot.get("project"), filter.getProject());
        }

        if (filter.getAuthor() != null) {
            if (condition == null) {
                condition = cb.equal(taskRoot.get("author"), filter.getAuthor());
            } else {
                condition = cb.and(cb.equal(taskRoot.get("author"), filter.getAuthor()), condition);
            }
        }

        if (filter.getStatus() != StatusType.UNKNOWN) {
            if (condition == null) {
                condition = cb.equal(taskRoot.get("status"), filter.getStatus());
            } else {
                condition = cb.and(cb.equal(taskRoot.get("status"), filter.getStatus()), condition);
            }
        }

        if (filter.getPriority() != PriorityType.UNKNOWN) {
            if (condition == null) {
                condition = cb.equal(taskRoot.get("priority"), filter.getPriority());
            } else {
                condition = cb.and(cb.equal(taskRoot.get("priority"), filter.getPriority()), condition);
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

        if (filter.isModerate()) {
            Expression<ApprovalStatusType> status = taskRoot.<Collection<Block>>get("blocks").<ApprovalStatusType>get("status");
            Predicate predicate = cb.equal(status, ApprovalStatusType.PENDING);
            if (condition == null) {
                condition = cb.and(predicate);
            } else {
                condition = cb.and(predicate, condition);
            }
        }

        if (filter.hasSearch()) {
            if (condition == null) {
                condition = cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%");
            } else {
                condition = cb.and(cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%"), condition);
            }
        }

        //
        if (filter.getParentTask() != null) {
            if (condition == null) {
                condition = cb.equal(taskRoot.get("parent"), filter.getParentTask());
            } else {
                condition = cb.and(cb.equal(taskRoot.get("parent"), filter.getParentTask()), condition);
            }
        } else if (filter.isTreeMode() || filter.isParentOnly()) {
            if (condition == null) {
                condition = cb.isEmpty(taskRoot.get("parent"));
            } else {
                condition = cb.and(cb.isEmpty(taskRoot.get("parent")), condition);
            }
        }
        //

        if (!user.isSuperUser()) {
            MapJoin<T, Long, Reader> readers = taskRoot.joinMap("readers", JoinType.LEFT);
            Path<Set<Long>> observers = taskRoot.join("observers", JoinType.LEFT);
            Predicate readCondition = cb.or(readers.key().in(user.getId()), observers.in(user.getId()));
            if (condition == null) {
                condition = readCondition;
            } else {
                condition = cb.and(condition, readCondition);
            }
        }
        return condition;
    }
}
