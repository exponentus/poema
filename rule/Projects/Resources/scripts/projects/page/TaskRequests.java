package projects.page;

import administrator.dao.UserDAO;
import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.exception.MsgException;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import projects.model.constants.TaskStatusType;
import reference.model.RequestType;

import java.util.ArrayList;
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
        String resolution = formData.getValueSilently("resolution");
        ResolutionType resolutionType = ResolutionType.valueOf(resolution);

        if (resolutionType == ResolutionType.UNKNOWN) {
            addContent("error", "unknown resolutionType");
            setBadRequest();
            return;
        }

        doResolution(session, requestId, resolutionType);
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

            // Notify task author about request
            LanguageCode lang = session.getLang();
            List<String> recipients = new ArrayList<>();

            UserDAO userDAO = new UserDAO(session);
            IUser<Long> authorUser = userDAO.findById(request.getTask().getAuthorId());
            recipients.add(authorUser.getEmail());

            MailAgent ma = new MailAgent();
            Memo memo = new Memo(getLocalizedWord("notify_about_task_request", lang), getLocalizedEmailTemplate("newrequest", lang));
            memo.addVar("taskTitle", task.getTitle());
            memo.addVar("requestType", request.getRequestType().getLocalizedName(lang));
            memo.addVar("comment", request.getComment());
            memo.addVar("author", session.getUser().getUserName());
            memo.addVar("url", session.getAppEnv().getURL() + "/" + task.getURL());
            if (ma.sendMеssage(memo, recipients)) {
                addValue("notify", "ok");
            }
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

            if (resolutionType == ResolutionType.ACCEPT) {
                TaskDAO taskDAO = new TaskDAO(session);
                Task task = request.getTask();
                if ("implement".equals(request.getRequestType().getName())) {
                    task.setStatus(TaskStatusType.FINISHED);
                } else if ("prolong".equals(request.getRequestType().getName())) {
                    // prolong new due date
                    task.setDueDate(TimeUtil.convertStringToDate(formData.getValueSilently("dueDate")));
                } else if ("cancel".equals(request.getRequestType().getName())) {
                    task.setStatus(TaskStatusType.CANCELED);
                } else {
                    setBadRequest();
                    addContent("error", "I don't know what you want. Unknown requestType");
                    return;
                }
                taskDAO.update(task);
            }

            request.setResolution(resolutionType);
            requestDAO.update(request);

            // Notify assigneeUser about resolution
            LanguageCode lang = session.getLang();
            List<String> recipients = new ArrayList<>();

            UserDAO userDAO = new UserDAO(session);
            IUser<Long> assigneeUser = userDAO.findById(request.getTask().getAssignee());
            recipients.add(assigneeUser.getEmail());

            MailAgent ma = new MailAgent();
            Memo memo = new Memo(getLocalizedWord("notify_about_request_resolution", lang), getLocalizedEmailTemplate("request_resolution", lang));
            memo.addVar("taskTitle", request.getTask().getTitle());
            memo.addVar("taskAuthor", request.getTask().getAuthor().getUserName());
            memo.addVar("requestType", request.getRequestType().getName());
            memo.addVar("requestComment", request.getComment());
            memo.addVar("requestResolution", request.getResolution().name());
            memo.addVar("url", session.getAppEnv().getURL() + "/" + request.getTask().getURL());
            if (ma.sendMеssage(memo, recipients)) {
                addValue("notify", "ok");
            }
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

        if (!request.getTask().getEditors().contains(session.getUser().getId())
                || !request.getEditors().contains(request.getAuthorId())) {
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

            if (!request.getTask().getEditors().contains(session.getUser().getId())
                    && !request.getEditors().contains(session.getUser().getId())) {
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
