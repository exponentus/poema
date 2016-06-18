package projects.page;

import com.exponentus.common.model.Attachment;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting._Exception;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import org.apache.commons.io.IOUtils;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.dao.TaskDAO;
import projects.model.Comment;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.dao.TaskTypeDAO;
import reference.model.Tag;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
            responseTaskComments(taskDAO, task);
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

        } catch (DatabaseException | IOException e) {
            error(e);
            setBadRequest();
        }
    }

    @Override
    public void doPUT(_Session session, _WebFormData formData) {
        String commentId = formData.getValueSilently("commentId");
        saveComment(session, formData);
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        deleteAttachment(session, formData);
    }

    private void responseTaskComments(TaskDAO taskDAO, Task task) {
        List<Comment> comments = taskDAO.findTaskComments(task);
        addContent(comments);
    }

    private void saveComment(_Session session, _WebFormData formData) {
        try {
            _Validation ve = validateComment(formData, session.getLang());
            if (ve.hasError()) {
                setBadRequest();
                setValidation(ve);
                return;
            }

            ProjectDAO projectDAO = new ProjectDAO(session);
            TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
            TaskDAO dao = new TaskDAO(session);
            Task entity;
            String id = formData.getValueSilently("taskId");
            boolean isNew = id.isEmpty();

            if (isNew) {
                entity = new Task();
            } else {
                entity = dao.findById(id);
            }

            entity.setProject(projectDAO.findById(formData.getValue("projectId")));
            entity.setTaskType(taskTypeDAO.findById(formData.getValue("taskTypeId")));
            entity.setStatus(TaskStatusType.valueOf(formData.getValueSilently("status")));
            entity.setPriority(TaskPriorityType.valueOf(formData.getValueSilently("priority")));
            entity.setStartDate(TimeUtil.convertStringToDate(formData.getValueSilently("startDate")));
            entity.setDueDate(TimeUtil.convertStringToDate(formData.getValueSilently("dueDate")));
            entity.setBody(formData.getValue("body"));
            entity.setAssignee((long) formData.getNumberValueSilently("assigneeUserId", 0));

            if (formData.containsField("tag_ids")) {
                String[] tagIds = formData.getListOfValuesSilently("tag_ids");
                if (tagIds.length > 0) {
                    List<Tag> tags = new ArrayList<>();
                    TagDAO tagDAO = new TagDAO(session);
                    for (String tagId : tagIds) {
                        if (!tagId.isEmpty()) {
                            Tag tag = tagDAO.findById(UUID.fromString(tagId));
                            if (tag != null) {
                                tags.add(tag);
                            }
                        }
                    }
                    entity.setTags(tags);
                }
            }

            String[] fileNames = formData.getListOfValuesSilently("fileid");
            if (fileNames.length > 0) {
                File userTmpDir = new File(Environment.tmpDir + File.separator + session.getUser().getUserID());
                for (String fn : fileNames) {
                    File file = new File(userTmpDir + File.separator + fn);
                    InputStream is = new FileInputStream(file);
                    Attachment att = new Attachment();
                    att.setRealFileName(fn);
                    att.setFile(IOUtils.toByteArray(is));
                    entity.getAttachments().add(att);
                }
            }

            if (isNew) {
                IUser<Long> user = session.getUser();
                entity.addReaderEditor(user);
                entity = dao.add(entity);
            } else {
                entity = dao.update(entity);
            }

            finishSaveFormTransact(entity);
        } catch (SecureException e) {
            setError(e);
        } catch (_Exception | DatabaseException | IOException e) {
            error(e);
            setBadRequest();
        }
    }

    private void deleteAttachment(_Session session, _WebFormData formData) {
        String id = formData.getValueSilently("taskId");
        String attachmentId = formData.getValueSilently("attachment");
        String attachmentName = formData.getValueSilently("att-name");

        if (id.isEmpty() || attachmentId.isEmpty() || attachmentName.isEmpty()) {
            return;
        }

        TaskDAO dao = new TaskDAO(session);
        Task entity = dao.findById(id);

        List<Attachment> atts = entity.getAttachments();
        List<Attachment> forRemove = atts.stream()
                .filter(it -> attachmentId.equals(it.getIdentifier()) && it.getRealFileName().equals(attachmentName)).collect(Collectors.toList());
        atts.removeAll(forRemove);

        try {
            dao.update(entity);
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
