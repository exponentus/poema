package projects.page;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import org.apache.commons.io.IOUtils;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.CommentDAO;
import projects.dao.TaskDAO;
import projects.model.Comment;
import projects.model.Task;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Comments extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        if (taskId.isEmpty()) {
            setBadRequest();
            return;
        }

        TaskDAO taskDAO = new TaskDAO(session);
        Task task = taskDAO.findById(taskId);
        if (task != null) {
            CommentDAO commentDAO = new CommentDAO(session);
            int page = formData.getNumberValueSilently("page", 1);
            List<Comment> comments = commentDAO.findTaskComments(task, 0, 20);
            addContent(comments);
        } else {
            setBadRequest();
        }
    }

    @Override
    public void doPOST(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        if (taskId.isEmpty()) {
            setBadRequest();
            return;
        }

        saveComment(session, taskId, "");
    }

    @Override
    public void doPUT(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        String commentId = formData.getValueSilently("commentId");
        if (taskId.isEmpty() || commentId.isEmpty()) {
            setBadRequest();
            return;
        }

        saveComment(session, taskId, commentId);
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String taskId = formData.getValueSilently("taskId");
        String commentId = formData.getValueSilently("commentId");
        if (taskId.isEmpty() || commentId.isEmpty()) {
            setBadRequest();
            return;
        }

        String attachmentId = formData.getValueSilently("attachmentId");
        if (attachmentId.isEmpty()) {
            deleteComment(session, taskId, commentId);
        } else {
            deleteAttachment(session, taskId, attachmentId);
        }
    }

    private void saveComment(_Session session, String taskId, String commentId) {
        try {
            TaskDAO taskDAO = new TaskDAO(session);
            Task task = taskDAO.findById(taskId);
            if (task != null) {
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
            Comment comment = new Comment();
            comment.setComment(formData.getValueSilently("comment"));

            String[] fileNames = formData.getListOfValuesSilently("fileid");
            if (fileNames.length > 0) {
                File userTmpDir = new File(Environment.tmpDir + File.separator + session.getUser().getUserID());
                for (String fn : fileNames) {
                    File file = new File(userTmpDir + File.separator + fn);
                    InputStream is = new FileInputStream(file);
                    Attachment att = new Attachment();
                    att.setRealFileName(fn);
                    att.setFile(IOUtils.toByteArray(is));
                    comment.getAttachments().add(att);
                }
            }

            commentDAO.add(comment);

        } catch (DatabaseException | IOException e) {
            error(e);
            setBadRequest();
        } catch (SecureException e) {
            setError(e);
        }
    }

    private void deleteComment(_Session session, String taskId, String commentId) {
        CommentDAO commentDAO = new CommentDAO(session);
        Comment comment = commentDAO.findById(commentId);

        try {
            commentDAO.delete(comment);
        } catch (SecureException e) {
            setError(e);
        }
    }

    private void deleteAttachment(_Session session, String taskId, String attachmentId) {
        if (taskId.isEmpty() || attachmentId.isEmpty()) {
            return;
        }

        TaskDAO dao = new TaskDAO(session);
        Task task = dao.findById(taskId);

        AttachmentDAO attachmentDAO = new AttachmentDAO(session);
        Attachment attachment = attachmentDAO.findById(attachmentId);
        task.getAttachments().remove(attachment);

        try {
            dao.update(task);
        } catch (SecureException e) {
            setError(e);
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
