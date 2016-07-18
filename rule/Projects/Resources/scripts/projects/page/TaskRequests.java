package projects.page;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.eclipse.persistence.exceptions.DatabaseException;

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

import administrator.dao.UserDAO;
import projects.dao.RequestDAO;
import projects.dao.TaskDAO;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import reference.model.RequestType;

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

		// check read access
		// if
		// (!task.getProject().getEditors().contains(session.getUser().getId())
		// && !task.getReaders().contains(session.getUser().getId())) {
		// setBadRequest();
		// return;
		// }

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

			request.addReaderEditor(session.getUser());
			requestDAO.add(request);

			//
			LanguageCode lang = session.getLang();
			List<String> recipients = new ArrayList<>();

			UserDAO userDAO = new UserDAO(session);
			IUser<Long> authorUser = userDAO.findById(request.getTask().getAuthorId());
			recipients.add(authorUser.getEmail());

			MailAgent ma = new MailAgent();
			Memo memo = new Memo(getLocalizedWord("notify_about_task_request", lang), getLocalizedWord("notify_about_task_request", lang));
			if (!ma.sendMеssage(memo, recipients)) {
				addContent("notify", "ok");
			}
		} catch (DatabaseException e) {
			logError(e);
			setBadRequest();
		} catch (SecureException e) {
			logError(e);
			setBadRequest();
		} catch (MsgException e) {
			logError(e);
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

			if (!request.getTask().getEditors().contains(session.getUser().getId())) {
				setBadRequest();
				return;
			}

			request.setResolution(resolutionType);

			requestDAO.update(request);

			//
			LanguageCode lang = session.getLang();
			List<String> recipients = new ArrayList<>();

			UserDAO userDAO = new UserDAO(session);
			IUser<Long> assigneeUser = userDAO.findById(request.getTask().getAssignee());
			recipients.add(assigneeUser.getEmail());

			MailAgent ma = new MailAgent();
			Memo memo = new Memo(getLocalizedWord("notify_about_request_resolution", lang),
			        getLocalizedWord("notify_about_request_resolution", lang));
			if (!ma.sendMеssage(memo, recipients)) {
				addValue("notify", "ok");
			}
		} catch (DatabaseException e) {
			logError(e);
			setBadRequest();
		} catch (SecureException e) {
			logError(e);
			setBadRequest();
		} catch (MsgException e) {
			logError(e);
		}
	}

	private void deleteRequest(_Session session, String requestId) {
		RequestDAO requestDAO = new RequestDAO(session);
		Request request = requestDAO.findById(requestId);

		if (!request.getTask().getEditors().contains(session.getUser().getId()) && !request.getEditors().contains(request.getAuthorId())) {
			setBadRequest();
			return;
		}

		try {
			requestDAO.delete(request);
		} catch (SecureException e) {
			setError(e);
		}
	}

	private void deleteAttachment(_Session session, String requestId, String attachmentId) {
		try {
			RequestDAO requestDAO = new RequestDAO(session);
			Request request = requestDAO.findById(requestId);

			if (!request.getTask().getEditors().contains(session.getUser().getId()) && !request.getEditors().contains(session.getUser().getId())) {
				setBadRequest();
				return;
			}

			AttachmentDAO attachmentDAO = new AttachmentDAO(session);
			Attachment attachment = attachmentDAO.findById(attachmentId);
			request.getAttachments().remove(attachment);

			requestDAO.update(request);
		} catch (DatabaseException e) {
			logError(e);
			setBadRequest();
		} catch (SecureException e) {
			logError(e);
			setBadRequest();
		}
	}
}
