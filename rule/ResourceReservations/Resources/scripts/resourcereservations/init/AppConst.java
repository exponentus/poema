package resourcereservations.init;

import com.exponentus.common.init.DefaultAppConst;
import com.exponentus.webserver.constants.ApplicationMode;

public class AppConst extends DefaultAppConst {

	public static String NAME = "ResourceReservations";
	public static String NAME_ENG = "Resource reservations";
	public static String NAME_RUS = "Резервирование ресурсов";
	public static String NAME_KAZ = "Ресурс брондау";
	public static final ApplicationMode AVAILABLE_MODE[] = { ApplicationMode.REST };
	public static final String DEFAULT_PAGE = "index";
	public static final String[] ROLES = { "vehicle_reservation_decider" };

}
