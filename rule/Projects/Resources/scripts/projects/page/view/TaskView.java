package projects.page.view;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TaskView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        TaskDAO taskDAO = new TaskDAO(session);
        TaskFilter taskFilter = createTaskFilter(session, formData);
        int pageSize = session.pageSize;
        int pageNum = formData.getNumberValueSilently("page", 0);
        ViewPage<Task> vp = taskDAO.findAllByTaskFilter(taskFilter, pageNum, pageSize);
        addContent(new _POJOListWrapper(vp.getResult(), vp.getMaxPage(), vp.getCount(), vp.getPageNum(), session));
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {

    }

    public TaskFilter createTaskFilter(_Session session, _WebFormData formData) {
        TaskFilter filter = new TaskFilter();

        String tasksFor = formData.getValueSilently("for");
        filter.setProject(formData.getValueSilently("projectId"));
        filter.setParentTask(formData.getValueSilently("taskId"));
        filter.setTaskType(formData.getValueSilently("taskTypeId"));
        filter.setSearch(formData.getValueSilently("search"));
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

        if ("inbox".equals(tasksFor)) {
            filter.setAssigneeUserId(session.getUser().getId());
        } else if ("my".equals(tasksFor)) {
            filter.setAuthorId(session.getUser().getId());
        }

        if (formData.containsField("tagIds")) {
            List<Tag> tags = new ArrayList<>();
            String[] tagIds = formData.getValueSilently("tagIds").split(",");
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
