package helpdesk.ui;

import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewPageOptions;

import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewPageOptions getDemandOptions() {
        /*
        demand: [{
            className: 'vw-40',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'desc', className: 'vw-40' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-25',
            columns: [
                { name: 'demand_type', value: 'demandType', type: 'localizedName', className: 'vw-60' },
                { name: 'status', value: 'status', type: 'translate', className: 'vw-40', valueAsClass: 'status-' }
            ]
        }, {
            className: 'vw-20',
            columns: [{ name: 'customer', value: 'customer', type: 'localizedName' }]
        }, {
            className: 'vw-15',
            columns: [{ name: 'tags', value: 'tags', type: 'localizedName', className: 'vw-tags', style: (it: Tag) => { return { color: it.color }; } }]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

        ViewColumnGroup cg1 = new ViewColumnGroup();
        cg1.setClassName("vw-40");
        cg1.add(new ViewColumn("regNumber").name("reg_number").sortDesc().className("vw-40"));
        cg1.add(new ViewColumn("title").sortBoth());
        cg1.add(new ViewColumn("hasAttachment").type(ViewColumnType.attachment));

        ViewColumnGroup cg2 = new ViewColumnGroup();
        cg2.setClassName("vw-25");
        cg2.add(new ViewColumn("demandType").name("demand_type").type(ViewColumnType.localizedName).className("vw-60"));
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-40").valueAsClass("status-"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-20");
        cg3.add(new ViewColumn("customer").type(ViewColumnType.localizedName));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-15");
        cg4.add(new ViewColumn("tags").type(ViewColumnType.localizedName).className("vw-tags").style("return { color:it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.addOption("root", list);
        return result;
    }
}
