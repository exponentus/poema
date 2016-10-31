package projects.page.task;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.*;
import java.util.stream.Collectors;

public class TaskView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        String[] expandedIds = formData.getListOfValuesSilently("expandedIds");
        List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
        int pageSize = session.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);

        TaskDAO taskDAO = new TaskDAO(session);
        TaskFilter taskFilter = setUpTaskFilter(session, formData, new TaskFilter());
        _SortParams sortParams = formData.getSortParams(_SortParams.desc("regDate"));

        ViewPage<Task> vp = taskDAO.findAllWithChildren(taskFilter, sortParams, pageNum, pageSize, expandedIdList);
        addContent(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum());

        //
        EmployeeDAO empDao = new EmployeeDAO(session);
        Map<Long, Employee> emps = new HashMap<>();
        if (vp.getResult().size() > 0) {
            List<Long> empIds = vp.getResult().stream().map(Task::getAssignee).collect(Collectors.toList());
            for (Employee e : empDao.findAllByUserIds(empIds)) {
                emps.put(e.getUserID(), e);
            }
        }
        addDataContent("employees", emps);
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

    public static TaskFilter setUpTaskFilter(_Session session, _WebFormData formData, TaskFilter filter) {

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
