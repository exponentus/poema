package workflow.constants;

import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionType;

/**
 * Created by medin on 4/21/17.
 */
public class Action {

    public enum Types {startApproving, signApprovalBlock, acceptApprovalBlock, declineApprovalBlock}

    public static final _Action newIncoming = new _Action(_ActionType.LINK, "incoming").url("incomings/new");
    public static final _Action newOutgoing = new _Action(_ActionType.LINK, "outgoing").url("outgoings/new");
    public static final _Action newOfficeMemo = new _Action(_ActionType.LINK, "office_memo").url("office-memos/new");
    //
    public static final _Action startApproving = new _Action(Types.startApproving, "start_approving");
    public static final _Action signApprovalBlock = new _Action("sign", "", "acceptApprovalBlock");
    public static final _Action acceptApprovalBlock = new _Action("accept", "", "acceptApprovalBlock");
    public static final _Action declineApprovalBlock = new _Action("decline", "", "declineApprovalBlock");
    //
    public static final _Action refreshVew = new _Action(_ActionType.RELOAD, "").icon("refresh").cls("fa fa-refresh");
    public static final _Action close = new _Action(_ActionType.CLOSE, "close").icon("fa fa-chevron-left").cls("btn-back");
    public static final _Action saveAndClose = new _Action(_ActionType.SAVE_AND_CLOSE, "save_close");
    public static final _Action deleteDocument = new _Action(_ActionType.DELETE_DOCUMENT, "delete");
}
