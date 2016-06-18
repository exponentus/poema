package projects.page.form;

import com.exponentus.common.model.Attachment;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting.*;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;
import org.apache.commons.io.IOUtils;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.dao.TaskDAO;
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
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class TaskForm extends _DoForm {

    @SuppressWarnings("unchecked")
    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        Task entity;
        String id = formData.getValueSilently("taskId");

        if (!id.isEmpty()) {
            TaskDAO dao = new TaskDAO(session);
            entity = dao.findById(UUID.fromString(id));

            String attachmentId = formData.getValueSilently("attachment");
            if (!attachmentId.isEmpty() && entity.getAttachments() != null) {
                Attachment att = entity.getAttachments().stream().filter(it -> it.getIdentifier().equals(attachmentId)).findFirst().get();
                if (showAttachment(att)) {
                    return;
                } else {
                    setBadRequest();
                }
            }
        } else {
            entity = new Task();
            entity.setAuthor(user);
            entity.setRegDate(new Date());
            TaskTypeDAO tDao = new TaskTypeDAO(session);
            entity.setTaskType(tDao.findByName("Programming"));
            entity.setStartDate(new Date());
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

        addContent(entity);
        startSaveFormTransact(entity);
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

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String id = formData.getValueSilently("taskId");
        String attachmentId = formData.getValueSilently("attachment");

        if (id.isEmpty() || attachmentId.isEmpty()) {
            return;
        }

        TaskDAO dao = new TaskDAO(session);
        Task entity = dao.findById(id);

        List<Attachment> atts = entity.getAttachments();
        List<Attachment> forRemove = atts.stream().filter(it -> attachmentId.equals(it.getIdentifier())).collect(Collectors.toList());
        atts.removeAll(forRemove);

        try {
            dao.update(entity);
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
