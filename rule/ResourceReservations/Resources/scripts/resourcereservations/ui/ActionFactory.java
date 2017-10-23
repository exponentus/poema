package resourcereservations.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.scripting.actions.Action;
import com.exponentus.scripting.actions.ActionType;
import resourcereservations.init.AppConst;

/**
 * Created by medin on 4/21/17.
 */
public class ActionFactory extends ConventionalActionFactory {

    public Action newApplicationForVehicle = new Action(ActionType.LINK).caption("btn_label_add_application").url(AppConst.BASE_URL + "applications-for-vehicle/new");
    public Action newApplicationForMeetingRoom = new Action(ActionType.LINK).caption("btn_label_add_application").url(AppConst.BASE_URL + "applications-for-meeting-room/new");

    public Action startApproving = new Action(ActionType.API_ACTION).id("startApproving").caption("start_approving").url("startApproving");
    public Action signApprovalBlock = new Action(ActionType.API_ACTION).id("signApprovalBlock").caption("sign").url("acceptApprovalBlock");
    public Action acceptApprovalBlock = new Action(ActionType.API_ACTION).id("acceptApprovalBlock").caption("accept").url("acceptApprovalBlock");
    public Action declineApprovalBlock = new Action(ActionType.API_ACTION).id("declineApprovalBlock").caption("decline").url("declineApprovalBlock");
}
