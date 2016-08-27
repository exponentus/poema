package projects.page;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.exception.MsgException;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.util.TimeUtil;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import projects.model.constants.TaskStatusType;
import projects.other.Messages;
import reference.model.RequestType;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class TaskRequests extends _DoForm {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        RequestDAO requestDAO = new RequestDAO(session);

        String requestId = formData.getValueSilently("requestId");
        if (!requestId.isEmpty()) {
            Request request = requestDAO.findById(requestId);
            if (request == null) {
                setBadRequest();
                return;
            }

            addContent(request);
            return;
        }

        String taskId = formData.getValueSilently("taskId");
        if (taskId.isEmpty()) {
            addContent("error", "taskId empty");
            setBadRequest();
            return;
        }

        Task task = new Task();
        task.setId(UUID.fromString(taskId));

        int page = formData.getNumberValueSilently("page", 1);
        List<Request> requests = requestDAO.findTaskRequests(task, page, 20);
        addContent(requests);
    }

    @Override
    public void doPOST(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        String requestTypeId = formData.getValueSilently("requestTypeId");
        if (taskId.isEmpty() || requestTypeId.isEmpty()) {
            addContent("error", "taskId or requestTypeId empty");
            setBadRequest();
            return;
        }

        addRequest(session, taskId, requestTypeId, formData.getValueSilently("comment"));
    }

    @Override
    public void doPUT(_Session session, _WebFormData formData) {
        String requestId = formData.getValueSilently("requestId");
        String action = formData.getValueSilently("_action");

        if (requestId.isEmpty() || action.isEmpty()) {
            addContent("error", "requestId or _action empty");
            setBadRequest();
            return;
        }

        switch (action) {
            case "accept":
                doResolution(session, requestId, ResolutionType.ACCEPTED);
                break;
            case "decline":
                doResolution(session, requestId, ResolutionType.DECLINED);
                break;
            default:
                addValue("error", "unknown resolutionType");
                setBadRequest();
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String requestId = formData.getValueSilently("requestId");
        if (requestId.isEmpty()) {
            addContent("error", "requestId empty");
            setBadRequest();
            return;
        }

        if (formData.containsField("attachmentId")) {
            String attachmentId = formData.getValueSilently("attachmentId");
            deleteAttachment(session, requestId, attachmentId);
        } else {
            deleteRequest(session, requestId);
        }
    }

    private void addRequest(_Session session, String taskId, String requestTypeId, String comment) {
        try {
            RequestDAO requestDAO = new RequestDAO(session);
            TaskDAO taskDAO = new TaskDAO(session);
            Task task = taskDAO.findById(taskId);
            if (task == null) {
                addContent("error", "task not found");
                setBadRequest();
                return;
            }

            if (requestDAO.findUnResolvedRequest(task) != null) {
                addContent("error", "task has unresolved request");
                setBadRequest();
                return;
            } else if (task.getRequests() != null && task.getRequests().size() > 42) {
                addContent("error", "task: too more request?! Bad game bro");
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

            request.setEditors(task.getEditors());
            request.addReaderEditor(session.getUser());

            requestDAO.add(request);

            task.setStatus(TaskStatusType.PENDING);
            taskDAO.update(task);

            Messages.sendMessageOfNewRequest(session, request, task);
        } catch (SecureException e) {
            logError(e);
            setBadRequest();
        } catch (MsgException e) {
            setBadRequest();
            logError(e);
        }
    }

    private void doResolution(_Session session, String requestId, ResolutionType resolutionType) {
        try {
            RequestDAO requestDAO = new RequestDAO(session);
            Request request = requestDAO.findById(requestId);

            if (request == null || resolutionType == ResolutionType.UNKNOWN) {
                if (request == null) {
                    addContent("error", "request not found");
                }
                if (resolutionType == ResolutionType.UNKNOWN) {
                    addContent("error", "ResolutionType.UNKNOWN");
                }
                setBadRequest();
                return;
            }

            if (!request.getTask().getEditors().contains(session.getUser().getId())) {
                addContent("error", "task: has no editor access");
                setBadRequest();
                return;
            }

            TaskDAO taskDAO = new TaskDAO(session);
            Task task = request.getTask();
            if (resolutionType == ResolutionType.ACCEPTED) {
                switch (request.getRequestType().getName()) {
                    case "implement":
                        task.setStatus(TaskStatusType.COMPLETED);
                        break;
                    case "prolong":
                        // prolong new due date
                        Date newDueDate = TimeUtil.convertStringToDate(formData.getValueSilently("dueDate"));
                        if (newDueDate == null) {
                            _Validation ve = new _Validation();
                            ve.addError("dueDate", "date", getLocalizedWord("field_is_empty", session.getLang()));
                            setValidation(ve);
                            setBadRequest();
                            return;
                        }
                        task.setDueDate(newDueDate);
                        break;
                    case "cancel":
                        task.setStatus(TaskStatusType.CANCELLED);
                        break;
                    default:
                        setBadRequest();
                        addContent("error", "I don't know what you want. Unknown requestType.name: " + request.getRequestType().getName());
                        return;
                }
            } else {
                if ("implement".equals(request.getRequestType().getName())) {
                    task.setStatus(TaskStatusType.PROCESSING);
                }
            }
            taskDAO.update(task);

            request.setResolution(resolutionType);
            request.setResolutionTime(new Date());
            requestDAO.update(request);

            Messages.sendMessageOfRequestDecision(session, request);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        } catch (MsgException e) {
            setBadRequest();
            logError(e);
        }
    }

    private void deleteRequest(_Session session, String requestId) {
        RequestDAO requestDAO = new RequestDAO(session);
        Request request = requestDAO.findById(requestId);

        if (!request.getTask().getEditors().contains(session.getUser().getId()) || !request.getEditors().contains(request.getAuthorId())) {
            addContent("error", "(task|request): has no editor access");
            setBadRequest();
            return;
        }

        try {
            requestDAO.delete(request);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        }
    }

    private void deleteAttachment(_Session session, String requestId, String attachmentId) {
        try {
            RequestDAO requestDAO = new RequestDAO(session);
            Request request = requestDAO.findById(requestId);

            if (!request.getTask().getEditors().contains(session.getUser().getId()) && !request.getEditors().contains(session.getUser().getId())) {
                addContent("error", "(task|request): has no editor access");
                setBadRequest();
                return;
            }

            AttachmentDAO attachmentDAO = new AttachmentDAO(session);
            Attachment attachment = attachmentDAO.findById(attachmentId);
            request.getAttachments().remove(attachment);

            requestDAO.update(request);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        }
    }
}
