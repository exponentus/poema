package workflow.ui;

import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewPageOptions;

import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewPageOptions getIncomingOptions() {
        /*
        incoming: [{
            className: 'vw-30',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-35' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-30',
            columns: [
                { name: 'sender', value: 'sender', type: 'text', sort: 'both', className: 'vw-70' },
                { name: 'sender_applied_reg_date', value: 'senderAppliedRegDate', type: 'date', format: 'DD.MM.YYYY', sort: 'both', className: 'vw-30' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'doc_type', value: 'docType', type: 'localizedName' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'addressee', value: 'addressee' }
            ]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortBoth().className("vw-35"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-30");
        cg2.add(new ViewColumn("sender").sortBoth().className("vw-70"));
        cg2.add(new ViewColumn("senderAppliedRegDate").name("sender_applied_reg_date").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-30"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("docType").name("doc_type").type(ViewColumnType.localizedName));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-20");
        cg4.add(new ViewColumn("addressee"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.setRoot(list);
        result.addOption("assignment", getAssignmentColGroup());
        result.addOption("report", getReportColGroup());
        return result;
    }

    public ViewPageOptions getOutgoingOptions() {
        /*
        outgoing: [{
            className: 'vw-35',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-35' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-15',
            columns: [
                { name: 'status', value: 'status', type: 'translate', className: 'vw-50', valueAsClass: 'status-' },
                { name: 'result', value: 'result', type: 'translate', className: 'vw-50', valueAsClass: 'result-' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'recipient', value: 'recipient', type: 'localizedName', sort: 'both' }
            ]
        }, {
            className: 'vw-30',
            columns: [
                { name: 'doc_subject', value: 'docSubject', type: 'localizedName', sort: 'both', className: 'vw-50' },
                { name: 'doc_type', value: 'docType', type: 'localizedName', sort: 'both', className: 'vw-50' }
            ]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-35");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortBoth().className("vw-35"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-15");
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-50").valueAsClass("status-"));
        cg2.add(new ViewColumn("result").type(ViewColumnType.translate).className("vw-50").valueAsClass("result-"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("recipient").type(ViewColumnType.localizedName).sortBoth());

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-20");
        cg4.add(new ViewColumn("docSubject").name("doc_subject").type(ViewColumnType.localizedName).sortBoth().className("vw-50"));
        cg4.add(new ViewColumn("docType").name("doc_type").type(ViewColumnType.localizedName).sortBoth().className("vw-50"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.setRoot(list);
        result.addOption("assignment", getAssignmentColGroup());
        result.addOption("report", getReportColGroup());
        return result;
    }

    public ViewPageOptions getOfficeMemoOptions() {
        /*
        officeMemo: [{
            className: 'vw-35',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-35' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-15',
            columns: [
                // { name: 'status', value: 'status', type: 'translate', monogram: 'result', valueAsClass: 'status-' }
                { name: 'status', value: 'status', type: 'translate', className: 'vw-50', valueAsClass: 'status-' },
                { name: 'result', value: 'result', type: 'translate', className: 'vw-50', valueAsClass: 'result-' }
            ]
        }, {
            className: 'vw-25',
            columns: [
                { name: 'recipient', value: 'recipient' }
            ]
        }, {
            className: 'vw-25',
            columns: [
                { name: 'applied_author', value: 'appliedAuthor' }
            ]
        }*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-35");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortBoth().className("vw-35"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-15");
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-50").valueAsClass("status-"));
        cg2.add(new ViewColumn("result").type(ViewColumnType.translate).className("vw-50").valueAsClass("result-"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-25");
        cg3.add(new ViewColumn("recipient"));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-25");
        cg4.add(new ViewColumn("appliedAuthor").name("applied_author"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.setRoot(list);
        result.addOption("assignment", getAssignmentColGroup());
        result.addOption("report", getReportColGroup());
        return result;
    }

    public ViewPageOptions getAssignmentViewOptions() {
        /*
        assignmentView: [{
            className: 'vw-30',
            columns: [
                { name: 'title', value: 'title' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'applied_author', value: 'appliedAuthor' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'control_type', value: 'controlType', type: 'localizedName', className: 'vw-50' },
                { name: 'status', value: 'status', type: 'translate', valueAsClass: 'status-', className: 'vw-50' }
            ]
        }, {
            className: 'vw-30',
            columns: [
                { name: 'start_date', value: 'startDate', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' },
                { name: 'due_date', value: 'dueDate', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' }
            ]
        }*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30");
        cg1.add(new ViewColumn("title"));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-20");
        cg2.add(new ViewColumn("appliedAuthor").name("applied_author"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("controlType").name("control_type").type(ViewColumnType.localizedName).className("vw-50"));
        cg3.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-50").valueAsClass("status-"));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-30");
        cg4.add(new ViewColumn("startDate").name("start_date").type(ViewColumnType.date).format("DD.MM.YYYY").className("vw-30"));
        cg4.add(new ViewColumn("dueDate").name("due_date").type(ViewColumnType.date).format("DD.MM.YYYY").className("vw-30"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.setRoot(list);
        return result;
    }

    public ViewPageOptions getActionableDocumentViewOptions() {
        /*
        actionableDocument: [{
            className: 'vw-20',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text' }
            ]
        }, {
            className: 'vw-60',
            columns: [
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'status', value: 'status', type: 'translate', valueAsClass: 'status-' },
                // { name: 'result', value: 'result', type: 'translate', valueAsClass: 'result-' }
            ]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-20");
        cg1.add(new ViewColumn("regNumber").name("reg_number"));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-60");
        cg2.add(new ViewColumn("title").sortBoth());
        cg2.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("status").type(ViewColumnType.translate).valueAsClass("status-"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);

        result.setRoot(list);
        result.addOption("assignment", getAssignmentColGroup());
        result.addOption("report", getReportColGroup());
        return result;
    }

    public List<ViewColumnGroup> getAssignmentColGroup() {
        /*
        assignment: [{
            className: 'vp__list_it-inline',
            columns: [
                { value: 'title', className: 'inline' }
            ]
        }]*/

        ViewColumnGroup cg = new ViewColumnGroup();
        cg.setClassName("vp__list_it-inline");
        cg.add(new ViewColumn("title").className("inline"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg);
        return list;
    }

    public List<ViewColumnGroup> getReportColGroup() {
        /*
        report: [{
            className: 'vp__list_it-inline',
            columns: [
                { value: 'title', className: 'inline' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }]*/

        ViewColumnGroup cg = new ViewColumnGroup();
        cg.setClassName("vp__list_it-inline");
        cg.add(new ViewColumn("title").className("inline"));
        cg.add(new ViewColumn().type(ViewColumnType.attachment));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg);
        return list;
    }
}
