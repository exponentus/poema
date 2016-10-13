package projects.view;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.exponentus.rest.incomingpojo.Income;
import com.exponentus.rest.runtime.AbstractRequestHandler;
import com.exponentus.rest.runtime.RequestHandler;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;

import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;

@RequestHandler("task-view")
public class TaskViewObjHandler extends AbstractRequestHandler {

	@Override
	public void doGet(_Session ses, Income income) {
		TaskViewObj view = income.getPayload(TaskViewObj.class);
		String[] expandedIds = view.getExpandedIds();
		List<UUID> expandedIdList = Arrays.stream(expandedIds).map(UUID::fromString).collect(Collectors.toList());
		int pageSize = ses.pageSize;
		int pageNum = view.getPageNum();

		TaskDAO taskDAO = new TaskDAO(ses);
		TaskFilter taskFilter = (TaskFilter) view.getFilter();
		_SortParams sortParams = (_SortParams) view.getSorting();

		addContent(taskDAO.findAllWithChildren(taskFilter, sortParams, pageNum, pageSize, expandedIdList));

	}

	@Override
	public void doPost(_Session ses, Income request) {

	}

	@Override
	public void doPut(_Session ses, Income request) {

	}

	@Override
	public void doDelete(_Session ses, Income request) {

	}

}
