package projects;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by medin on 27.09.16.
 */
public class SortMap {

    private Map<String, _Direction> sort = new HashMap<>();

    public static SortMap asc(String fieldName) {
        SortMap sortMap = new SortMap();
        sortMap.addAsc(fieldName);
        return sortMap;
    }

    public static SortMap desc(String fieldName) {
        SortMap sortMap = new SortMap();
        sortMap.addDesc(fieldName);
        return sortMap;
    }

    public SortMap addAsc(String fieldName) {
        if (fieldName == null || fieldName.isEmpty()) {
            throw new IllegalArgumentException("fieldName can not be empty");
        }

        sort.put(fieldName, new _Direction(true));
        return this;
    }

    public SortMap addDesc(String fieldName) {
        if (fieldName == null || fieldName.isEmpty()) {
            throw new IllegalArgumentException("fieldName can not be empty");
        }

        sort.put(fieldName, new _Direction(false));
        return this;
    }

    public final Map<String, _Direction> values() {
        return sort;
    }

    public boolean isEmpty() {
        return sort.isEmpty();
    }

    public class _Direction {

        private boolean ascending;

        _Direction(boolean isAscending) {
            ascending = isAscending;
        }

        public boolean isAscending() {
            return ascending;
        }
    }
}
