package workflow.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.exponentus.common.domain.DTOService;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import administrator.model.User;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.domain.exception.ApprovalException;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Block;

public class OfficeMemoDomain extends DTOService<OfficeMemo> {

	public OfficeMemoDomain(_Session ses) {
		super(ses);
	}

	public OfficeMemo composeNew(User user, Employee appliedAuthor) throws ApprovalException {
		OfficeMemo om = new OfficeMemo();
		om.setAuthor(user);
		om.setAppliedRegDate(new Date());
		om.setAppliedAuthor(appliedAuthor);

		return om;
	}

	@Override
	public void fillFromDto(OfficeMemo entity, OfficeMemo dto, IValidation<OfficeMemo> validation, String fsid)
			throws DTOException, DAOException {
		validation.check(dto);
		EmployeeDAO eDao = new EmployeeDAO(ses);
		entity.setAppliedAuthor(eDao.findById(dto.getAppliedAuthor().getId()));
		entity.setAppliedRegDate(dto.getAppliedRegDate());
		entity.setTitle(dto.getTitle());
		entity.setBody(dto.getBody());
		entity.setRecipient(dto.getRecipient());
		entity.setAttachments(dto.getAttachments());
		entity.setBlocks(dto.getBlocks());
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
			entity.setAuthor(ses.getUser());
		}

		dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), fsid));
		calculateReadersEditors(entity);
	}

	public boolean approvalCanBeStarted(OfficeMemo om) {
		return om.getStatus() == ApprovalStatusType.DRAFT;
	}

	public void startApproving(OfficeMemo om) throws ApprovalException, DTOException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
		lifecycle.start();
	}

	public boolean employeeCanDoDecisionApproval(OfficeMemo om, Employee employee) {
		return om.userCanDoDecision(employee);
	}

	public void acceptApprovalBlock(OfficeMemo om, IUser<Long> user) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
		lifecycle.accept(user);
	}

	public void declineApprovalBlock(OfficeMemo om, IUser<Long> user, String decisionComment) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
		lifecycle.decline(user, decisionComment);
	}

	public void skipApprovalBlock(OfficeMemo om) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(om);
		lifecycle.skip();
	}

	public boolean canCreateAssignment(OfficeMemo entity, User user) {
		return !entity.isNew() && entity.getRecipient().getUserID().equals(user.getId())
				&& entity.getStatus() == ApprovalStatusType.FINISHED;
	}

	public void calculateReadersEditors(OfficeMemo entity) {
		entity.resetReadersEditors();
		if (entity.getStatus() == ApprovalStatusType.DRAFT) {
			entity.addReaderEditor(entity.getAuthor());
		} else {
			entity.addReader(entity.getAuthor());
		}
		List<Observer> observers = entity.getObservers();
		if (observers != null) {
			for (Observer observer : observers) {
				entity.addReader(observer.getEmployee().getUserID());
			}
		}
	}

	public boolean documentCanBeDeleted(OfficeMemo om) {
		return !om.isNew() && om.isEditable();
	}

	@Override
	public Outcome getOutcome(OfficeMemo om) {
		Outcome outcome = new Outcome();

		outcome.setTitle(om.getTitle());
		outcome.addPayload(om.getEntityKind(), om);
		if (!om.isNew()) {
			outcome.addPayload(new ACL(om));
			Block block = ApprovalLifecycle.getProcessingBlock(om);
			if (block != null) {
				Map<String, Boolean> flags = new HashMap<>();
				flags.put("approvalProcessingBlockRequireCommentIfNo", block.isRequireCommentIfNo());
				outcome.addPayload("flag", flags);
			}
		}

		return outcome;
	}

}
