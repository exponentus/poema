package resourcereservations.constants;

import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionType;

/**
 * Created by medin on 4/21/17.
 */
public class Action {

    public static final _Action newApplicationForVehicle = new _Action(_ActionType.LINK).caption("btn_label_add_application").url("applications_for_vehicle/new");
    public static final _Action newApplicationForMeetingRoom = new _Action(_ActionType.LINK).caption("btn_label_add_application").url("applications_for_meeting_room/new");

    public static final _Action startApproving = new _Action(_ActionType.API_ACTION).caption("start_approving").url("startApproving");
    public static final _Action signApprovalBlock = new _Action(_ActionType.API_ACTION).caption("sign").url("acceptApprovalBlock");
    public static final _Action acceptApprovalBlock = new _Action(_ActionType.API_ACTION).caption("accept").url("acceptApprovalBlock");
    public static final _Action declineApprovalBlock = new _Action(_ActionType.API_ACTION).caption("decline").url("declineApprovalBlock");

    public static final _Action refreshVew = new _Action(_ActionType.RELOAD).id("refresh").icon("fa fa-refresh");
    public static final _Action close = new _Action(_ActionType.CLOSE).caption("close").icon("fa fa-chevron-left").cls("btn-back");
    public static final _Action saveAndClose = new _Action(_ActionType.SAVE_AND_CLOSE).caption("save_close");
    public static final _Action deleteDocument = new _Action(_ActionType.DELETE_DOCUMENT).caption("delete").cls("btn-warning-effect");
}
