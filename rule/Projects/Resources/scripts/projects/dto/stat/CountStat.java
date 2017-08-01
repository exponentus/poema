package projects.dto.stat;

public class CountStat<T> {
    public T title;
    public long count;

    public CountStat(T title, long count) {
        this.title = title;
        this.count = count;
    }
}
