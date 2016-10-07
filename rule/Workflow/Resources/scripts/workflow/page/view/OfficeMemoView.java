package workflow.page.view;

import com.exponentus.scripting._ColumnOptions;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import workflow.dao.OfficeMemoDAO;

public class OfficeMemoView extends AbstractWorkflowView {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        _ActionBar actionBar = new _ActionBar(session);
        _Action newDocAction = new _Action(getLocalizedWord("new_", session.getLang()), "", "new_office_memo");
        newDocAction.setURL("p?id=officememo-form");
        actionBar.addAction(newDocAction);
        actionBar.addAction(new _Action(getLocalizedWord("del_document", session.getLang()), "", _ActionType.DELETE_DOCUMENT));

        addContent(getViewPage(new OfficeMemoDAO(session), formData));

        _ColumnOptions colOpts = new _ColumnOptions();
        colOpts.add("reg_number", "regNumber", "text", "both", "vw-reg-number");
        colOpts.add("", "attachment", "icon", "", "vw-icon");
        colOpts.add("applied_reg_date", "appliedRegDate", "date", "both", "vw-date");
        colOpts.add("approval", "approval", "localizedName", "both", "vw-name");
        colOpts.add("content", "content", "text", "both", "vw-content");
        colOpts.add("summary", "summary", "text", "", "vw-summary");

        addContent("actionBar", actionBar);
        addContent("columnOptions", colOpts);
    }

    @Override
    public void doPUT(_Session session, _WebFormData formData) {
        String actionId = formData.getValueSilently("_action");
        if (!actionId.isEmpty()) {
            doAction(session, formData, actionId);
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {

    }

    private void doAction(_Session session, _WebFormData formData, String actionId) {
        addValue("from_serve", "do action by id: " + actionId);
    }
}
