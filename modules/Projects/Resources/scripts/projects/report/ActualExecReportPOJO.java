package projects.report;

/**
 * Created by john on 02.04.2020
 */
public class ActualExecReportPOJO {
    public String user;
    public int hours;
    public int execHours;
    public int total;
    public int notExecutedTaskInHours;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getExecHours() {
        return execHours;
    }

    public void setExecHours(int execHours) {
        this.execHours = execHours;
    }

    public int getnotExecutedTaskInHours() {
        return notExecutedTaskInHours;
    }

    public void setnotExecutedTaskInHours(int notExecutedTaskInHours) {
        this.notExecutedTaskInHours = notExecutedTaskInHours;
    }


}
