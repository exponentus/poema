package projects.page.form;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.eclipse.persistence.exceptions.DatabaseException;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.ACL;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.MsgException;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting.IPOJOObject;
import com.exponentus.scripting._Exception;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;

import administrator.dao.UserDAO;
import projects.dao.ProjectDAO;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import staff.dao.OrganizationDAO;

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
			IUser<Long> testerUser = null;
			if (!formData.getValueSilently("testerUserId").isEmpty()) {
				testerUser = userDAO.findById(formData.getNumberValueSilently("testerUserId", 0));
			}

			List<Long> ouIds = new ArrayList<>();
			if (!formData.getValueSilently("observerUserIds").isEmpty()) {
				ouIds = Arrays.stream(formData.getValueSilently("observerUserIds").split(",")).map(Long::valueOf).collect(Collectors.toList());
				for (long uid : ouIds) {
					IUser<Long> ou = userDAO.findById(uid);
					if (ou == null) {
						addContent("error", "observer user not found");
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
			project.setComment(formData.getValueSilently("comment"));
			project.setStatus(ProjectStatusType.valueOf(formData.getValueSilently("status")));
			project.setFinishDate(TimeUtil.convertStringToDate(formData.getValueSilently("finishDate")));
			project.setAttachments(getActualAttachments(project.getAttachments()));

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
				IUser<Long> user = session.getUser();
				project.addReaderEditor(user);
				project = dao.add(project);

				LanguageCode lang = session.getLang();
				List<String> recipients = new ArrayList<>();
				recipients.add(managerUser.getEmail());
				recipients.add(programmerUser.getEmail());
				if (testerUser != null) {
					recipients.add(testerUser.getEmail());
				}

				MailAgent ma = new MailAgent();
				Memo memo = new Memo(getLocalizedWord("notify_about_new_project_short", lang), getLocalizedEmailTemplate("newproject", lang));
				memo.addVar("manager", managerUser.getUserName());
				memo.addVar("programmer", programmerUser.getUserName());
				if (testerUser != null) {
					memo.addVar("tester", testerUser.getUserName());
				}
				memo.addVar("projectName", project.getName());
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
			setBadRequest();
			logError(e);
		} catch (MsgException e) {
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

		AttachmentDAO attachmentDAO = new AttachmentDAO(session);
		Attachment attachment = attachmentDAO.findById(attachmentId);
		project.getAttachments().remove(attachment);

		try {
			dao.update(project);
		} catch (SecureException e) {
			setBadRequest();
			logError(e);
		}
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
		if (!fDate.isEmpty() && TimeUtil.convertStringToDate(fDate) == null) {
			ve.addError("finishDate", "date", getLocalizedWord("date_format_does_not_match_to", lang) + " dd.MM.YYYY");
		}
		if (formData.getValueSilently("comment").length() > 2048) {
			ve.addError("comment", "maxlen_512", getLocalizedWord("field_is_too_long", lang));
		}

		return ve;
	}
}
