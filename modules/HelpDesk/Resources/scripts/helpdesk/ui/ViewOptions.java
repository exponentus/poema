package helpdesk.ui;

import com.exponentus.common.ui.filter.FilterForm;
import com.exponentus.common.ui.filter.FilterGroup;
import com.exponentus.common.ui.filter.FilterItem;
import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewOption;
import com.exponentus.env.Environment;
import com.exponentus.scripting._Session;
import helpdesk.model.constants.DemandStatusType;

import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewOption getDemandOptions() {
        ViewOption result = new ViewOption();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-50");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortDesc().className("vw-40"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn("hasAttachment").type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-30");
        cg2.add(new ViewColumn("demandType").name("demand_type").type(ViewColumnType.localizedName).className("vw-60"));
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-40").valueAsClass("status-"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("tags").type(ViewColumnType.localizedName).style("return { color:it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);

        result.setRoot(list);
        return result;
    }

    public FilterForm getDemandFilter(_Session session) {
        List<FilterItem.Item> items = new ArrayList<>();
        for (DemandStatusType type : DemandStatusType.values()) {
            if (type != DemandStatusType.UNKNOWN) {
                String name = Environment.vocabulary.getWord(type.name().toLowerCase(), session.getLang());
                items.add(new FilterItem.Item(type.name(), name, "status-" + type.name().toLowerCase()));
            }
        }

        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("status").items(items));
        filterGroup.addItem(new FilterItem("project").url("/Projects/api/projects"));
        filterGroup.addItem(new FilterItem("tags").multiple().url("/Reference/api/tags?hidden=true&category=software_developing_demand").style("return {color:it.color}"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }
}
