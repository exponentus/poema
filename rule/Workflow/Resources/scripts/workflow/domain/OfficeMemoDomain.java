package workflow.domain;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.OfficeMemoDAO;
import workflow.domain.exception.ApprovalException;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Block;

import java.util.*;

public class OfficeMemoDomain extends ApprovalDomain<OfficeMemo> {

    public OfficeMemoDomain(_Session ses) throws DAOException {
        super(ses);
        dao = new OfficeMemoDAO(ses);
    }

    public OfficeMemo composeNew(User user, Employee appliedAuthor) throws ApprovalException {
        OfficeMemo om = new OfficeMemo();
        om.setAuthor(user);
        om.setAppliedRegDate(new Date());
        om.setAppliedAuthor(appliedAuthor);

        return om;
    }

    @Override
    public OfficeMemo fillFromDto(OfficeMemo dto, IValidation<OfficeMemo> validation, String fsid) throws DTOException, DAOException {
        validation.check(dto);

        OfficeMemo entity = getEntity(dto);
        EmployeeDAO eDao = new EmployeeDAO(ses);
        entity.setAppliedAuthor(eDao.findById(dto.getAppliedAuthor().getId()));
        entity.setAppliedRegDate(dto.getAppliedRegDate());
        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setRecipient(dto.getRecipient());
        entity.setBlocks(normalizeBlocks(eDao, dto.getBlocks()));
        entity.setSchema(dto.getSchema());

        List<Observer> observers = new ArrayList<Observer>();
        for (Observer o : dto.getObservers()) {
            Observer observer = new Observer();
            observer.setEmployee(eDao.findById(o.getEmployee().getId()));
            observers.add(observer);
        }
        entity.setObservers(observers);

        if (entity.isNew()) {
            entity.setVersion(1);
            entity.setVersionsSupport(true);
            entity.setAuthor(ses.getUser());
        }

        dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), fsid));
        calculateReadersEditors(entity);
        return entity;
    }

    public boolean canCreateAssignment(OfficeMemo entity, User user) {
        return !entity.isNew() && entity.getRecipient().getUserID().equals(user.getId())
                && entity.getStatus() == ApprovalStatusType.FINISHED;
    }

    @Override
    public void calculateReadersEditors(OfficeMemo entity) {
        if (entity.getStatus() == ApprovalStatusType.DRAFT) {
            entity.addReaderEditor(entity.getAuthor());
        } else {
            entity.withdrawEditor(entity.getAuthor());
        }
        List<Observer> observers = entity.getObservers();
        if (observers != null) {
            for (Observer observer : observers) {
                entity.addReader(observer.getEmployee().getUserID());
            }
        }
    }


    @Override
    public OfficeMemo save(OfficeMemo entity) throws SecureException, DAOException, DTOException {
        if (entity.isNew()) {
            RegNum rn = new RegNum();
            entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
            entity = dao.add(entity, rn);
        } else {
            entity = dao.update(entity);
        }
        return entity;
    }

    @Override
    public Outcome getOutcome(OfficeMemo entity) {
        Outcome outcome = new Outcome();

        String entityKind = Environment.vocabulary.getWord("office_memo", ses.getLang());
        if (StringUtil.isEmpty(entity.getTitle())) {
            outcome.setTitle(entityKind);
        } else {
            outcome.setTitle(entityKind + " " + entity.getTitle());
        }
        outcome.addPayload(entity.getEntityKind(), entity);
        outcome.addPayload("contentTitle", "office_memo");
        if (!entity.isNew()) {
            outcome.addPayload(new ACL(entity));
            Block block = ApprovalLifecycle.getProcessingBlock(entity);
            if (block != null) {
                Map<String, Boolean> flags = new HashMap<>();
                flags.put("approvalProcessingBlockRequireCommentIfNo", block.isRequireCommentIfNo());
                outcome.addPayload("flag", flags);
            }
        }

        return outcome;
    }
}
