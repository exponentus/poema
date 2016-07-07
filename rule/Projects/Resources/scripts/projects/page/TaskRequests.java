package projects.page;

import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoForm;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.model.Request;
import projects.model.Task;
import reference.model.RequestType;

import java.util.List;
import java.util.UUID;

public class TaskRequests extends _DoForm {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        if (taskId.isEmpty()) {
            setBadRequest();
            return;
        }

        TaskDAO taskDAO = new TaskDAO(session);
        Task task = taskDAO.findById(taskId);
        if (task == null) {
            setBadRequest();
            return;
        }

        RequestDAO requestDAO = new RequestDAO(session);
        int page = formData.getNumberValueSilently("page", 1);
        List<Request> requests = requestDAO.findTaskRequests(task, page, 20);
        addContent(requests);
    }

    @Override
    public void doPOST(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        String requestTypeId = formData.getValueSilently("requestTypeId");

        if (taskId.isEmpty() || requestTypeId.isEmpty()) {
            setBadRequest();
            return;
        }

        addRequest(session, taskId, requestTypeId, formData.getValueSilently("comment"));
    }

    @Override
    public void doPUT(_Session session, _WebFormData formData) {
        // resolution
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        setBadRequest();
    }

    private void addRequest(_Session session, String taskId, String requestTypeId, String comment) {
        try {
            RequestDAO requestDAO = new RequestDAO(session);
            TaskDAO taskDAO = new TaskDAO(session);
            Task task = taskDAO.findById(taskId);
            if (task == null) {
                setBadRequest();
                return;
            }

            RequestType requestType = new RequestType();
            requestType.setId(UUID.fromString(requestTypeId));

            Request request = new Request();
            request.setTask(task);
            request.setRequestType(requestType);
            request.setComment(comment);
            request.setAttachments(getActualAttachments(request.getAttachments()));

            requestDAO.add(request);

        } catch (DatabaseException e) {
            error(e);
            setBadRequest();
        } catch (SecureException e) {
            error(e);
            setBadRequest();
        }
    }
}
