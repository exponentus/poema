package workflow.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions._ActionType;
import workflow.init.AppConst;

/**
 * Created by medin on 4/21/17.
 */
public class ActionFactory extends ConventionalActionFactory {

    public Action newIncoming = new Action(_ActionType.LINK).caption("incoming").url(AppConst.BASE_URL + "incomings/new");
    public Action newOutgoing = new Action(_ActionType.LINK).caption("outgoing").url(AppConst.BASE_URL + "outgoings/new");
    public Action newOfficeMemo = new Action(_ActionType.LINK).caption("office_memo").url(AppConst.BASE_URL + "office-memos/new");

    public Action startApproving = new Action(_ActionType.API_ACTION).id("startApproving").caption("start_approving").url("startApproving");
    public Action signApprovalBlock = new Action(_ActionType.API_ACTION).id("acceptApprovalBlock").caption("sign").url("acceptApprovalBlock");
    public Action acceptApprovalBlock = new Action(_ActionType.API_ACTION).id("acceptApprovalBlock").caption("accept").url("acceptApprovalBlock");
    public Action declineApprovalBlock = new Action(_ActionType.API_ACTION).id("declineApprovalBlock").caption("decline").url("declineApprovalBlock");
    public Action skipApprovalBlock = new Action(_ActionType.API_ACTION).id("skipApprovalBlock").caption("skip").url("skipApprovalBlock");
}
