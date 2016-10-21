package workflow.rest.view;

import com.exponentus.rest.incomingpojo.Income;
import com.exponentus.rest.runtime.HandlerAdapter;
import com.exponentus.rest.runtime.RequestHandler;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequestHandler("incoming-view")
public class IncomingViewHandler extends HandlerAdapter {

    @Override
    public void doPost(_Session ses, Income income) {
        IncomingView view = income.getPayload(IncomingView.class);
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
