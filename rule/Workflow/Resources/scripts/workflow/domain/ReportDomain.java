package workflow.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;

import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.ReportDAO;
import workflow.model.Assignment;
import workflow.model.Report;

public class ReportDomain extends CommonDomain<Report> {

	public ReportDomain(_Session ses) throws DAOException {
		super(ses);
		dao = new ReportDAO(ses);
	}

	public Report composeNew(Employee author, Assignment parent) {
		if (parent == null) {
			throw new IllegalArgumentException("parent null");
		}

		Report entity = new Report();
		entity.setAuthor(author.getUser());
		entity.setAppliedAuthor(author);
		entity.setAppliedRegDate(new Date());
		entity.setParent(parent);

		return entity;
	}

	@Override
	public Report fillFromDto(Report dto, IValidation<Report> validation, String fsid) throws DTOException, DAOException {
		validation.check(dto);

		Report entity;

		if (dto.isNew()) {
			entity = new Report();
		} else {
			entity = dao.findById(dto.getId());
		}

		EmployeeDAO eDao = new EmployeeDAO(ses);
		if (entity.isNew()) {
			if (dto.getParent() == null) {
				throw new DTOException("assignment", "required", "field_is_empty");
			}
			entity.setAppliedAuthor(eDao.findById(dto.getAppliedAuthor().getId()));
			entity.setAppliedRegDate(dto.getAppliedRegDate());
			entity.setParent(dto.getParent());
			entity.setAuthor(ses.getUser());

		}
		entity.setTitle(dto.getTitle());
		entity.setBody(dto.getBody());
		entity.setAppliedAuthor(dto.getAppliedAuthor());
		entity.setAppliedRegDate(dto.getAppliedRegDate());

		List<Observer> observers = new ArrayList<Observer>();
		for (Observer o : dto.getObservers()) {
			Observer observer = new Observer();
			observer.setEmployee(eDao.findById(o.getEmployee().getId()));
			observers.add(observer);
		}
		entity.setObservers(observers);
		dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), fsid));
		calculateReadersEditors(entity);
		return entity;
	}

	private void calculateReadersEditors(Report entity) {
		entity.addReaderEditor(entity.getAuthor());
	}

	@Override
	public Report save(Report entity) throws SecureException, DAOException, DTOException {
		return dao.save(entity);
	}

	@Override
	public Outcome getOutcome(Report entity) {
		Outcome outcome = new Outcome();

		if (StringUtil.isEmpty(entity.getTitle())) {
			outcome.setTitle("report");
		} else {
			outcome.setTitle(entity.getTitle());
		}
		outcome.addPayload(entity);
		outcome.addPayload("assignment", entity.getParent());
		if (!entity.isNew()) {
			outcome.addPayload(new ACL(entity));
		}

		return outcome;
	}
}
