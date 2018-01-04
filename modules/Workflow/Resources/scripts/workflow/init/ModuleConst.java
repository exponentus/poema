package workflow.init;

import administrator.model.constants.InterfaceType;
import com.exponentus.common.init.DefaultAppConst;

public class ModuleConst extends DefaultAppConst {
	public static final String CODE = "wf";
	public static final String NAME = "Workflow";
	public static String NAME_ENG = "Workflow";
	public static String NAME_RUS = "Документооборот";
	public static String NAME_POR = "Fluxo prj trabalho";
	public static String NAME_SPA = "Flujo prj trabajo";
	public static String NAME_BUL = "Работния процес";
	public static String NAME_KAZ = "Құжат айналымы";
	public static String BASE_URL = "/" + NAME + "/";
	public static final InterfaceType AVAILABLE_MODE[] = { InterfaceType.SPA };
	public static final String[] ROLES = { "can_sign_outgoing", "chancellery" };
	public static boolean FORCE_DEPLOYING = true;
}
