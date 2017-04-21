package projects.dao;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;

import projects.dao.filter.TaskFilter;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;

public class TaskDAO extends DAO<Task, UUID> {

	public TaskDAO(_Session session) throws DAOException {
		super(Task.class, session);
	}

	public ViewPage<Task> findAllByTaskFilter(TaskFilter filter, int pageNum, int pageSize) {
		return findAll(filter, SortParams.desc("regDate"), pageNum, pageSize);
	}

	public ViewPage<Task> findAll(TaskFilter filter, SortParams sortParams, int pageNum, int pageSize) {
		if (filter == null) {
			throw new IllegalArgumentException("filter is null");
		}

		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Task> cq = cb.createQuery(Task.class);
			CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
			Root<Task> taskRoot = cq.from(Task.class);

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
					condition = cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%");
				} else {
					condition = cb.and(cb.like(cb.lower(taskRoot.get("title")), "%" + filter.getSearch() + "%"),
							condition);
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

			cq.select(taskRoot).distinct(true).orderBy(collectSortOrder(cb, taskRoot, sortParams));
			countCq.select(cb.countDistinct(taskRoot));

			if (condition != null) {
				cq.where(condition);
				countCq.where(condition);
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

			List<Task> result = typedQuery.getResultList();

			return new ViewPage<>(result, count, maxPage, pageNum);
		} finally {
			em.close();
		}
	}

	public ViewPage<Task> findAllWithResponses(TaskFilter filter, SortParams sortParams, int pageNum, int pageSize,
			List<UUID> expandedIds) {
		ViewPage<Task> vp = findAll(filter, sortParams, pageNum, pageSize);

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

	private List<IAppEntity<UUID>> findTaskResponses(Task task, TaskFilter filter, List<UUID> expandedIds,
			EntityManager em) {

		List<Task> tasks;

		// Task
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
		tasks = typedQueryT.getResultList();

		// Request
		CriteriaBuilder cbr = em.getCriteriaBuilder();
		CriteriaQuery<Request> cqr = cbr.createQuery(Request.class);
		Root<Request> requestRoot = cqr.from(Request.class);
		Join attCount = requestRoot.join("attachments", JoinType.LEFT);
		cqr.select(requestRoot).distinct(true);
		// TODO does not worked if choose hierarchy view
		/*
		 * cqr.select(cbr.construct(Request.class, requestRoot.get("regDate"),
		 * requestRoot.get("author"),cbr.construct(RequestType.class,
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
}
