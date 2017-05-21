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
import reference.model.constants.ApprovalSchemaType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.domain.exception.ApprovalException;
import workflow.model.Outgoing;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Block;

public class OutgoingDomain extends DTOService<Outgoing> {

	public OutgoingDomain(_Session session) {
		super(session);
	}

	public Outgoing composeNew(User user) {
		Outgoing entity = new Outgoing();
		entity.setAppliedRegDate(new Date());
		return entity;
	}

	@Override
	public void fillFromDto(Outgoing entity, Outgoing dto, IValidation<Outgoing> validation, String fsid)
			throws DTOException, DAOException {
		validation.check(dto);
		EmployeeDAO eDao = new EmployeeDAO(ses);
		entity.setAppliedRegDate(dto.getAppliedRegDate());
		entity.setTitle(dto.getTitle());
		entity.setDocSubject(dto.getDocSubject());
		entity.setDocLanguage(dto.getDocLanguage());
		entity.setDocType(dto.getDocType());
		entity.setRecipient(dto.getRecipient());
		entity.setBody(dto.getBody());
		entity.setRecipient(dto.getRecipient());
		entity.setBlocks(dto.getBlocks());
		entity.setSchema(dto.getSchema());
		if (entity.getSchema() == ApprovalSchemaType.WITHOUT_APPROVAL) {
			entity.setStatus(ApprovalStatusType.FINISHED);
		}

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

	private void calculateReadersEditors(Outgoing entity) {
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

	public boolean approvalCanBeStarted(Outgoing outgoing) {
		return outgoing.getStatus() == ApprovalStatusType.DRAFT;
	}

	public void startApproving(Outgoing outgoing) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
		lifecycle.start();
	}

	public boolean employeeCanDoDecisionApproval(Outgoing outgoing, Employee employee) {
		return outgoing.userCanDoDecision(employee);
	}

	public void acceptApprovalBlock(Outgoing outgoing, IUser<Long> user) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
		lifecycle.accept(user);
	}

	public void declineApprovalBlock(Outgoing outgoing, IUser<Long> user, String decisionComment)
			throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
		lifecycle.decline(user, decisionComment);
	}

	public void skipApprovalBlock(Outgoing outgoing) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(outgoing);
		lifecycle.skip();
	}

	@Override
	public Outcome getOutcome(Outgoing entity) {
		Outcome outcome = new Outcome();

		outcome.setTitle(entity.getTitle());
		outcome.addPayload(entity);
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
