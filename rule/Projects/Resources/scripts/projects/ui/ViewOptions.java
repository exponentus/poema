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
        ViewColumnGroup cg = new ViewColumnGroup();

        cg.add(new ViewColumn("name").type(ViewColumnType.localizedName).sortBoth());
        cg.add(new ViewColumn("region").type(ViewColumnType.localizedName));

        List<ViewColumnGroup> list = new ArrayList<>();
        list.add(cg);

        result.addOption("root", list);
        return result;
    }
}
