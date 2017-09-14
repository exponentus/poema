package helpdesk.init;

import com.exponentus.common.init.DefaultAppConst;

import administrator.model.constants.InterfaceType;

public class AppConst extends DefaultAppConst {
	public static final String CODE = "hd";
	public static String NAME = "HelpDesk";
	public static String NAME_ENG = "HelpDesk";
	public static String NAME_RUS = "Служба поддержки";
	public static String NAME_KAZ = "Қолдау қызметі";
	public static String NAME_POR = "O serviço prj suporte";
	public static String NAME_SPA = "Servicio prj apoyo";
	public static String NAME_BUL = "Сервизна поддръжка";
	public static String BASE_URL = "/" + NAME + "/";
	public static final InterfaceType AVAILABLE_MODE[] = { InterfaceType.SPA };
	public static String DEFAULT_PAGE = "index";
	public static boolean FORCE_DEPLOYING = true;
}
