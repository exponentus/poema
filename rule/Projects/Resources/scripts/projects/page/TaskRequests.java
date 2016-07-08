package projects.page;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoForm;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
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
        String requestId = formData.getValueSilently("requestId");
        String resolution = formData.getValueSilently("resolution");
        ResolutionType resolutionType = ResolutionType.valueOf(resolution);

        if (resolutionType == ResolutionType.UNKNOWN) {
            setBadRequest();
            return;
        }

        doResolution(session, requestId, resolutionType);
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String requestId = formData.getValueSilently("requestId");
        if (requestId.isEmpty()) {
            setBadRequest();
            return;
        }

        String attachmentId = formData.getValueSilently("attachmentId");
        if (!attachmentId.isEmpty()) {
            deleteAttachment(session, requestId, attachmentId);
        }
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

            if (requestDAO.findUnResolvedRequest(task) != null) {
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

    private void doResolution(_Session session, String requestId, ResolutionType resolutionType) {
        try {
            RequestDAO requestDAO = new RequestDAO(session);
            Request request = requestDAO.findById(requestId);

            if (request == null || resolutionType == ResolutionType.UNKNOWN) {
                setBadRequest();
                return;
            }

            if (!request.getTask().getEditors().contains(request.getAuthor())) {
                setBadRequest();
                return;
            }

            request.setResolution(resolutionType);

            requestDAO.update(request);
        } catch (DatabaseException e) {
            error(e);
            setBadRequest();
        } catch (SecureException e) {
            error(e);
            setBadRequest();
        }
    }

    private void deleteAttachment(_Session session, String requestId, String attachmentId) {
        try {
            RequestDAO requestDAO = new RequestDAO(session);
            Request request = requestDAO.findById(requestId);

            if (!request.getTask().getEditors().contains(request.getAuthor())) {
                setBadRequest();
                return;
            }

            AttachmentDAO attachmentDAO = new AttachmentDAO(session);
            Attachment attachment = attachmentDAO.findById(attachmentId);
            request.getAttachments().remove(attachment);

            requestDAO.update(request);
        } catch (DatabaseException e) {
            error(e);
            setBadRequest();
        } catch (SecureException e) {
            error(e);
            setBadRequest();
        }
    }
}
