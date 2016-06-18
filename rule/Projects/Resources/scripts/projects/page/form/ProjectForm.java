package projects.page.form;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.common.model.Attachment;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.scripting.*;
import com.exponentus.scripting.event._DoPage;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.util.Util;
import com.exponentus.webserver.servlet.UploadedFile;
import org.apache.commons.io.IOUtils;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import staff.dao.OrganizationDAO;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectForm extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        Project entity;
        String projectId = formData.getValueSilently("projectId");

        if (!projectId.isEmpty()) {
            ProjectDAO dao = new ProjectDAO(session);
            entity = dao.findById(projectId);
            addValue("formsesid", Util.generateRandomAsText());

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
            entity = new Project();
            entity.setAuthor(user);
            entity.setRegDate(new Date());
            entity.setComment("");
            String fsId = formData.getValueSilently(EnvConst.FSID_FIELD_NAME);
            addValue("formsesid", fsId);
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
        devPrint(formData);
        try {
            _Validation ve = validate(formData, session.getLang());
            if (ve.hasError()) {
                setBadRequest();
                setValidation(ve);
                return;
            }

            UserDAO userDAO = new UserDAO(session);
            OrganizationDAO organizationDAO = new OrganizationDAO(session);
            ProjectDAO dao = new ProjectDAO(session);
            Project entity;
            String id = formData.getValueSilently("projectId");
            boolean isNew = id.isEmpty();

            if (isNew) {
                entity = new Project();
            } else {
                entity = dao.findById(id);
            }

            User managerUser = userDAO.findById(formData.getNumberValueSilently("managerUserId", 0));
            User programmerUser = userDAO.findById(formData.getNumberValueSilently("programmerUserId", 0));
            User testerUser = userDAO.findById(formData.getNumberValueSilently("testerUserId", 0));

            entity.setName(formData.getValue("name"));
            entity.setCustomer(organizationDAO.findById(formData.getValue("customerId")));
            entity.setManager(managerUser.getId());
            entity.setProgrammer(programmerUser.getId());
            entity.setTester(testerUser.getId());
            entity.setObservers(
                    Arrays.stream(formData.getListOfNumberValues("observerUserIds", 0)).map(Integer::longValue).collect(Collectors.toList()));
            entity.setComment(formData.getValue("comment"));
            entity.setStatus(ProjectStatusType.valueOf(formData.getValueSilently("status")));
            entity.setFinishDate(TimeUtil.convertStringToDate(formData.getValueSilently("finishDate")));

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

                entity.addReader(managerUser);
                entity.addReader(programmerUser);
                entity.addReader(testerUser);
                entity = dao.add(entity);

                LanguageCode lang = session.getLang();
                List<String> recipients = new ArrayList<String>();
                recipients.add(managerUser.getEmail());
                recipients.add(programmerUser.getEmail());
                recipients.add(testerUser.getEmail());
                MailAgent ma = new MailAgent();
                if (!ma.sendMail(recipients, getLocalizedWord("notify_about_new_project_short", lang),
                        getLocalizedWord("notify_about_new_project", lang))) {
                }
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
        String id = formData.getValueSilently("projectId");
        String attachmentId = formData.getValueSilently("attachment");

        if (id.isEmpty() || attachmentId.isEmpty()) {
            return;
        }

        ProjectDAO dao = new ProjectDAO(session);
        Project entity = dao.findById(id);

        List<Attachment> atts = entity.getAttachments();
        List<Attachment> forRemove = atts.stream()
                .filter(it -> attachmentId.equals(it.getIdentifier())).collect(Collectors.toList());
        atts.removeAll(forRemove);

        try {
            dao.update(entity);
        } catch (SecureException e) {
            setError(e);
        }
    }

    private _Validation validate(_WebFormData formData, LanguageCode lang) {
        _Validation ve = new _Validation();

        if (formData.getValueSilently("name").isEmpty()) {
            ve.addError("name", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("customerId").isEmpty()) {
            ve.addError("customerId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getNumberValueSilently("managerUserId", 0) == 0) {
            ve.addError("managerUserId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getNumberValueSilently("programmerUserId", 0) == 0) {
            ve.addError("programmerUserId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getNumberValueSilently("testerUserId", 0) == 0) {
            ve.addError("testerUserId", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getListOfNumberValues("observerUserIds", 0)[0] == 0) {
            ve.addError("observerUserIds", "required", getLocalizedWord("field_is_empty", lang));
        }
        if (formData.getValueSilently("status").isEmpty()) {
            ve.addError("status", "required", getLocalizedWord("field_is_empty", lang));
        }

        String fDate = formData.getValueSilently("finishDate");
        if (fDate.isEmpty()) {
            ve.addError("finishDate", "required", getLocalizedWord("field_is_empty", lang));
        } else if (TimeUtil.convertStringToDate(fDate) == null) {
            ve.addError("finishDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
        }

        return ve;
    }
}
