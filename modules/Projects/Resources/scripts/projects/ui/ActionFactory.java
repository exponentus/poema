package projects.ui;

import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.constants.ActionType;
import projects.init.ModuleConst;
import projects.model.Task;

public class ActionFactory extends ConventionalActionFactory {
    public Action newProject() {
        return new Action(ActionType.LINK).caption("new_project").url(ModuleConst.BASE_URL + "projects/new");
    }

    public Action newTask() {
        return new Action(ActionType.LINK).caption("new_task").url(ModuleConst.BASE_URL + "tasks/new");
    }

    public Action newSubTask(Task task) {
        return new Action(ActionType.LINK).caption("add_subtask").url(ModuleConst.BASE_URL + "tasks/new?parentTaskId=" + task.getId());
    }

    public Action newRequest(Task task) {
        return new Action(ActionType.LINK).caption("new_request").url(ModuleConst.BASE_URL + "requests/new?task=" + task.getId());
    }

    // Task actions
    public Action acknowledgedTask() {
        return new Action().caption("acknowledged_task").url(ModuleConst.BASE_URL + "api/tasks/acknowledged");
    }

    public Action completeTask() {
        return new Action().id("task_complete").caption("complete_task").icon("fa fa-check-square-o").confirm().url(ModuleConst.BASE_URL + "api/tasks/complete");
    }

    public Action cancelTask() {
        return new Action().id("task_cancel").caption("cancel_task").icon("fa fa-ban").url(ModuleConst.BASE_URL + "api/tasks/cancel");
    }

    public Action acceptApprovalBlock() {
        return new Action().id("acceptApprovalBlock").caption("accept").url(ModuleConst.BASE_URL + "api/tasks/acceptApprovalBlock");
    }

    public Action declineApprovalBlock() {
        return new Action().id("declineApprovalBlock").caption("decline").url(ModuleConst.BASE_URL + "api/tasks/declineApprovalBlock");
    }

    // Request actions
    public Action acceptRequest() {
        return new Action().id("accept").caption("accept").url(ModuleConst.BASE_URL + "api/requests/accept");
    }

    public Action declineRequest() {
        return new Action().id("decline").caption("decline").url(ModuleConst.BASE_URL + "api/requests/decline");
    }
}