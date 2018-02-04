package workflow.ui;

import com.exponentus.common.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.ui.filter.FilterForm;
import com.exponentus.common.ui.filter.FilterGroup;
import com.exponentus.common.ui.filter.FilterItem;
import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewPageOptions;
import com.exponentus.env.Environment;
import com.exponentus.scripting._Session;
import workflow.model.constants.ControlStatusType;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewPageOptions getIncomingOptions() {
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
        result.add("Assignment", getAssignmentColGroup());
        result.add("Report", getReportColGroup());
        return result;
    }

    public ViewPageOptions getOutgoingOptions() {
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
        result.add("Assignment", getAssignmentColGroup());
        result.add("Report", getReportColGroup());
        return result;
    }

    public ViewPageOptions getOfficeMemoOptions() {
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
        result.add("Assignment", getAssignmentColGroup());
        result.add("Report", getReportColGroup());
        return result;
    }

    public ViewPageOptions getAssignmentViewOptions() {
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
        result.add("Assignment", getAssignmentColGroup());
        result.add("Report", getReportColGroup());
        return result;
    }

    public List<ViewColumnGroup> getAssignmentColGroup() {
        ViewColumnGroup cg = new ViewColumnGroup();
        cg.setClassName("vp__list_it-inline");
        cg.add(new ViewColumn("title").className("inline"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg);
        return list;
    }

    public List<ViewColumnGroup> getReportColGroup() {
        ViewColumnGroup cg = new ViewColumnGroup();
        cg.setClassName("vp__list_it-inline");
        cg.add(new ViewColumn("title").className("inline"));
        cg.add(new ViewColumn().type(ViewColumnType.attachment));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg);
        return list;
    }

    public FilterForm getIncomingFilter(_Session session) {
        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("sender").searchable(true).url("/Staff/api/organizations"));
        filterGroup.addItem(new FilterItem("addressee").searchable(true).url("/Staff/api/employees"));
        filterGroup.addItem(new FilterItem("docType", "doc_type").searchable(true).url("/Reference/api/document-types"));
        filterGroup.addItem(new FilterItem("docSubject", "doc_subject").searchable(true).url("/Reference/api/document-subjects"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }

    public FilterForm getOutgoingFilter(_Session session) {
        List<FilterItem.Item> approvalStatusItems = new ArrayList<>();
        for (ApprovalStatusType type : ApprovalStatusType.values()) {
            if (type == ApprovalStatusType.UNKNOWN) {
                continue;
            }

            try {
                Field field = ApprovalStatusType.class.getField(type.name());
                if (field.isAnnotationPresent(Deprecated.class)) {
                    continue;
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }

            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            approvalStatusItems.add(new FilterItem.Item(type.name(), name, "status-" + type.name().toLowerCase()));
        }

        List<FilterItem.Item> approvalResultItems = new ArrayList<>();
        for (ApprovalResultType type : ApprovalResultType.values()) {
            if (type == ApprovalResultType.UNKNOWN) {
                continue;
            }

            try {
                Field field = ApprovalResultType.class.getField(type.name());
                if (field.isAnnotationPresent(Deprecated.class)) {
                    continue;
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }

            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            approvalResultItems.add(new FilterItem.Item(type.name(), name, null));
        }

        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("status").items(approvalStatusItems));
        filterGroup.addItem(new FilterItem("result", "approval_result").items(approvalResultItems));
        filterGroup.addItem(new FilterItem("recipient").searchable(true).url("/Staff/api/organizations"));
        filterGroup.addItem(new FilterItem("docType", "doc_type").searchable(true).url("/Reference/api/document-types"));
        filterGroup.addItem(new FilterItem("docSubject", "doc_subject").searchable(true).url("/Reference/api/document-subjects"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }

    public FilterForm getInternalFilter(_Session session) {
        List<FilterItem.Item> approvalStatusItems = new ArrayList<>();
        for (ApprovalStatusType type : ApprovalStatusType.values()) {
            if (type == ApprovalStatusType.UNKNOWN) {
                continue;
            }

            try {
                Field field = ApprovalStatusType.class.getField(type.name());
                if (field.isAnnotationPresent(Deprecated.class)) {
                    continue;
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }

            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            approvalStatusItems.add(new FilterItem.Item(type.name(), name, "status-" + type.name().toLowerCase()));
        }

        List<FilterItem.Item> approvalResultItems = new ArrayList<>();
        for (ApprovalResultType type : ApprovalResultType.values()) {
            if (type == ApprovalResultType.UNKNOWN) {
                continue;
            }

            try {
                Field field = ApprovalResultType.class.getField(type.name());
                if (field.isAnnotationPresent(Deprecated.class)) {
                    continue;
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }

            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            approvalResultItems.add(new FilterItem.Item(type.name(), name, null));
        }

        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("status").items(approvalStatusItems));
        filterGroup.addItem(new FilterItem("result", "approval_result").items(approvalResultItems));
        filterGroup.addItem(new FilterItem("appliedAuthor", "applied_author").searchable(true).url("/Staff/api/employees"));
        filterGroup.addItem(new FilterItem("recipient").searchable(true).url("/Staff/api/employees"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }

    public FilterForm getAssignmentFilter(_Session session) {
        List<FilterItem.Item> controlStatusItems = new ArrayList<>();
        for (ControlStatusType type : ControlStatusType.values()) {
            if (type == ControlStatusType.UNKNOWN) {
                continue;
            }

            try {
                Field field = ControlStatusType.class.getField(type.name());
                if (field.isAnnotationPresent(Deprecated.class)) {
                    continue;
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            }

            String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
            controlStatusItems.add(new FilterItem.Item(type.name(), name, "status-" + type.name().toLowerCase()));
        }

        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("status").items(controlStatusItems));
        filterGroup.addItem(new FilterItem("controlType", "control_type").searchable(true).url("/Reference/api/control-types"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }
}
