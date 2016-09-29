package workflow.page.form;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.persistence.exceptions.DatabaseException;

import com.exponentus.common.model.ACL;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting.IPOJOObject;
import com.exponentus.scripting._Exception;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.webserver.servlet.UploadedFile;

import workflow.dao.OfficeMemoDAO;
import workflow.model.OfficeMemo;

public class OfficeMemoForm extends _DoForm {

	@Override
	public void doGET(_Session session, _WebFormData formData) {
		IUser<Long> user = session.getUser();
		OfficeMemo officeMemo;
		String id = formData.getValueSilently("docid");

		if (!id.isEmpty()) {
			OfficeMemoDAO dao = new OfficeMemoDAO(session);
			officeMemo = dao.findById(id);

			if (formData.containsField("attachment")) {
				doGetAttachment(session, formData, officeMemo);
				return;
			}

			addContent(officeMemo.getAttachments());
			addContent(new ACL(officeMemo));
		} else {
			officeMemo = new OfficeMemo();
			officeMemo.setAuthor(user);

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

		addContent(officeMemo);

		_ActionBar actionBar = new _ActionBar(session);
		actionBar.addAction(new _Action(getLocalizedWord("save_close", session.getLang()), "", _ActionType.SAVE_AND_CLOSE));
		actionBar.addAction(new _Action(getLocalizedWord("close", session.getLang()), "", _ActionType.CLOSE));

		addContent(actionBar);
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

			OfficeMemoDAO dao = new OfficeMemoDAO(session);
			OfficeMemo entity;
			String id = formData.getValueSilently("docid");
			boolean isNew = id.isEmpty();

			if (isNew) {
				entity = new OfficeMemo();
			} else {
				entity = dao.findById(id);
			}

			entity.setContent(formData.getValue("content"));
			entity.setSummary(formData.getValue("summary"));
			entity.setRegNumber(formData.getValue("regnumber"));
			entity.setAppliedRegDate(formData.getDateSilently("regdate"));
			entity.setAttachments(getActualAttachments(entity.getAttachments()));

			if (isNew) {
				IUser<Long> user = session.getUser();
				entity.addReaderEditor(user);
				entity = dao.add(entity);
			} else {
				entity = dao.update(entity);
			}
		} catch (SecureException e) {
			setError(e);
		} catch (_Exception | DatabaseException e) {
			logError(e);
			setBadRequest();
		}
	}

	private _Validation validate(_WebFormData formData, LanguageCode lang) {
		_Validation ve = new _Validation();

		if (formData.getValueSilently("summary").isEmpty()) {
			ve.addError("summary", "required", getLocalizedWord("field_is_empty", lang));
		}
		if (formData.getValueSilently("content").isEmpty()) {
			ve.addError("content", "required", getLocalizedWord("field_is_empty", lang));
		}

		return ve;
	}

	@Override
	public void doDELETE(_Session session, _WebFormData formData) {
		String id = formData.getValueSilently("docid");
		String attachmentId = formData.getValueSilently("attachment");
		String attachmentName = formData.getValueSilently("att-name");

		if (id.isEmpty() || attachmentId.isEmpty() || attachmentName.isEmpty()) {
			return;
		}

		OfficeMemoDAO dao = new OfficeMemoDAO(session);
		OfficeMemo entity = dao.findById(id);

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
}
