package projects.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.constants.ActionType;
import projects.init.ModuleConst;

public class ActionFactory extends ConventionalActionFactory {
    public Action newProject = new Action(ActionType.LINK).caption("new_project").url(ModuleConst.BASE_URL + "projects/new");
    public Action newTask = new Action(ActionType.LINK).caption("new_task").url(ModuleConst.BASE_URL + "tasks/new");
}
