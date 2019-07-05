package projects.init;

import administrator.model.constants.InterfaceType;
import com.exponentus.common.init.DefaultAppConst;
import com.exponentus.common.init.DefaultDataConst;

public class ModuleConst extends DefaultAppConst {

    public static final String CODE = "prj";
    public static final String NAME = "Projects";
    public static String NAME_ENG = "Projects";
    public static String NAME_RUS = "Проекты";
    public static String NAME_KAZ = "Жобалар";
    public static String NAME_POR = "Projetos";
    public static String NAME_SPA = "Proyectos";
    public static final String BASE_URL = "/" + NAME + "/";
    public static final String ROLE_PRJ_TASK_MODERATOR = CODE + "_task_moderator";
    public static String[] ROLES = {ROLE_PRJ_TASK_MODERATOR, CODE + "_reporter", CODE + DefaultDataConst.SUPERVISOR_ROLE_NAME};
    public static final InterfaceType AVAILABLE_MODE[] = {InterfaceType.SPA};
    public static boolean FORCE_DEPLOYING = true;
    public static String TAG_CATEGORIES[] = {"software_developing_demand", "software_developing_task"};

    public static String DEFAULT_TASK_TYPE = "Programming";
    public static int DEFAULT_DUE_DATE_RANGE = 5;
}
