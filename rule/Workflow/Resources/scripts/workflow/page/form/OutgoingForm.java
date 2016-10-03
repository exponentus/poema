package workflow.page.form;

import com.exponentus.common.dao.AttachmentDAO;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting.*;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.scripting.event._DoForm;
import com.exponentus.user.IUser;
import com.exponentus.util.TimeUtil;
import com.exponentus.webserver.servlet.UploadedFile;
import org.eclipse.persistence.exceptions.DatabaseException;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.OrganizationDAO;
import workflow.dao.OutgoingDAO;
import workflow.model.Outgoing;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class OutgoingForm extends _DoForm {

    @SuppressWarnings("unchecked")
    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        Outgoing entity;
        String id = formData.getValueSilently("docid");

        if (!id.isEmpty()) {
            OutgoingDAO dao = new OutgoingDAO(session);
            entity = dao.findById(UUID.fromString(id));

            if (formData.containsField("attachment")) {
                doGetAttachment(session, formData, entity);
                return;
            }
        } else {
            entity = new Outgoing();
            entity.setAuthor(user);

            String fsId = formData.getValueSilently(EnvConst.FSID_FIELD_NAME);

            List<String> formFiles;
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

        addContent(entity);
        addContent(getActionBar(session, entity));
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

            OrganizationDAO organizationDAO = new OrganizationDAO(session);
            DocumentTypeDAO documentTypeDAO = new DocumentTypeDAO(session);
            DocumentLanguageDAO documentLanguageDAO = new DocumentLanguageDAO(session);
            OutgoingDAO dao = new OutgoingDAO(session);
            Outgoing entity;
            String id = formData.getValueSilently("docid");
            boolean isNew = id.isEmpty();

            if (isNew) {
                entity = new Outgoing();
            } else {
                entity = dao.findById(id);
            }

            entity.setTitle(formData.getValue("title"));
            entity.setAppliedRegDate(TimeUtil.stringToDate(formData.getValueSilently("appliedRegDate")));
            entity.setDocLanguage(documentLanguageDAO.findById(formData.getValue("docLanguage")));
            entity.setDocType(documentTypeDAO.findById(formData.getValue("docType")));
            entity.setRecipient(organizationDAO.findById(formData.getValue("recipient")));
            entity.setSummary(formData.getValue("summary"));
            entity.setAttachments(getActualAttachments(entity.getAttachments()));

            if (isNew) {
                IUser<Long> user = session.getUser();
                entity.addReaderEditor(user);
                entity = dao.add(entity);
            } else {
                entity = dao.update(entity);
            }

            addContent(entity);
        } catch (SecureException e) {
            setError(e);
        } catch (_Exception | DatabaseException e) {
            logError(e);
            setBadRequest();
        }
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {
        String id = formData.getValueSilently("docid");
        String attachmentId = formData.getValueSilently("attachment");

        if (id.isEmpty() || attachmentId.isEmpty()) {
            addContent("error", "docid or attachmentId empty");
            return;
        }

        OutgoingDAO dao = new OutgoingDAO(session);
        Outgoing entity = dao.findById(id);

        AttachmentDAO attachmentDAO = new AttachmentDAO(session);
        Attachment attachment = attachmentDAO.findById(attachmentId);
        entity.getAttachments().remove(attachment);

        try {
            dao.update(entity);
        } catch (SecureException e) {
            setBadRequest();
            logError(e);
        }
    }

    private _ActionBar getActionBar(_Session session, Outgoing entity) {
        _ActionBar actionBar = new _ActionBar(session);
        if (entity.isEditable()) {
            actionBar.addAction(new _Action(getLocalizedWord("save_close", session.getLang()), "", _ActionType.SAVE_AND_CLOSE));
            actionBar.addAction(new _Action(getLocalizedWord("close", session.getLang()), "", _ActionType.CLOSE));
        }

        return actionBar;
    }

    private _Validation validate(_WebFormData formData, LanguageCode lang) {
        _Validation ve = new _Validation();

        if (formData.getValueSilently("summary").isEmpty()) {
            ve.addError("summary", "required", getLocalizedWord("field_is_empty", lang));
        }

        return ve;
    }
}
