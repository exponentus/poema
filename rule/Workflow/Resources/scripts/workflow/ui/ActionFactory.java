package workflow.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.constants.ActionType;
import workflow.init.AppConst;



/**
 * Created by medin on 4/21/17.
 */
public class ActionFactory extends ConventionalActionFactory {

    public Action newIncoming = new Action(ActionType.LINK).caption("new_incoming").url(AppConst.BASE_URL + "incomings/new");
    public Action newOutgoing = new Action(ActionType.LINK).caption("new_outgoing").url(AppConst.BASE_URL + "outgoings/new");
    public Action newOfficeMemo = new Action(ActionType.LINK).caption("new_internal").url(AppConst.BASE_URL + "office-memos/new");

    public Action registerOutgoing = new Action(ActionType.API_ACTION).id("registerOutgoing").caption("register_outgoing").url("register");

    public Action startApproving = new Action(ActionType.API_ACTION).id("startApproving").caption("start_approving").url("startApproving");
    public Action signApprovalBlock = new Action(ActionType.API_ACTION).id("acceptApprovalBlock").caption("sign")
            .url("acceptApprovalBlock");
    public Action acceptApprovalBlock = new Action(ActionType.API_ACTION).id("acceptApprovalBlock").caption("accept")
            .url("acceptApprovalBlock");
    public Action declineApprovalBlock = new Action(ActionType.API_ACTION).id("declineApprovalBlock").caption("decline")
            .url("declineApprovalBlock");

}
