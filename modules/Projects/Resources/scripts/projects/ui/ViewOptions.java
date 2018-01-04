package projects.ui;

import com.exponentus.common.model.constants.PriorityType;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.ui.filter.FilterForm;
import com.exponentus.common.ui.filter.FilterGroup;
import com.exponentus.common.ui.filter.FilterItem;
import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewPageOptions;
import com.exponentus.env.Environment;
import com.exponentus.scripting._Session;
import projects.model.constants.ProjectStatusType;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewPageOptions getProjectOptions() {
        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30 vw-md-50");
        cg1.add(new ViewColumn("name").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));
        cg1.add(new ViewColumn("status").type(ViewColumnType.translate).sortBoth().className("vw-55").valueAsClass("status-"));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-20 vw-md-50");
        cg2.add(new ViewColumn("customer.name").name("customer"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-40");
        cg3.add(new ViewColumn("employees.managerUserId.name").name("manager").type(ViewColumnType.normalizedData).className("vw-35"));
        cg3.add(new ViewColumn("employees.programmerUserId.name").name("programmer").type(ViewColumnType.normalizedData).className("vw-35"));
        cg3.add(new ViewColumn("employees.testerUserId.name").name("tester").type(ViewColumnType.normalizedData).className("vw-30"));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-10");
        cg4.add(new ViewColumn("finishDate").name("finish_date").type(ViewColumnType.date).format("DD.MM.YYYY"));

        List<ViewColumnGroup> project = new ArrayList<>();
        project.add(cg1);
        project.add(cg2);
        project.add(cg3);
        project.add(cg4);

        result.setRoot(project);
        return result;
    }

    public ViewPageOptions getTaskViewOptions() {
        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup tcg1 = new ViewColumnGroup();
        tcg1.setClassName("vw-35 vw-md-70");
        tcg1.add(new ViewColumn("regNumber").name("reg_number").className("vw-45"));
        tcg1.add(new ViewColumn("status").type(ViewColumnType.translate).sortBoth().className("vp__list_it_col-if-tree-view status-col-mobile").valueAsClass("status-bg-"));
        tcg1.add(new ViewColumn("title").name("task_title").sortBoth().style(" if(it.approvalStatus === 'PENDING') { return { color:'#9C27B0', 'font-weight':'bold' } }"));
        tcg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup tcg2 = new ViewColumnGroup();
        tcg2.setClassName("vw-15 vw-md-30");
        tcg2.add(new ViewColumn("status").type(ViewColumnType.translate).sortBoth().className("vw-50").valueAsClass("status-"));
        tcg2.add(new ViewColumn("priority").type(ViewColumnType.translate).sortBoth().className("vw-50").valueAsClass("priority-"));

        ViewColumnGroup tcg3 = new ViewColumnGroup();
        tcg3.setClassName("vw-10");
        tcg3.add(new ViewColumn("employees.assigneeUserId.name").name("assignee_user").type(ViewColumnType.normalizedData));

        ViewColumnGroup tcg4 = new ViewColumnGroup();
        tcg4.setClassName("vw-15");
        tcg4.add(new ViewColumn("project.name").name("project"));

        ViewColumnGroup tcg5 = new ViewColumnGroup();
        tcg5.setClassName("vw-15");
        tcg5.add(new ViewColumn("dueDate").name("due_date").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));

        ViewColumnGroup tcg6 = new ViewColumnGroup();
        tcg6.setClassName("vw-10");
        tcg6.add(new ViewColumn("tags").type(ViewColumnType.localizedName).style("return { color: it.color }"));

        List<ViewColumnGroup> taskCols = new ArrayList<>();
        taskCols.add(tcg1);
        taskCols.add(tcg2);
        taskCols.add(tcg3);
        taskCols.add(tcg4);
        taskCols.add(tcg5);
        taskCols.add(tcg6);

        // Request
        ViewColumnGroup rcg1 = new ViewColumnGroup();
        rcg1.setClassName("vp__list_it-inline");
        rcg1.add(new ViewColumn("requestType").type(ViewColumnType.localizedName).className("request__type"));
        rcg1.add(new ViewColumn("regDate").type(ViewColumnType.date).className("request__time hidden-md"));
        rcg1.add(new ViewColumn("comment").className("request__comment hidden-md"));
        rcg1.add(new ViewColumn().type(ViewColumnType.attachment));
        rcg1.add(new ViewColumn("resolution").type(ViewColumnType.translate).className("request-list__item").valueAsClass("request-status-"));
        rcg1.add(new ViewColumn("resolutionTime").type(ViewColumnType.date).className("request__resolution_time hidden-md"));

        List<ViewColumnGroup> request = new ArrayList<>();
        request.add(rcg1);

        result.setRoot(taskCols);
        result.add("request", request);
        return result;
    }

    public FilterForm getProjectFilter(_Session session) {
        List<FilterItem.Item> items = new ArrayList<>();
        for (ProjectStatusType type : ProjectStatusType.values()) {
            if (type == ProjectStatusType.UNKNOWN) {
                continue;
            }

            try {
                Field field = ProjectStatusType.class.getField(type.name());
                if (field.isAnnotationPresent(Deprecated.class)) {
                    continue;
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }

            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            items.add(new FilterItem.Item(type.name(), name, "status-" + type.name().toLowerCase()));
        }

        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("status").items(items));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }

    public FilterForm getTaskFilter(_Session session, String slug) {

        StatusType[] statusTypes = {
                StatusType.OPEN,
                StatusType.PROCESSING,
                StatusType.PENDING,
                StatusType.WAITING,
                StatusType.COMPLETED,
                StatusType.CANCELLED,
                StatusType.DRAFT
        };
        List<FilterItem.Item> statusTypeItems = new ArrayList<>();
        for (StatusType type : statusTypes) {
            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            statusTypeItems.add(new FilterItem.Item(type.name(), name, "status-" + type.name().toLowerCase()));
        }

        List<FilterItem.Item> priorityTypeItems = new ArrayList<>();
        for (PriorityType priorityType : PriorityType.values()) {
            if (priorityType == PriorityType.UNKNOWN) {
                continue;
            }
            String name = Environment.vocabulary.getWord(priorityType.name().toLowerCase(), session.getLang());
            priorityTypeItems.add(new FilterItem.Item(priorityType.name(), name, "priority-" + priorityType.name().toLowerCase()));
        }

        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("status").items(statusTypeItems));
        filterGroup.addItem(new FilterItem("priority").items(priorityTypeItems));
        filterGroup.addItem(new FilterItem("taskType", "task_type").url("/Reference/api/task-types"));
        if (!"inbox".equals(slug)) {
            filterGroup.addItem(new FilterItem("assigneeUser", "assignee_user").targetValue("userID").url("/Staff/api/employees"));
        }
        filterGroup.addItem(new FilterItem("project").url("/Projects/api/projects"));
        filterGroup.addItem(new FilterItem("tags").multiple().url("/Reference/api/tags?hidden=true&category=software_developing_task").style("return {color:it.color}"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }
}
