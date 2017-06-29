package workflow.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;

import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.ActionableDocumentDAO;
import workflow.dao.AssignmentDAO;
import workflow.dao.IncomingDAO;
import workflow.model.ActionableDocument;
import workflow.model.Assignment;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;

public class AssignmentDomain extends CommonDomain<Assignment> {

	public AssignmentDomain(_Session session) throws DAOException {
		super(session);
		dao = new AssignmentDAO(ses);
	}

	public Assignment composeNew(Employee author, ActionableDocument primary, Assignment parent) {
		Assignment entity = new Assignment();
		entity.setAuthor(author.getUser());
		entity.setAppliedAuthor(author);
		entity.setPrimary(primary);
		entity.setParent(parent);
		entity.setStartDate(new Date());
		entity.setStatus(ControlStatusType.DRAFT);
		return entity;
	}

	@Override
	public Assignment fillFromDto(Assignment dto, IValidation<Assignment> validation, String formSesId) throws DTOException, DAOException {
		validation.check(dto);
		Assignment entity;

		if (dto.isNew()) {
			entity = new Assignment();
		} else {
			entity = dao.findById(dto.getId());
		}
		EmployeeDAO eDao = new EmployeeDAO(ses);
		Employee appliedAuthor = dto.getAppliedAuthor();
		if (appliedAuthor != null) {
			appliedAuthor = eDao.findById(dto.getAppliedAuthor().getId());
		} else {
			appliedAuthor = eDao.findByUser(ses.getUser());
		}
		entity.setAppliedAuthor(appliedAuthor);
		entity.setAppliedRegDate(dto.getAppliedRegDate());
		entity.setTitle(dto.getTitle());
		entity.setBody(dto.getBody());

		Assignment parent = dto.getParent();
		if (parent != null) {
			entity.setParent(dao.findById(parent.getId()));
		}
		IncomingDAO adDao = new IncomingDAO(ses);
		entity.setPrimary(adDao.findById(dto.getPrimary().getId()));

		List<Observer> observers = new ArrayList<Observer>();
		for (Observer o : dto.getObservers()) {
			Observer observer = new Observer();
			observer.setEmployee(eDao.findById(o.getEmployee().getId()));
			observers.add(observer);
		}
		entity.setObservers(observers);
		entity.setTags(dto.getTags());
		entity.setStartDate(dto.getStartDate());
		entity.setDueDate(dto.getDueDate());
		entity.setStatus(dto.getStatus());
		entity.setAssigneeEntries(normalizeAssigneeEntries(eDao, dto.getAssigneeEntries()));
		entity.setControlType(dto.getControlType());

		if (entity.isNew()) {
			entity.setAuthor(ses.getUser());
		}

		dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), formSesId));
		calculateReadersEditors(entity);
		return entity;
	}

	@Override
	public void calculateReadersEditors(Assignment entity) {
		List<Observer> observers = entity.getObservers();
		if (observers != null) {
			for (Observer observer : observers) {
				entity.addReader(observer.getEmployee().getUserID());
			}
		}
		for (AssigneeEntry ae : entity.getAssigneeEntries()) {
			entity.addReader(ae.getAssignee().getUserID());
		}
	}

	private List<AssigneeEntry> normalizeAssigneeEntries(EmployeeDAO eDao, List<AssigneeEntry> assigneeEntries) {
		int count = 0;
		for (AssigneeEntry entry : assigneeEntries) {
			entry.setSort(count);
			entry.setAssignee(eDao.findById(entry.getAssignee().getId()));
			count++;
		}
		return assigneeEntries;
	}

	public void startAssignee(Assignment entity) throws DAOException {
		ControlLifecycle cl = new ControlLifecycle(entity);
		cl.start();
	}

	public void resetAssignee(Assignment entity, Assignment dto, Employee resetEmployee) {
		List<AssigneeEntry> assigneeEntities = entity.getAssigneeEntries();
		List<AssigneeEntry> dtoAssigneeEntities = dto.getAssigneeEntries();
		for (AssigneeEntry dtoEntry : dtoAssigneeEntities) {
			for (AssigneeEntry entry : assigneeEntities) {
				if (dtoEntry.getAssignee().equals(entry.getAssignee())) {
					entry.setResetBy(resetEmployee);
					entry.setStatus(ControlStatusType.COMPLETED);
					entry.setResetTime(new Date());
				}
			}
		}

		int completedAssignee = 0;
		for (AssigneeEntry entry : assigneeEntities) {
			if (entry.getResetTime() != null) {
				completedAssignee++;
			}
		}

		if (completedAssignee == assigneeEntities.size()) {
			entity.setStatus(ControlStatusType.COMPLETED);
		}
	}

//	@Override
//	public Outcome getOutcome(Assignment entity) {
//		Outcome outcome = new Outcome();
//
//		if (StringUtil.isEmpty(entity.getTitle())) {
//			outcome.setTitle("assignment");
//		} else {
//			outcome.setTitle(entity.getTitle());
//		}
//		outcome.addPayload(entity);
//
//		if (!entity.isNew()) {
//			outcome.addPayload(new ACL(entity));
//		}
//
//		return outcome;
//	}
}
