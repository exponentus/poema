package workflow.init;

import com.exponentus.webserver.constants.ApplicationMode;

public class AppConst {
	public static String MODULE_VERSION = "1.0";
	public static String NAME = "Workflow";
	public static String NAME_ENG = "Workflow";
	public static String NAME_RUS = "Документооборот";
	public static String NAME_KAZ = "Документооборот";
	public static final ApplicationMode AVAILABLE_MODE[] = { ApplicationMode.REST };
	public static final String DEFAULT_PAGE = "index";
	public static final String[] ROLES = { "can_sign_outgoing" };
}
