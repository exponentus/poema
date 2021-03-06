package projects.report;

/**
 * Created by kaira on 9/9/17.
 */
public class ConsolidatedReportPOJO {
    public String user;
    public int total;
    public int cancelled;
    public int open;
    public int draft;
    public int processing;
    public int completed;
    public int pending;
    public int postponed;
    public int expired;
    public int hours;

    public int execHours;

    public int moderation;

    public int getDraft() {
        return draft;
    }

    public void setDraft(int draft) {
        this.draft = draft;
    }

    public int getProcessing() {
        return processing;
    }

    public void setProcessing(int processing) {
        this.processing = processing;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }

    public int getPostponed() {
        return postponed;
    }

    public void setPostponed(int postponed) {
        this.postponed = postponed;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getCancelled() {
        return cancelled;
    }

    public void setCancelled(int cancelled) {
        this.cancelled = cancelled;
    }

    public int getOpen() {
        return open;
    }

    public void setOpen(int open) {
        this.open = open;
    }

    public int getModeration() {
        return moderation;
    }

    public void setModeration(int moderation) {
        this.moderation = moderation;
    }

    public int getExpired() {
        return expired;
    }

    public void setExpired(int expired) {
        this.expired = expired;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getExecHours() {
        return execHours;
    }

    public void setExecHours(int exechours) {
        this.execHours = execHours;
    }


}
