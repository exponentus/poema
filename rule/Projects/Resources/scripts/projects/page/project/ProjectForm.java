package projects.page.project;

import administrator.dao.UserDAO;
import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.ACL;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting.*;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.server.Server;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;
import org.eclipse.persistence.exceptions.DatabaseException;
import projects.dao.ProjectDAO;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import projects.other.Messages;
import reference.dao.DocumentLanguageDAO;
import staff.dao.EmployeeDAO;
import staff.dao.OrganizationDAO;
import staff.model.Employee;

import java.util.*;
import java.util.stream.Collectors;

/*
 * Не используется
 */

public class ProjectForm extends _DoForm {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        Project project;
        String projectId = formData.getValueSilently("projectId");
        try {
            if (!projectId.isEmpty()) {
                ProjectDAO dao = new ProjectDAO(session);
                project = dao.findById(projectId);

                if (formData.containsField("attachment")) {
                    doGetAttachment(session, formData, project);
                    return;
                }

                addContent(project.getAttachments());
                addContent(new ACL(project));
            } else {
                project = new Project();
                project.setAuthor(user);
                project.setComment("");
                project.setStatus(ProjectStatusType.DRAFT);
                String fsId = formData.getValueSilently(EnvConst.FSID_FIELD_NAME);
                List<String> formFiles = null;
                Object obj = session.getAttribute(fsId);
                if (obj == null) {
                    formFiles = new ArrayList<>();
                } else {
                    _FormAttachments fAtts = (_FormAttachments) obj;
                    formFiles = fAtts.getFiles().stream().map(TempFile::getRealFileName).collect(Collectors.toList());
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

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = new HashMap<>();
            List<Long> empIds = new ArrayList<>();
            empIds.add(project.getManager());
            empIds.add(project.getProgrammer());
            empIds.add(project.getTester());
            empIds.add(project.getAuthorId());
            if (project.getObservers() != null) {
                empIds.addAll(project.getObservers());
            }
            if (project.getRepresentatives() != null) {
                empIds.addAll(project.getRepresentatives());
            }
            for (Employee e : empDao.findAllByUserIds(empIds)) {
                emps.put(e.getUserID(), e);
            }
            addDataContent("employees", emps);

            addContent(new DocumentLanguageDAO(session).findAll());
            addContent(project);
            addContent(getActionBar(session, project));
        } catch (DAOException e) {
            Server.logger.errorLogEntry(e);
            setBadRequest();
        }
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
            IUser<Long> testerUser = null;
            if (!formData.getValueSilently("testerUserId").isEmpty()) {
                testerUser = userDAO.findById(formData.getNumberValueSilently("testerUserId", 0));
            }

            List<Long> ouIds = new ArrayList<>();
            if (!formData.getValueSilently("observerUserIds").isEmpty()) {
                ouIds = Arrays.stream(formData.getValueSilently("observerUserIds").split(",")).map(Long::valueOf)
                        .collect(Collectors.toList());
                for (long uid : ouIds) {
                    IUser<Long> ou = userDAO.findById(uid);
                    if (ou == null) {
                        addContent("error", "observer user not found");
                        setBadRequest();
                        return;
                    }
                }
            }

            List<Long> rpvIds = new ArrayList<>();
            if (!formData.getValueSilently("representativesUserIds").isEmpty()) {
                rpvIds = Arrays.stream(formData.getValueSilently("representativesUserIds").split(",")).map(Long::valueOf)
                        .collect(Collectors.toList());
                for (long uid : rpvIds) {
                    IUser<Long> ou = userDAO.findById(uid);
                    if (ou == null) {
                        addContent("error", "representative user not found");
                        setBadRequest();
                        return;
                    }
                }
            }

            project.setName(formData.getValue("name"));
            project.setCustomer(organizationDAO.findById(formData.getValue("customerId")));
            project.setManager(managerUser.getId());
            project.setProgrammer(programmerUser.getId());
            project.setTester(testerUser != null ? testerUser.getId() : 0);
            project.setObservers(ouIds);
            project.setRepresentatives(rpvIds);
            project.setComment(formData.getValueSilently("comment"));
            project.setStatus(ProjectStatusType.valueOf(formData.getValueSilently("status")));
            project.setFinishDate(TimeUtil.stringToDate(formData.getValueSilently("finishDate")));
            project.setAttachments(getActualAttachments(project.getAttachments()));
            project.setPrimaryLanguage(EnvConst.getDefaultLang());

            Set<Long> readers = new HashSet<>();
            readers.add(managerUser.getId());
            readers.add(programmerUser.getId());
            if (testerUser != null) {
                readers.add(testerUser.getId());
            }
            readers.add(session.getUser().getId());
            readers.addAll(ouIds);

            project.setReaders(readers);

            if (isNew) {
                project = dao.add(project);
                new Messages(getCurrentAppEnv()).sendOfNewProject(project);
            } else {
                project = dao.update(project);
            }

            addContent(project);
        } catch (SecureException e) {
            setError(e);
        } catch (_Exception | DatabaseException e) {
            setBadRequest();
            logError(e);
        } catch (DAOException e) {
            setBadRequest();
            logError(e);
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String id = formData.getValueSilently("projectId");
        String attachmentId = formData.getValueSilently("attachmentId");

        if (id.isEmpty() || attachmentId.isEmpty()) {
            addContent("error", "projectId or attachmentId empty");
            return;
        }

        ProjectDAO dao = new ProjectDAO(session);
        Project project = dao.findById(id);

        try {
            AttachmentDAO attachmentDAO = new AttachmentDAO(session);
            Attachment attachment = attachmentDAO.findById(attachmentId);
            project.getAttachments().remove(attachment);
            dao.update(project);
        } catch (SecureException | DAOException e) {
            setBadRequest();
            logError(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Project project) {
        _ActionBar actionBar = new _ActionBar(session);
        if (project.isEditable()) {
            actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
            if (!project.isNew()) {
                actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
            }
        }
        return actionBar;
    }

    private _Validation validate(_WebFormData formData, LanguageCode lang) {
        _Validation ve = new _Validation();

        if (formData.getValueSilently("name").isEmpty()) {
            ve.addError("name", "required", getLocalizedWord("field_is_empty", lang));
        } else if (formData.getValueSilently("name").length() > 140) {
            ve.addError("name", "maxlen_140", getLocalizedWord("field_is_too_long", lang));
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
        /*
         * if (formData.getNumberValueSilently("testerUserId", 0) == 0) {
		 * ve.addError("testerUserId", "required",
		 * getLocalizedWord("field_is_empty", lang)); }
		 */
        if (formData.getValueSilently("status").isEmpty()) {
            ve.addError("status", "required", getLocalizedWord("field_is_empty", lang));
        }

        String fDate = formData.getValueSilently("finishDate");
        if (!fDate.isEmpty() && TimeUtil.stringToDate(fDate) == null) {
            ve.addError("finishDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
        }
        if (formData.getValueSilently("comment").length() > 2048) {
            ve.addError("comment", "maxlen_2048", getLocalizedWord("field_is_too_long", lang));
        }

        return ve;
    }
}
