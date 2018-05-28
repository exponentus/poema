package workflow.domain;

import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.model.constants.SolutionType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import org.apache.commons.lang3.StringUtils;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.embedded.Observer;
import workflow.dao.AssignmentDAO;
import workflow.dao.ReportDAO;
import workflow.model.Assignment;
import workflow.model.Report;
import workflow.model.constants.ControlStatusType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Deprecated
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
            entity.setAppliedAuthor(eDao.findById(dto.getAppliedAuthor().getId()));
            entity.setAppliedRegDate(dto.getAppliedRegDate());
            entity.setAuthor(ses.getUser());
        }

        SolutionType solutionType = dto.getSolution();
        if (solutionType == null) {
            entity.setSolution(SolutionType.ACCEPTED);
        } else {
            entity.setSolution(solutionType);
        }
        entity.setSolutionComment(dto.getSolutionComment());

        Assignment parent = dto.getParent();
        if (parent != null) {
            AssignmentDAO aDao = new AssignmentDAO(ses);
            entity.setParent(aDao.findById(parent.getId()));
        } else {
            throw new DTOException("assignment", "required", "field_is_empty");
        }

        String title = dto.getTitle();
        if (title == null || title.isEmpty()) {
            title = StringUtils.abbreviate(StringUtil.cleanFromMarkdown(dto.getBody()), 140);
        }
        entity.setTitle(title);
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

    public void calculateReadersEditors(Report entity) {
        entity.addReaderEditor(entity.getAuthor());
        Assignment parent = entity.getParent();
        entity.addReaders(parent.getReaders());
    }

    @Override
    public boolean delete(String id, IValidation<Report> validation) throws DTOException, DAOException, SecureException {
        Report entity = getEntity(id);
        if (entity != null) {
            validation.check(entity);
            UUID reportUserId = entity.getAppliedAuthor().getId();
            dao.delete(entity);
            AssignmentDAO aDao = new AssignmentDAO(ses);
            Assignment assignment = aDao.findById(entity.getParent().getId());
            ControlLifecycle cl = new ControlLifecycle(assignment);
            cl.unCompleteAssignee(reportUserId);
            aDao.update(assignment, false);
            return true;
        }
        return false;
    }

    //TODO it needed transaction tracking
    public Assignment checkAssignment(Report entity) throws DAOException, SecureException {
        AssignmentDAO aDao = new AssignmentDAO(ses);
        Assignment assignment = aDao.findById(entity.getParent().getId());
        ControlLifecycle cl = new ControlLifecycle(assignment);
        if (cl.check()) {
            assignment.addReaders(entity.getReaders());
            aDao.update(assignment, false);
        }
        if (assignment.getStatus() == ControlStatusType.COMPLETED) {
            resetEditors(entity);
        }
        return assignment;
    }

    public Assignment acceptReport(Report dto) throws DAOException, SecureException {
        AssignmentDAO aDao = new AssignmentDAO(ses);
        Assignment assignment = aDao.findById(dto.getParent().getId());
        ControlLifecycle cl = new ControlLifecycle(assignment);
        if (cl.completeAssignee(dto.getAppliedAuthor().getId(), new EmployeeDAO(ses).findByUserId(ses.getUser().getId()))) {
            aDao.update(assignment, false);
        }
        return assignment;
    }

    public Assignment declineReport(Report dto) throws DAOException, SecureException {
        AssignmentDAO aDao = new AssignmentDAO(ses);
        Assignment assignment = aDao.findById(dto.getParent().getId());
        ControlLifecycle cl = new ControlLifecycle(assignment);
        if (cl.unCompleteAssignee(dto.getAppliedAuthor().getId())) {
            aDao.update(assignment, false);
        }
        return assignment;
    }
}
