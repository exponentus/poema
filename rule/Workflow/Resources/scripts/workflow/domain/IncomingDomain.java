package workflow.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.exponentus.common.domain.DTOService;
import com.exponentus.common.domain.IValidation;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import administrator.model.User;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.IncomingDAO;
import workflow.model.Incoming;

public class IncomingDomain extends DTOService<Incoming> {

	public IncomingDomain(_Session ses) throws DAOException {
		super(ses);
		dao = new IncomingDAO(ses);
	}

	public Incoming composeNew(IUser<Long> user) {
		Incoming entity = new Incoming();
		entity.setAuthor(user);
		entity.setAppliedRegDate(new Date());

		return entity;
	}

	@Override
	public Incoming fillFromDto(Incoming dto, IValidation<Incoming> validation, String fsid)
			throws DTOException, DAOException {
		validation.check(dto);

		Incoming entity;

		if (dto.isNew()) {
			entity = new Incoming();
		} else {
			entity = dao.findById(dto.getId());
		}

		entity.setTitle(dto.getTitle());
		entity.setAppliedRegDate(new Date());
		entity.setDocLanguage(dto.getDocLanguage());
		entity.setDocType(dto.getDocType());

		entity.setDocSubject(dto.getDocSubject());
		entity.setSender(dto.getSender());

		EmployeeDAO eDao = new EmployeeDAO(ses);
		Employee emp = eDao.findById(dto.getAddressee().getId());
		entity.setAddressee(emp);

		entity.setSenderRegNumber(dto.getSenderRegNumber());
		entity.setSenderAppliedRegDate(dto.getSenderAppliedRegDate());
		entity.setBody(dto.getBody());

		List<Observer> observers = new ArrayList<Observer>();
		for (Observer o : dto.getObservers()) {
			Observer observer = new Observer();
			observer.setEmployee(eDao.findById(o.getEmployee().getId()));
			observers.add(observer);
		}
		entity.setObservers(observers);
		entity.setTags(dto.getTags());

		if (entity.isNew()) {
			entity.setAuthor(ses.getUser());
		}
		dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), fsid));
		calculateReadersEditors(entity);
		return entity;
	}

	@Override
	public Incoming save(Incoming entity) throws SecureException, DAOException, DTOException {
		if (entity.isNew()) {
			RegNum rn = new RegNum();
			entity.setRegNumber(Integer.toString(rn.getRegNumber(entity.getDefaultFormName())));
			entity = dao.add(entity, rn);
		} else {
			entity = dao.update(entity);
		}
		return entity;
	}

	private void calculateReadersEditors(Incoming entity) {
		entity.resetReadersEditors();
		entity.addReaderEditor(entity.getAuthor());
		entity.addReader(entity.getAddressee().getUser());

		List<Observer> observers = entity.getObservers();
		if (observers != null) {
			for (Observer observer : observers) {
				Employee emp = observer.getEmployee();
				entity.addReader(emp.getUserID());
			}
		}
	}

	public boolean canCreateAssignment(Incoming entity, User user) {
		return !entity.isNew()
				&& (entity.getAddressee() != null && entity.getAddressee().getUser().getId().equals(user.getId())
						|| user.getRoles().contains("chancellery"));
	}
}
