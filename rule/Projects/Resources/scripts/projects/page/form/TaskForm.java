package projects.page.form;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.scripting.*;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.dao.TaskDAO;
import projects.model.Task;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.dao.TagDAO;
import reference.dao.TaskTypeDAO;
import reference.model.Tag;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class TaskForm extends _DoForm {

    @SuppressWarnings("unchecked")
    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        Task task;
        String id = formData.getValueSilently("taskId");

        if (!id.isEmpty()) {
            TaskDAO dao = new TaskDAO(session);
            task = dao.findById(UUID.fromString(id));

            if (formData.containsField("attachment")) {
                if (showAttachment(formData.getValueSilently("attachment"), task)) {
                    return;
                } else {
                    setBadRequest();
                }
            }

            addContent(task.getAttachments());
        } else {
            task = new Task();
            task.setAuthor(user);
            TaskTypeDAO tDao = new TaskTypeDAO(session);
            task.setTaskType(tDao.findByName("Programming"));
            task.setStartDate(new Date());
            String fsId = formData.getValueSilently(EnvConst.FSID_FIELD_NAME);

            List<String> formFiles = null;
            Object obj = session.getAttribute(fsId);
            if (obj == null) {
                formFiles = new ArrayList<>();
            } else {
                formFiles = (List<String>) obj;
            }

            List<IPOJOObject> filesToPublish = new ArrayList<>();

            for (String fn : formFiles) {
                UploadedFile uf = (UploadedFile) session.getAttribute(fsId + "_file" + fn);
                if (uf == null) {
                    uf = new UploadedFile();
                    uf.setName(fn);
                    session.setAttribute(fsId + "_file" + fn, uf);
                }
                filesToPublish.add(uf);
            }
            addContent(new _POJOListWrapper<>(filesToPublish, session));
        }

        addContent(task);
    }

    @Override
    public void doPOST(_Session session, _WebFormData formData) {
        try {
            _Validation ve = validate(formData, session.getLang());
            if (ve.hasError()) {
                setBadRequest();
                setValidation(ve);
                return;
            }

            UserDAO userDAO = new UserDAO(session);
            ProjectDAO projectDAO = new ProjectDAO(session);
            TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
            TaskDAO dao = new TaskDAO(session);
            Task task;
            String id = formData.getValueSilently("taskId");
            boolean isNew = id.isEmpty();

            if (isNew) {
                task = new Task();
            } else {
                task = dao.findById(id);
            }

            task.setProject(projectDAO.findById(formData.getValue("projectId")));
            task.setTaskType(taskTypeDAO.findById(formData.getValue("taskTypeId")));
            task.setStatus(TaskStatusType.valueOf(formData.getValueSilently("status")));
            task.setPriority(TaskPriorityType.valueOf(formData.getValueSilently("priority")));
            task.setStartDate(TimeUtil.convertStringToDate(formData.getValueSilently("startDate")));
            task.setDueDate(TimeUtil.convertStringToDate(formData.getValueSilently("dueDate")));
            task.setBody(formData.getValue("body"));
            User assigneeUser = userDAO.findById(formData.getNumberValueSilently("assigneeUserId", 0));
            task.setAssignee(assigneeUser.getId());

            if (formData.containsField("tagIds")) {
                String[] tagIds = formData.getListOfValuesSilently("tagIds");
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
                    task.setTags(tags);
                }
            }

            task.setAttachments(getActualAttachments(task.getAttachments()));

            if (isNew) {
                IUser<Long> user = session.getUser();
                task.addReaderEditor(user);
                task.addReader(assigneeUser);
                task = dao.add(task);
            } else {
                task = dao.update(task);
            }

            LanguageCode lang = session.getLang();
            List<String> recipients = new ArrayList<>();
            recipients.add(assigneeUser.getEmail());
            // Message Queue ~ p4elka events
            MailAgent ma = new MailAgent();
            if (!ma.sendMail(recipients, getLocalizedWord("notify_about_new_task_short", lang),
                    getLocalizedWord("notify_about_new_task", lang))) {
            }
        } catch (SecureException e) {
            setError(e);
        } catch (_Exception | DatabaseException e) {
            error(e);
            setBadRequest();
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String id = formData.getValueSilently("taskId");
        String attachmentId = formData.getValueSilently("attachmentId");

        if (id.isEmpty() || attachmentId.isEmpty()) {
            return;
        }

        TaskDAO dao = new TaskDAO(session);
        Task task = dao.findById(id);

        AttachmentDAO attachmentDAO = new AttachmentDAO(session);
        Attachment attachment = attachmentDAO.findById(attachmentId);
        task.getAttachments().remove(attachment);

        try {
            dao.update(task);
        } catch (SecureException e) {
            setError(e);
        }
    }

    private _Validation validate(_WebFormData formData, LanguageCode lang) {
        _Validation ve = new _Validation();

        if (formData.getValueSilently("projectId").isEmpty()) {
            ve.addError("projectId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("taskTypeId").isEmpty()) {
            ve.addError("taskTypeId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("body").isEmpty()) {
            ve.addError("body", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("status").isEmpty()) {
            ve.addError("status", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("priority").isEmpty()) {
            ve.addError("priority", "required", getLocalizedWord("field_is_empty", lang));
        }
        String sDate = formData.getValueSilently("startDate");
        if (sDate.isEmpty()) {
            ve.addError("startDate", "required", getLocalizedWord("field_is_empty", lang));
        } else if (TimeUtil.convertStringToDate(sDate) == null) {
            ve.addError("startDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
        }

        String dDate = formData.getValueSilently("startDate");
        if (dDate.isEmpty()) {
            ve.addError("dueDate", "required", getLocalizedWord("field_is_empty", lang));
        } else if (TimeUtil.convertStringToDate(dDate) == null) {
            ve.addError("dueDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
        }

        if (formData.getNumberValueSilently("assigneeUserId", 0) == 0) {
            ve.addError("assigneeUserId", "required", getLocalizedWord("field_is_empty", lang));
        }

        return ve;
    }
}
