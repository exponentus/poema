package projects.view;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.exponentus.rest.incomingpojo.view.ViewRequest;
import com.exponentus.rest.runtime.AbstractRequestHandler;
import com.exponentus.rest.runtime.RequestHandler;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;

@RequestHandler("task-view")
public class TaskRequest extends AbstractRequestHandler<ViewRequest> {

	@Override
	public void doRequest(_Session ses, ViewRequest vr) {
		TaskView view = vr.getView(TaskView.class);
		String[] expandedIds = view.getExpandedIds();
		List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
		int pageSize = ses.pageSize;
		int pageNum = view.getPageNum();

		TaskDAO taskDAO = new TaskDAO(ses);
		TaskFilter taskFilter = (TaskFilter) view.getFilter();
		_SortParams sortParams = (_SortParams) view.getSorting();

		addContent(taskDAO.findAllWithChildren(taskFilter, sortParams, pageNum, pageSize, expandedIdList));

	}

}
