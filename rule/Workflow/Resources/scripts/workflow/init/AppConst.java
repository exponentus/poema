package workflow.init;

import com.exponentus.common.init.DefaultAppConst;
import com.exponentus.webserver.constants.ApplicationMode;

public class AppConst extends DefaultAppConst {
	public static String NAME = "Workflow";
	public static String NAME_ENG = "Workflow";
	public static String NAME_RUS = "Документооборот";
	public static String NAME_KAZ = "Документооборот";
	public static final ApplicationMode AVAILABLE_MODE[] = { ApplicationMode.REST };
	public static final String DEFAULT_PAGE = "index";
	public static final String[] ROLES = { "can_sign_outgoing" };
}
