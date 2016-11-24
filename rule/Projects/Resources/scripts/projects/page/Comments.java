package projects.page;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.MsgException;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import projects.dao.CommentDAO;
import projects.dao.TaskDAO;
import projects.model.Comment;
import projects.model.Task;

public class Comments extends _DoForm {

	@Override
	public void doGET(_Session session, _WebFormData formData) {
		String taskId = formData.getValueSilently("taskId");
		if (taskId.isEmpty()) {
			addContent("error", "taskId empty");
			setBadRequest();
			return;
		}

		Task task = new Task();
		task.setId(UUID.fromString(taskId));

		CommentDAO commentDAO = new CommentDAO(session);
		int page = formData.getNumberValueSilently("page", 1);
		List<Comment> comments = commentDAO.findTaskComments(task, page, 20);
		addContent(comments);
	}

	@Override
	public void doPOST(_Session session, _WebFormData formData) {
		String taskId = formData.getValueSilently("taskId");
		if (taskId.isEmpty()) {
			addContent("error", "taskId empty");
			setBadRequest();
			return;
		}

		String commentId = formData.getValueSilently("commentId");
		saveComment(session, formData, taskId, commentId);
	}

	@Override
	public void doDELETE(_Session session, _WebFormData formData) {
		String commentId = formData.getValueSilently("commentId");
		if (commentId.isEmpty()) {
			addContent("error", "commentId empty");
			setBadRequest();
			return;
		}

		if (formData.containsField("attachmentId")) {
			String attachmentId = formData.getValueSilently("attachmentId");
			deleteAttachment(session, commentId, attachmentId);
		} else {
			deleteComment(session, commentId);
		}
	}

	private void saveComment(_Session session, _WebFormData formData, String taskId, String commentId) {
		try {
			TaskDAO taskDAO = new TaskDAO(session);
			Task task = taskDAO.findById(taskId);
			if (task == null) {
				addContent("error", "task not found");
				setBadRequest();
				return;
			}

			if (!task.getReaders().contains(session.getUser().getId())) {
				addContent("error", "task: no read access");
				setBadRequest();
				return;
			}

			_Validation ve = validateComment(formData, session.getLang());
			if (ve.hasError()) {
				setBadRequest();
				setValidation(ve);
				return;
			}

			CommentDAO commentDAO = new CommentDAO(session);
			Comment comment;
			boolean isNew = commentId.isEmpty();

			if (isNew) {
				comment = new Comment();
				comment.setTask(task);
			} else {
				comment = commentDAO.findById(commentId);
			}
			comment.setComment(formData.getValueSilently("comment"));
			comment.setAttachments(getActualAttachments(comment.getAttachments()));

			if (isNew) {
				commentDAO.add(comment);
			} else {
				commentDAO.update(comment);
			}

			//
			LanguageCode lang = session.getLang();
			List<String> recipients = new ArrayList<>();

			UserDAO userDAO = new UserDAO(session);
			if (comment.getTask().getAuthorId() == session.getUser().getId()) {
				IUser<Long> assigneeUser = userDAO.findById(comment.getTask().getAssignee());
				recipients.add(assigneeUser.getEmail());
			} else {
				IUser<Long> authorUser = userDAO.findById(comment.getTask().getAuthorId());
				recipients.add(authorUser.getEmail());
			}

			Memo memo = new Memo();
			MailAgent ma = new MailAgent();
			memo.addVar("taskTitle", task.getTitle());
			memo.addVar("comment", comment.getComment());
			memo.addVar("url", getCurrentAppEnv().getURL() + "/" + task.getURL());
			if (!ma.sendMessage(recipients, getLocalizedWord("notify_comment_subject", lang),
					memo.getBody(getLocalizedEmailTemplate("comment", lang)))) {
				addValue("notify", "ok");
			}
		} catch (SecureException e) {
			setBadRequest();
			logError(e);
		} catch (MsgException e) {
			setBadRequest();
			logError(e);
		} catch (DAOException e) {
			setBadRequest();
			logError(e);
		}
	}

	private void deleteComment(_Session session, String commentId) {
		CommentDAO commentDAO = new CommentDAO(session);
		Comment comment = commentDAO.findById(commentId);

		if (!comment.getTask().getEditors().contains(session.getUser().getId())) {
			addContent("error", "task: no editor access");
			setBadRequest();
			return;
		}

		try {
			commentDAO.delete(comment);
		} catch (SecureException | DAOException e) {
			setBadRequest();
			logError(e);
		}
	}

	private void deleteAttachment(_Session session, String commentId, String attachmentId) {
		if (commentId.isEmpty() || attachmentId.isEmpty()) {
			return;
		}

		CommentDAO commentDAO = new CommentDAO(session);
		Comment comment = commentDAO.findById(commentId);

		if (comment.getAuthorId() == session.getUser().getId()) {
			addContent("error", "not author");
			setBadRequest();
			return;
		}

		AttachmentDAO attachmentDAO = new AttachmentDAO(session);
		Attachment attachment = attachmentDAO.findById(attachmentId);
		comment.getAttachments().remove(attachment);

		try {
			commentDAO.update(comment);
		} catch (SecureException | DAOException e) {
			logError(e);
			setBadRequest();
		}
	}

	private _Validation validateComment(_WebFormData formData, LanguageCode lang) {
		_Validation ve = new _Validation();

		if (formData.getValueSilently("comment").isEmpty()) {
			ve.addError("comment", "required", getLocalizedWord("field_is_empty", lang));
		}

		return ve;
	}
}
