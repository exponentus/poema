package workflow.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.exponentus.common.domain.IDomain;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import administrator.model.User;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.domain.exception.ApprovalException;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;

public class OfficeMemoDomain implements IDomain {

	public OfficeMemo composeNew(User user, Employee appliedAuthor) throws ApprovalException {
		OfficeMemo om = new OfficeMemo();
		om.setAuthor(user);
		om.setAppliedRegDate(new Date());
		om.setAppliedAuthor(appliedAuthor);

		return om;
	}

	public void fillFromDto(OfficeMemo om, OfficeMemo dto, Employee author, _Session ses)
			throws DTOException, DAOException {
		validate(dto);

		om.setAppliedAuthor(dto.getAppliedAuthor());
		om.setAppliedRegDate(dto.getAppliedRegDate());
		om.setTitle(dto.getTitle());
		om.setBody(dto.getBody());
		om.setRecipient(dto.getRecipient());
		om.setAttachments(dto.getAttachments());
		om.setBlocks(dto.getBlocks());
		om.setSchema(dto.getSchema());

		EmployeeDAO eDao = new EmployeeDAO(ses);
		List<Observer> observers = new ArrayList<Observer>();
		for (Observer o : dto.getObservers()) {
			Observer observer = new Observer();
			observer.setEmployee(eDao.findById(o.getEmployee().getId()));
			observers.add(observer);
		}
		om.setObservers(observers);

		if (om.isNew()) {
			om.setVersion(1);
			om.setAuthor(author.getUser());
		}
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

	private void validate(OfficeMemo om) throws DTOException {
		DTOException e = new DTOException();
		if (om.getTitle() == null || om.getTitle().isEmpty()) {
			e.addError("title", "required", "field_is_empty");
		}
		if (om.getAppliedAuthor() == null) {
			e.addError("appliedAuthor", "required", "field_is_empty");
		}
		if (om.getRecipient() == null) {
			e.addError("recipient", "required", "field_is_empty");
		}
		if (e.hasError()) {
			throw e;
		}
	}

	public Outcome getOutcome(OfficeMemo om) {
		Outcome outcome = new Outcome();

		outcome.setTitle(om.getTitle());
		outcome.addPayload(om.getEntityKind(), om);
		if (!om.isNew()) {
			outcome.addPayload(new ACL(om));
		}

		return outcome;
	}

	@Override
	public Outcome getOutcome(IAppEntity<UUID> entity) {
		Outcome outcome = new Outcome();

		outcome.setTitle(entity.getTitle());
		outcome.addPayload(entity.getEntityKind(), entity);
		if (!entity.isNew()) {
			outcome.addPayload(new ACL(entity));
		}

		return outcome;
	}
}
