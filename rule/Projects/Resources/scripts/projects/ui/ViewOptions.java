package projects.ui;

import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewPageOptions;

import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewPageOptions getProjectOptions() {
        /*
        project: [{
            className: 'vw-30',
            columns: [
                { name: 'name', value: 'name', type: 'text', sort: 'desc' },
                { value: 'hasAttachment', type: 'attachment' },
                { name: 'status', value: 'status', type: 'translate', sort: 'both', className: 'vw-55', valueAsClass: 'status-' }
            ]
        }, {
            className: 'vw-20',
            columns: [{ name: 'customer', value: 'customer', sort: 'both' }]
        }, {
            className: 'vw-40',
            columns: [
                { name: 'manager', value: ['employees', 'managerUserId', 'name'], type: 'normalizedData', className: 'vw-35' },
                { name: 'programmer', value: ['employees', 'programmerUserId', 'name'], type: 'normalizedData', className: 'vw-35' },
                { name: 'tester', value: ['employees', 'testerUserId', 'name'], type: 'normalizedData', className: 'vw-30' }
            ]
        }, {
            className: 'vw-10',
            columns: [{ name: 'finish_date', value: 'finishDate', type: 'date', format: 'DD.MM.YYYY' }]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30");
        cg1.add(new ViewColumn("name").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));
        cg1.add(new ViewColumn("status").type(ViewColumnType.translate).sortBoth().className("vw-55").valueAsClass("status-"));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-20");
        cg2.add(new ViewColumn("customer").sortBoth());

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
        /*
        task: [{
            className: 'vw-35',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', className: 'vw-45' },
                { value: 'status', type: 'translate', className: 'vp__list_it_col-if-tree-view status-col-mobile', valueAsClass: 'status-bg-' },
                {
                    name: 'task_title', value: 'title', type: 'text', sort: 'both', style: (it: Task) => {
                        if (it.approvalStatus === 'PENDING') {
                            return { color: '#9C27B0', 'font-weight': 'bold' };
                        }
                    }
                },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-15',
            columns: [
                { name: 'status', value: 'status', type: 'translate', sort: 'both', className: 'vw-50', valueAsClass: 'status-' },
                { name: 'priority', value: 'priority', type: 'translate', sort: 'both', className: 'vw-50', valueAsClass: 'priority-' }
            ]
        }, {
            className: 'vw-15',
            columns: [{ name: 'assignee_user', value: ['employees', 'assigneeUserId', 'name'], type: 'normalizedData' }]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'start_date', value: 'startDate', type: 'date', format: 'DD.MM.YYYY', sort: 'both', className: 'vw-50' },
                { name: 'due_date', value: 'dueDate', type: 'date', format: 'DD.MM.YYYY', sort: 'both', className: 'vw-50' }
            ]
        }, {
            className: 'vw-15',
            columns: [{ name: 'tags', value: 'tags', type: 'localizedName', className: 'vw-tags', style: (it: Tag) => { return { color: it.color }; } }]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup tcg1 = new ViewColumnGroup();
        tcg1.setClassName("vw-35");
        tcg1.add(new ViewColumn("regNumber").name("reg_number").className("vw-45"));
        tcg1.add(new ViewColumn("status").type(ViewColumnType.translate).sortBoth().className("vp__list_it_col-if-tree-view status-col-mobile").valueAsClass("status-bg-"));
        tcg1.add(new ViewColumn("title").name("task_title").sortBoth().style(" if(it.approvalStatus === 'PENDING') { return { color:'#9C27B0', 'font-weight':'bold' } }"));
        tcg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup tcg2 = new ViewColumnGroup();
        tcg2.setClassName("vw-15");
        tcg2.add(new ViewColumn("status").type(ViewColumnType.translate).sortBoth().className("vw-50").valueAsClass("status-"));
        tcg2.add(new ViewColumn("priority").type(ViewColumnType.translate).sortBoth().className("vw-50").valueAsClass("priority-"));

        ViewColumnGroup tcg3 = new ViewColumnGroup();
        tcg3.setClassName("vw-15");
        tcg3.add(new ViewColumn("employees.assigneeUserId.name").name("assignee_user").type(ViewColumnType.normalizedData));

        ViewColumnGroup tcg4 = new ViewColumnGroup();
        tcg4.setClassName("vw-20");
        tcg4.add(new ViewColumn("startDate").name("start_date").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));
        tcg4.add(new ViewColumn("dueDate").name("due_date").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));

        ViewColumnGroup tcg5 = new ViewColumnGroup();
        tcg5.setClassName("vw-15");
        tcg5.add(new ViewColumn("tags").type(ViewColumnType.localizedName).className("vw-tags").style("return { color: it.color }"));

        List<ViewColumnGroup> task = new ArrayList<>();
        task.add(tcg1);
        task.add(tcg2);
        task.add(tcg3);
        task.add(tcg4);
        task.add(tcg5);

        /*
        request: [{
            className: 'vp__list_it-inline',
            columns: [
                { value: 'requestType', type: 'localizedName', className: 'request__type' },
                { value: 'regDate', type: 'date', className: 'request__time hidden-md' },
                { value: 'comment', type: 'text', className: 'request__comment hidden-md' },
                { value: 'hasAttachment', type: 'attachment' },
                { value: 'resolution', type: 'translate', className: 'request-list__item', valueAsClass: 'request-status-' },
                { value: 'resolutionTime', type: 'date', className: 'request__resolution_time hidden-md' }
            ]
        }]*/
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

        result.setRoot(task);
        result.addOption("request", request);
        return result;
    }
}
