package projects.model.constants;

/**
 * @author Kayra created 21-04-2016
 */
public enum TaskPriorityType {
    UNKNOWN(0), URGENT(1), HIGH(2), MEDIUM(3), NORMAL(4);

    private int code;

    TaskPriorityType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static TaskPriorityType getType(int code) {
        for (TaskPriorityType type : values()) {
            if (type.code == code) {
                return type;
            }
        }
        return UNKNOWN;
    }
}
