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
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting.IPOJOObject;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;

import projects.dao.filter.TaskFilter;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;

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
					pageNum = 1; // maxPage;
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

	public ViewPage<Task> findAllWithChildren(TaskFilter filter, _SortParams sortParams, int pageNum, int pageSize,
			List<UUID> expandedIds) {
		ViewPage<Task> vp = findAll(filter, sortParams, pageNum, pageSize);

		if (vp.getResult().isEmpty()/* || expandedIds.isEmpty() */) {
			return vp;
		}

		// List<UUID> rootIds =
		// vp.getResult().stream().map(Task::getId).collect(Collectors.toList());
		// List<UUID> expandedRootIds =
		// rootIds.stream().filter(expandedIds::contains).collect(Collectors.toList());
		// if (!expandedRootIds.isEmpty()) {
		List<IPOJOObject> childrenList = null; // findTaskStream(expandedIds);

		for (Task task : vp.getResult()) {
			// if (expandedIds.contains(task.getId())) {
			// task.setChildren(childrenList);
			findChildren(task, childrenList, expandedIds);
			// }
		}
		// }

		return vp;
	}

	public ViewPage<Task> findTaskChildren(Task task) {
		List<Task> list = new ArrayList<>();
		list.add(task);
		ViewPage<Task> vp = new ViewPage<>(list, 1, 1, 1);

		List<IPOJOObject> childrenList = null;
		findChildren(task, childrenList, null);

		return vp;
	}

	private void findChildren(Task task, List<IPOJOObject> childrenList, List<UUID> expandedIds) {
		if (task.isHasSubtasks() || task.isHasRequests()) {
			List<IAppEntity> children = new ArrayList<>(task.getSubtasks());
			children.addAll(task.getRequests());

			Supplier<List<IAppEntity>> supplier = LinkedList::new;
			children = children.stream().sorted((m1, m2) -> m1.getRegDate().after(m2.getRegDate()) ? 1 : -1)
					.collect(Collectors.toCollection(supplier));

			// task.setChildren(findTaskStream(task));
			task.setChildren(children);

			for (Task t : task.getSubtasks()) {
				findChildren(t, childrenList, expandedIds);
			}
		}
	}

	private List<IAppEntity> findTaskStream(Task task) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		try {
			// === find tasks
			CriteriaBuilder cbt = em.getCriteriaBuilder();
			CriteriaQuery<Task> cqt = cbt.createQuery(Task.class);
			Root<Task> taskRoot = cqt.from(Task.class);
			cqt.select(taskRoot).distinct(true);

			Predicate taskCondition = taskRoot.get("parent").in(task);
			if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Task.class)) {
				Path<Set<Long>> readers = taskRoot.join("readers", JoinType.LEFT);
				Path<Set<Long>> observers = taskRoot.join("observers", JoinType.LEFT);
				Predicate readCondition = cbt.or(readers.in(user.getId()), observers.in(user.getId()));
				taskCondition = cbt.and(taskCondition, readCondition);
			}
			cqt.where(taskCondition);
			cqt.orderBy(cbt.asc(taskRoot.get("regDate")));

			TypedQuery<Task> taskQuery = em.createQuery(cqt);

			List<Task> taskList = taskQuery.getResultList();
			// =====

			// === find requests
			CriteriaBuilder cbr = em.getCriteriaBuilder();
			CriteriaQuery<Request> cqr = cbr.createQuery(Request.class);
			Root<Request> requestRoot = cqr.from(Request.class);
			cqr.select(requestRoot).distinct(true);

			Predicate requestCondition = requestRoot.get("task").in(task);
			if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Request.class)) {
				Path<Set<Long>> readers = requestRoot.join("readers", JoinType.LEFT);
				Predicate readCondition = cbr.or(readers.in(user.getId()));
				requestCondition = cbr.and(requestCondition, readCondition);
			}
			cqr.where(requestCondition);
			cqr.orderBy(cbr.asc(requestRoot.get("regDate")));

			TypedQuery<Request> requestQuery = em.createQuery(cqr);

			List<Request> requestList = requestQuery.getResultList();
			// ======

			List<IAppEntity> result = new ArrayList<>(taskList);
			result.addAll(requestList);

			return result;
		} finally {
			em.close();
		}
	}

	private List<IAppEntity> findTaskStream(List<UUID> uids) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		try {
			// === find tasks
			CriteriaBuilder cbt = em.getCriteriaBuilder();
			CriteriaQuery<Task> cqt = cbt.createQuery(Task.class);
			Root<Task> taskRoot = cqt.from(Task.class);
			cqt.select(taskRoot).distinct(true);

			List<Task> tasks = uids.stream().map(it -> em.getReference(Task.class, it)).collect(Collectors.toList());

			Predicate taskCondition = taskRoot.get("parent").in(tasks);
			if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Task.class)) {
				Path<Set<Long>> readers = taskRoot.join("readers", JoinType.LEFT);
				Path<Set<Long>> observers = taskRoot.join("observers", JoinType.LEFT);
				Predicate readCondition = cbt.or(readers.in(user.getId()), observers.in(user.getId()));
				taskCondition = cbt.and(taskCondition, readCondition);
			}
			cqt.where(taskCondition);
			cqt.orderBy(cbt.asc(taskRoot.get("regDate")));

			TypedQuery<Task> taskQuery = em.createQuery(cqt);

			List<Task> taskList = taskQuery.getResultList();
			// =====

			// === find requests
			CriteriaBuilder cbr = em.getCriteriaBuilder();
			CriteriaQuery<Request> cqr = cbr.createQuery(Request.class);
			Root<Request> requestRoot = cqr.from(Request.class);
			cqr.select(requestRoot).distinct(true);

			Predicate requestCondition = requestRoot.get("task").in(tasks);
			if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(Request.class)) {
				Path<Set<Long>> readers = requestRoot.join("readers", JoinType.LEFT);
				Predicate readCondition = cbr.or(readers.in(user.getId()));
				requestCondition = cbr.and(requestCondition, readCondition);
			}
			cqr.where(requestCondition);
			cqr.orderBy(cbr.asc(requestRoot.get("regDate")));

			TypedQuery<Request> requestQuery = em.createQuery(cqr);

			List<Request> requestList = requestQuery.getResultList();
			// ======

			List<IAppEntity> result = new ArrayList<>(taskList);
			result.addAll(requestList);

			return result;
		} finally {
			em.close();
		}
	}
}
