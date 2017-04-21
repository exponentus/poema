package projects.constants;

import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionType;

/**
 * Created by medin on 4/21/17.
 */
public class Action {

    public static final _Action refreshVew = new _Action(_ActionType.RELOAD).id("refresh").icon("fa fa-refresh");
    public static final _Action close = new _Action(_ActionType.CLOSE).caption("close").icon("fa fa-chevron-left").cls("btn-back");
    public static final _Action saveAndClose = new _Action(_ActionType.SAVE_AND_CLOSE).caption("save_close").cls("btn-primary");
    public static final _Action deleteDocument = new _Action(_ActionType.DELETE_DOCUMENT).caption("delete").cls("btn-warning-effect");
}
