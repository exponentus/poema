package audit.init;

import administrator.model.constants.InterfaceType;
import com.exponentus.common.init.DefaultAppConst;

public class AppConst extends DefaultAppConst {
    public static String CODE = "audit";
    public static String NAME = "Audit";
    public static String NAME_ENG = "Audit";
    public static String NAME_RUS = "Аудит";
    public static String NAME_KAZ = "Аудит";
    public static String BASE_URL = "/" + NAME + "/";
    public static final InterfaceType AVAILABLE_MODE[] = {InterfaceType.SPA};
}
