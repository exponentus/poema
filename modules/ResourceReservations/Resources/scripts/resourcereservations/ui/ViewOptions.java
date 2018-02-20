package resourcereservations.ui;

import com.exponentus.common.ui.filter.FilterForm;
import com.exponentus.common.ui.filter.FilterGroup;
import com.exponentus.common.ui.filter.FilterItem;
import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewOption;

import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewOption getApplicationOptions() {
        ViewOption result = new ViewOption();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortBoth().className("vw-35"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-30");
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-40").valueAsClass("status-"));
        cg2.add(new ViewColumn("recipient.name").name("recipient"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-25");
        cg3.add(new ViewColumn("useFrom").name("use_from").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));
        cg3.add(new ViewColumn("useTo").name("use_to").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-15");
        cg4.add(new ViewColumn("tags").type(ViewColumnType.localizedName).style("return { color: it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.setRoot(list);
        return result;
    }

    public ViewOption getApplicationForVehicleOptions() {
        ViewOption result = new ViewOption();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortBoth().className("vw-35"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-20");
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-40").valueAsClass("status-"));
        cg2.add(new ViewColumn("recipient.name").name("recipient"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("vehicle").type(ViewColumnType.localizedName));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-20");
        cg4.add(new ViewColumn("useFrom").name("use_from").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));
        cg4.add(new ViewColumn("useTo").name("use_to").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));

        ViewColumnGroup cg5 = new ViewColumnGroup();
        cg5.setClassName("vw-10");
        cg5.add(new ViewColumn("tags").type(ViewColumnType.localizedName).style("return { color: it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);
        list.add(cg5);

        result.setRoot(list);
        return result;
    }

    public ViewOption getApplicationForMeetingRoomOptions() {
        ViewOption result = new ViewOption();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-30");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortBoth().className("vw-35"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn().type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-20");
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-40").valueAsClass("status-"));
        cg2.add(new ViewColumn("recipient.name").name("recipient"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("room").type(ViewColumnType.localizedName));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-20");
        cg4.add(new ViewColumn("useFrom").name("use_from").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));
        cg4.add(new ViewColumn("useTo").name("use_to").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));

        ViewColumnGroup cg5 = new ViewColumnGroup();
        cg5.setClassName("vw-10");
        cg5.add(new ViewColumn("tags").type(ViewColumnType.localizedName).style("return { color: it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);
        list.add(cg5);

        result.setRoot(list);
        return result;
    }

    public FilterForm getApplicationFilter() {
        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("tag", "tags").multiple().url("/Reference/api/tags?hidden=true").style("return { color: it.color }"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }

    public FilterForm getApplicationForMeetingRoomFilter() {
        return getApplicationFilter();
    }

    public FilterForm getApplicationForVehicleFilter() {
        FilterForm filterForm = new FilterForm();
        FilterGroup filterGroup = new FilterGroup();
        filterGroup.addItem(new FilterItem("vehicle").url("/Reference/api/vehicles"));
        filterGroup.addItem(new FilterItem("tag", "tags").multiple().url("/Reference/api/tags?hidden=true").style("return { color: it.color }"));

        filterForm.addGroup(filterGroup);

        return filterForm;
    }
}
