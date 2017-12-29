package workflow.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.constants.ActionType;
import workflow.init.ModuleConst;

public class ActionFactory extends ConventionalActionFactory {

    public Action newIncoming() {
        return new Action(ActionType.LINK).caption("new_incoming").url(ModuleConst.BASE_URL + "incomings/new");
    }

    public Action newOutgoing() {
        return new Action(ActionType.LINK).caption("new_outgoing").url(ModuleConst.BASE_URL + "outgoings/new");
    }

    public Action newOfficeMemo() {
        return new Action(ActionType.LINK).caption("new_internal").url(ModuleConst.BASE_URL + "office-memos/new");
    }

    public Action registerOutgoing() {
        return new Action().id("registerOutgoing").caption("register_outgoing").url(ModuleConst.BASE_URL + "api/outgoings/action/register");
    }
}
