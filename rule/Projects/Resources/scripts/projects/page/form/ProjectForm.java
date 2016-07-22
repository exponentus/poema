package projects.page.form;

import administrator.dao.UserDAO;
import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.MsgException;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting.*;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import staff.dao.OrganizationDAO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectForm extends _DoForm {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        Project project;
        String projectId = formData.getValueSilently("projectId");

        if (!projectId.isEmpty()) {
            ProjectDAO dao = new ProjectDAO(session);
            project = dao.findById(projectId);

            if (formData.containsField("attachment")) {
                if (showAttachment(formData.getValueSilently("attachment"), project)) {
                    return;
                } else {
                    setBadRequest();
                }
            }

            addContent(project.getAttachments());
        } else {
            project = new Project();
            project.setAuthor(user);
            project.setComment("");
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

        addContent(project);
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
            Project project;
            String id = formData.getValueSilently("projectId");
            boolean isNew = id.isEmpty();

            if (isNew) {
                project = new Project();
            } else {
                project = dao.findById(id);
            }

            IUser<Long> managerUser = userDAO.findById(formData.getNumberValueSilently("managerUserId", 0));
            IUser<Long> programmerUser = userDAO.findById(formData.getNumberValueSilently("programmerUserId", 0));
            IUser<Long> testerUser = userDAO.findById(formData.getNumberValueSilently("testerUserId", 0));

            project.setName(formData.getValue("name"));
            project.setCustomer(organizationDAO.findById(formData.getValue("customerId")));
            project.setManager(managerUser.getId());
            project.setProgrammer(programmerUser.getId());
            project.setTester(testerUser.getId());
            project.setObservers(
                    Arrays.stream(formData.getValueSilently("observerUserIds", "0").split(",")).map(Long::valueOf).collect(Collectors.toList()));
            project.setComment(formData.getValue("comment"));
            project.setStatus(ProjectStatusType.valueOf(formData.getValueSilently("status")));
            project.setFinishDate(TimeUtil.convertStringToDate(formData.getValueSilently("finishDate")));
            project.setAttachments(getActualAttachments(project.getAttachments()));

            if (isNew) {
                IUser<Long> user = session.getUser();
                project.addReaderEditor(user);
                project = dao.add(project);
                LanguageCode lang = session.getLang();
                List<String> recipients = new ArrayList<>();
                recipients.add(managerUser.getEmail());
                recipients.add(programmerUser.getEmail());
                recipients.add(testerUser.getEmail());

                MailAgent ma = new MailAgent();
                Memo memo = new Memo(getLocalizedWord("notify_about_new_project_short", lang), getLocalizedEmailTemplate("newproject", lang));
                memo.addVar("manager", managerUser.getUserName());
                memo.addVar("programmer", programmerUser.getUserName());
                memo.addVar("tester", testerUser.getUserName());
                memo.addVar("$projectName$", project.getName());
                memo.addVar("author", project.getAuthor().getUserName());
                memo.addVar("url", session.getAppEnv().getURL() + "/" + project.getURL());
                if (!ma.sendMеssage(memo, recipients)) {
                    addContent("notify", "ok");
                }
            } else {
                project = dao.update(project);
            }
        } catch (SecureException e) {
            setError(e);
        } catch (_Exception | DatabaseException e) {
            logError(e);
            setBadRequest();
        } catch (MsgException e) {
            logError(e);
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String id = formData.getValueSilently("projectId");
        String attachmentId = formData.getValueSilently("attachmentId");

        if (id.isEmpty() || attachmentId.isEmpty()) {
            return;
        }

        ProjectDAO dao = new ProjectDAO(session);
        Project project = dao.findById(id);

        AttachmentDAO attachmentDAO = new AttachmentDAO(session);
        Attachment attachment = attachmentDAO.findById(attachmentId);
        project.getAttachments().remove(attachment);

        try {
            dao.update(project);
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
            ve.addError("customerUserId", "required", getLocalizedWord("field_is_empty", lang));
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
