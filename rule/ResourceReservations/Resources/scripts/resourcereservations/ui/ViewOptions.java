package resourcereservations.ui;

import com.exponentus.common.ui.view.ViewColumn;
import com.exponentus.common.ui.view.ViewColumnGroup;
import com.exponentus.common.ui.view.ViewColumnType;
import com.exponentus.common.ui.view.ViewPageOptions;

import java.util.ArrayList;
import java.util.List;

public class ViewOptions {

    public ViewPageOptions getApplicationOptions() {
        /*
        application: [{
            className: 'vw-30',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-35' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'status', value: 'status', type: 'translate', className: 'vw-40', valueAsClass: 'status-' },
                { name: 'recipient', value: 'recipient.name' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'use_from', value: 'useFrom', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' },
                { name: 'use_to', value: 'useTo', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' }
            ]
        }, {
            className: 'vw-10',
            columns: [
                { name: 'tags', value: 'tags', type: 'localizedName', className: 'vw-tags', style: (it: any) => { return { color: it.color }; } }
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
        cg2.add(new ViewColumn("status").type(ViewColumnType.translate).className("vw-40").valueAsClass("status-"));
        cg2.add(new ViewColumn("recipient.name").name("recipient"));

        ViewColumnGroup cg3 = new ViewColumnGroup();
        cg3.setClassName("vw-25");
        cg3.add(new ViewColumn("useFrom").name("use_from").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));
        cg3.add(new ViewColumn("useTo").name("use_to").type(ViewColumnType.date).format("DD.MM.YYYY").sortBoth().className("vw-50"));

        ViewColumnGroup cg4 = new ViewColumnGroup();
        cg4.setClassName("vw-15");
        cg4.add(new ViewColumn("tags").type(ViewColumnType.localizedName).className("vw-tags").style("return { color: it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);

        result.setRoot(list);
        return result;
    }

    public ViewPageOptions getApplicationForVehicleOptions() {
        /*
        applicationForVehicle: [{
            className: 'vw-30',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-35' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'status', value: 'status', type: 'translate', className: 'vw-40', valueAsClass: 'status-' },
                { name: 'recipient', value: 'recipient.name' }
            ]
        }, {
            className: 'vw-20',
            columns: [{ name: 'vehicle', value: 'vehicle', type: 'localizedName' }]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'use_from', value: 'useFrom', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' },
                { name: 'use_to', value: 'useTo', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' }
            ]
        }, {
            className: 'vw-10',
            columns: [
                { name: 'tags', value: 'tags', type: 'localizedName', className: 'vw-tags', style: (it: any) => { return { color: it.color }; } }
            ]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

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
        cg5.add(new ViewColumn("tags").type(ViewColumnType.localizedName).className("vw-tags").style("return { color: it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);
        list.add(cg5);

        result.setRoot(list);
        return result;
    }

    public ViewPageOptions getApplicationForMeetingRoomOptions() {
        /*
        applicationForMeetingRoom: [{
            className: 'vw-30',
            columns: [
                { name: 'reg_number', value: 'regNumber', type: 'text', sort: 'both', className: 'vw-35' },
                { name: 'title', value: 'title', type: 'text', sort: 'both' },
                { value: 'hasAttachment', type: 'attachment' }
            ]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'status', value: 'status', type: 'translate', className: 'vw-40', valueAsClass: 'status-' },
                { name: 'recipient', value: 'recipient.name' }
            ]
        }, {
            className: 'vw-20',
            columns: [{ name: 'room', value: 'room', type: 'localizedName' }]
        }, {
            className: 'vw-20',
            columns: [
                { name: 'use_from', value: 'useFrom', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' },
                { name: 'use_to', value: 'useTo', type: 'date', format: 'DD.MM.YYYY', className: 'vw-50' }
            ]
        }, {
            className: 'vw-10',
            columns: [
                { name: 'tags', value: 'tags', type: 'localizedName', className: 'vw-tags', style: (it: any) => { return { color: it.color }; } }
            ]
        }]*/

        ViewPageOptions result = new ViewPageOptions();

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
        cg5.add(new ViewColumn("tags").type(ViewColumnType.localizedName).className("vw-tags").style("return { color: it.color }"));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg1);
        list.add(cg2);
        list.add(cg3);
        list.add(cg4);
        list.add(cg5);

        result.setRoot(list);
        return result;
    }
}
