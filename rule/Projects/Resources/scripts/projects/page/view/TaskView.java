package projects.page.view;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Exception;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;

public class TaskView extends _DoPage {

	@Override
	public void doGET(_Session session, _WebFormData formData) {
		if (formData.containsField("stream")) {
			responseTaskStream(session, formData);
		} else {
			responseTaskList(session, formData);
		}
	}

	@Override
	public void doDELETE(_Session session, _WebFormData formData) {
		TaskDAO taskDAO = new TaskDAO(session);
		for (String id : formData.getListOfValuesSilently("taskIds")) {
			Task m = taskDAO.findById(id);
			try {
				m.setAttachments(null); // if no on delete cascade
				taskDAO.delete(m);
			} catch (SecureException e) {
				setError(e);
			}
		}
	}

	private void responseTaskList(_Session session, _WebFormData formData) {
		TaskDAO taskDAO = new TaskDAO(session);
		TaskFilter taskFilter = createTaskFilter(session, formData);
		int pageSize = session.pageSize;
		int pageNum = formData.getNumberValueSilently("page", 0);
		ViewPage<Task> vp = taskDAO.findAllByTaskFilter(taskFilter, pageNum, pageSize);
		addContent(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum());
	}

	private void responseTaskStream(_Session session, _WebFormData formData) {
		try {
			String taskId = formData.getValue("taskId");
			TaskDAO taskDAO = new TaskDAO(session);
			Task task = taskDAO.findById(taskId);

			if (task == null) {
				addContent("message", "task not found");
				return;
			}

			List<Task> subTasks = task.getSubtasks();
			List<Request> requests = task.getRequests();

			if (subTasks.size() > 0) {
				addContent(subTasks);
			}
			if (requests.size() > 0) {
				addContent(requests);
			}
		} catch (_Exception e) {
			setError(e);
			e.printStackTrace();
		}
	}

	public static TaskFilter createTaskFilter(_Session session, _WebFormData formData) {
		TaskFilter filter = new TaskFilter();

		filter.setProject(formData.getValueSilently("projectId"));
		filter.setParentTask(formData.getValueSilently("parentTaskId"));
		filter.setTaskType(formData.getValueSilently("taskTypeId"));
		filter.setSearch(formData.getValueSilently("keyWord").toLowerCase());
		filter.setStartDate(formData.getDateSilently("startDate"));
		filter.setDueDate(formData.getDateSilently("dueDate"));

		String parentOnly = formData.getValueSilently("parentOnly");
		if (!filter.hasSearch() && !parentOnly.equals("false")) {
			filter.setParentOnly(true);
		} else {
			filter.setParentOnly(false);
		}

		String taskStatus = formData.getValueSilently("taskStatus");
		if (!taskStatus.isEmpty()) {
			filter.setStatus(TaskStatusType.valueOf(taskStatus));
		}

		String taskPriority = formData.getValueSilently("taskPriority");
		if (!taskPriority.isEmpty()) {
			filter.setPriority(TaskPriorityType.valueOf(taskPriority));
		}

		long assigneeUserId = (long) formData.getNumberDoubleValueSilently("assigneeUserId", 0);
		if (assigneeUserId > 0) {
			filter.setAssigneeUserId(assigneeUserId);
		}

		String tasksFor = formData.getValueSilently("for");
		if ("inbox".equals(tasksFor)) {
			filter.setAssigneeUserId(session.getUser().getId());
		} else if ("my".equals(tasksFor)) {
			filter.setAuthorId(session.getUser().getId());
		}

		if (formData.containsField("tagIds")) {
			List<Tag> tags = new ArrayList<>();
			String[] tagIds = formData.getListOfValuesSilently("tagIds");
			for (String tid : tagIds) {
				Tag tag = new Tag();
				tag.setId(UUID.fromString(tid));
				tags.add(tag);
			}
			filter.setTags(tags);
		}

		return filter;
	}
}
