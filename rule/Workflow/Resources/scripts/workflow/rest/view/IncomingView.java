package workflow.rest.view;

import com.exponentus.runtimeobj.SimpleViewObj;
import com.exponentus.scripting._SortParams;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import projects.dao.filter.TaskFilter;
import workflow.model.Incoming;

import java.util.ArrayList;
import java.util.List;

@JsonRootName("incoming-view")
public class IncomingView extends SimpleViewObj<Incoming> {



    @JsonIgnore
    public Object getMock() {
        IncomingView obj = new IncomingView();
        List<Incoming> list = new ArrayList<>();
        Incoming task = new Incoming();
        list.add(task);
        obj.setResult(list);
        obj.setFilter(new TaskFilter());
        obj.setSorting(new _SortParams());
        return obj;
    }
}
