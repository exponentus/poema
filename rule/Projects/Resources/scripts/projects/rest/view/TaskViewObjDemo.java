package projects.rest.view;

import java.util.ArrayList;
import java.util.List;

import com.exponentus.runtimeobj.SimpleViewObj;
import com.exponentus.scripting._SortParams;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;

import projects.dao.filter.TaskFilter;
import projects.model.Task;

@JsonRootName("task-view")
public class TaskViewObjDemo extends SimpleViewObj<Task> {

	@JsonIgnore
	public Object getMock() {
		TaskViewObjDemo obj = new TaskViewObjDemo();
		List<Task> taskList = new ArrayList<>();
		Task task = new Task();
		taskList.add(task);
		obj.setResult(taskList);
		obj.setFilter(new TaskFilter());
		obj.setSorting(new _SortParams());
		return obj;
	}
}