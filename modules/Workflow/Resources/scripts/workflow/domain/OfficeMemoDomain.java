package workflow.domain;

import administrator.model.User;
import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import org.apache.commons.lang3.StringUtils;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.OfficeMemoDAO;
import workflow.model.OfficeMemo;

import java.util.*;

@Deprecated
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
        String title = dto.getTitle();
        if (title == null || title.isEmpty()) {
            title = StringUtils.abbreviate(StringUtil.cleanFromMarkdown(dto.getBody()), 140);
        }
        entity.setTitle(title);
        entity.setBody(dto.getBody());
        entity.setRecipient(dto.getRecipient());
        entity.setBlocks(normalizeBlocks(eDao, dto.getBlocks()));
        entity.setApprovalSchema(dto.getApprovalSchema());

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
                && entity.getApprovalStatus() == ApprovalStatusType.FINISHED;
    }

    @Override
    public void calculateReadersEditors(OfficeMemo entity) {
        if (entity.getApprovalStatus() == ApprovalStatusType.DRAFT) {
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
            entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getEntityKind())));
            entity = dao.add(entity, rn);
        } else {
            entity = dao.update(entity);
        }
        return entity;
    }

    @Override
    public Outcome getOutcome(OfficeMemo entity) {
        Outcome outcome = new Outcome(entity);

        String entityKind = Environment.vocabulary.getWord("office_memo", ses.getLang());
        if (StringUtil.isEmpty(entity.getTitle())) {
            outcome.setTitle(entityKind);
        } else {
            outcome.setTitle(entityKind + " " + entity.getTitle());
        }
        outcome.setModel(entity);
        outcome.setPayloadTitle("office_memo");
        if (!entity.isNew()) {
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
