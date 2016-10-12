package projects.view;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.rest.outgoingpojo.IPayload;
import com.exponentus.runtimeobj.SimpleViewObj;
import com.exponentus.scripting._SortParams;
import com.fasterxml.jackson.annotation.JsonIgnore;

import projects.dao.filter.TaskFilter;
import projects.model.Task;

public class TaskViewObj extends SimpleViewObj<Task> {

	@JsonIgnore
	public IPayload getMock() {
		TaskViewObj obj = new TaskViewObj();
		List<Task> taskList = new ArrayList<>();
		Task task = new Task();
		taskList.add(task);
		obj.setResult(taskList);
		obj.setFilter(new TaskFilter());
		obj.setSorting(new _SortParams());
		return obj;
	}
}