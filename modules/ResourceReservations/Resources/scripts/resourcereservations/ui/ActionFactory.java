package resourcereservations.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.constants.ActionType;
import resourcereservations.init.ModuleConst;

public class ActionFactory extends ConventionalActionFactory {

    public Action newApplicationForVehicle() {
        return new Action(ActionType.LINK).caption("btn_label_add_application").url(ModuleConst.BASE_URL + "applications-for-vehicle/new");
    }

    public Action newApplicationForMeetingRoom() {
        return new Action(ActionType.LINK).caption("btn_label_add_application").url(ModuleConst.BASE_URL + "applications-for-meeting-room/new");
    }
}
