package projects.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.time.DateUtils;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import com.exponentus.scripting.actions._ActionBar;

import administrator.model.User;
import monitoring.dao.StatisticDAO;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.domain.TaskDomain;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import projects.ui.ActionFactory;
import reference.model.Tag;

@Path("dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardService extends RestProvider {

	@GET
	public Response getAssignetToMe() {
		try {
			_Session session = getSession();

			int pageSize = 10;
			int pageNum = 1;

			Outcome outcome = new Outcome();
			outcome.setId("dashboard");
			outcome.setTitle("dashboard");

			StatisticDAO monitDao = new StatisticDAO(session);
			Date current = new Date();
			outcome.addPayload("statistic", monitDao.getUserStatistic(projects.init.AppConst.CODE, "assignee_state", session.getUser(),
					DateUtils.addMonths(current, -1), current, TaskStatusType.PROCESSING.name()));

			TaskDAO taskDAO = new TaskDAO(session);
			outcome.addPayload("created_by_me", taskDAO.findCreatedByMe(session.getUser(), pageNum, pageSize));
			outcome.addPayload("assigned_to_me", taskDAO.findAssignedToMe(session.getUser(), pageNum, pageSize));

			return Response.ok(outcome).build();
		} catch (DAOException e) {
			return responseException(e);
		}
	}

	//
	private _ActionBar getActionBar(_Session session, TaskDomain taskDomain, Task task) {
		_ActionBar actionBar = new _ActionBar(session);
		ActionFactory action = new ActionFactory();

		actionBar.addAction(action.close);

		if (taskDomain.taskIsEditable(task)) {
			actionBar.addAction(action.saveAndClose);
		}
		if (taskDomain.userCanDoRequest(task, (User) session.getUser())) {
			actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("add_request").caption("new_request"));
		}
		if (taskDomain.userCanDoAcknowledged(task, (User) session.getUser())) {
			actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("task_acknowledged").caption("acknowledged_task"));
		}

		if (taskDomain.userCanDoResolution(task, (User) session.getUser())) {
			actionBar.addAction(
					new Action(ActionType.CUSTOM_ACTION).id("task_complete").caption("complete_task").icon("fa fa-check-square-o"));
			actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("task_cancel").caption("cancel_task").icon("fa fa-ban"));
		}
		if (taskDomain.userCanAddSubTask(task, (User) session.getUser())) {
			actionBar.addAction(new Action(ActionType.CUSTOM_ACTION).id("add_subtask").caption("add_subtask"));
		}
		if (taskDomain.taskCanBeDeleted(task)) {
			actionBar.addAction(action.deleteDocument);
		}

		return actionBar;
	}

	public static TaskFilter setUpTaskFilter(_Session session, WebFormData formData, TaskFilter filter) {

		filter.setProject(formData.getValueSilently("project"));
		filter.setParentTask(formData.getValueSilently("parentTaskId"));
		filter.setTaskType(formData.getValueSilently("taskTypeId"));
		filter.setSearch(formData.getValueSilently("keyWord").toLowerCase());
		filter.setStartDate(formData.getDateSilently("startDate"));
		filter.setDueDate(formData.getDateSilently("dueDate"));

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

		String slug = formData.getValueSilently("slug");
		switch (slug) {
		case "inbox":
			filter.setAssigneeUserId(session.getUser().getId());
			break;
		case "my":
			filter.setAuthor((User) session.getUser());
			break;
		case "initiative":
			filter.setInitiative(true);
			break;
		default:
			break;
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

		filter.setParentOnly(formData.getBoolSilently("parentOnly"));
		filter.setTreeMode(formData.getBoolSilently("isTreeMode"));

		return filter;
	}
}
