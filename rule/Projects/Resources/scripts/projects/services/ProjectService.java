package projects.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.persistence.exceptions.DatabaseException;

import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingpojo.Outcome;
import com.exponentus.scripting.IPOJOObject;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.scripting._Validation;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import com.exponentus.user.IUser;
import com.exponentus.webserver.servlet.UploadedFile;

import administrator.dao.UserDAO;
import projects.dao.ProjectDAO;
import projects.model.Project;
import projects.model.constants.ProjectStatusType;
import projects.other.Messages;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

@Path("projects")
public class ProjectService extends RestProvider {
	
	private Outcome outcome = new Outcome();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getViewPage() {
		
		_Session session = getSession();
		try {
			int pageSize = getWebFormData().getNumberValueSilently("limit", session.pageSize);
			_SortParams sortParams = getWebFormData().getSortParams(_SortParams.asc("name"));
			ProjectDAO projectDAO = new ProjectDAO(session);
			ViewPage<Project> vp = projectDAO.findViewPage(sortParams, getWebFormData().getPage(), pageSize);
			// vp.setResult(ProjectDtoConverter.convert(vp.getResult()));
			
			_ActionBar actionBar = new _ActionBar(session);
			actionBar.addAction(new _Action("new_project", "", "new_project"));
			
			EmployeeDAO empDao = new EmployeeDAO(session);
			Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
					.collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));
			
			outcome.setId("projects");
			outcome.setTitle("projects");
			outcome.addPayload(actionBar);
			outcome.addPayload("employees", emps);
			outcome.addPayload(vp);
			
			return Response.ok(outcome).build();
		} catch (Exception e) {
			return responseException(e);
		}
	}
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(@PathParam("id") String id) {
		_Session session = getSession();
		IUser<Long> user = session.getUser();
		Project project;
		WebFormData formData = getWebFormData();
		try {
			ProjectDAO dao = new ProjectDAO(session);
			boolean isNew = "new".equals(id);
			if (!isNew) {
				project = dao.findById(id);
				
				outcome.addPayload(new ACL(project));
				outcome.setTitle("project");
			} else {
				outcome.setTitle("new_project");
				
				project = new Project();
				project.setAuthor(user);
				project.setComment("");
				project.setStatus(ProjectStatusType.DRAFT);
				String fsId = formData.getFormSesId();
				List<String> formFiles = null;
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
				// addContent(new _POJOListWrapper<>(filesToPublish, session));
				outcome.addPayload("filesToPublish", filesToPublish);
			}
			
			EmployeeDAO empDao = new EmployeeDAO(session);
			Map<Long, Employee> emps = new HashMap<>();
			List<Long> empIds = new ArrayList<>();
			empIds.add(project.getManager());
			empIds.add(project.getProgrammer());
			empIds.add(project.getTester());
			empIds.add(project.getAuthorId());
			if (project.getObservers() != null) {
				empIds.addAll(project.getObservers());
			}
			if (project.getRepresentatives() != null) {
				empIds.addAll(project.getRepresentatives());
			}
			for (Employee e : empDao.findAllByUserIds(empIds)) {
				emps.put(e.getUserID(), e);
			}
			
			outcome.setId(id);
			outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
			outcome.addPayload("employees", emps);
			outcome.addPayload(project);
			outcome.addPayload(getActionBar(session, project));
			
			return Response.ok(outcome).build();
		} catch (DAOException e) {
			return responseException(e);
		}
	}
	
	@POST
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(@PathParam("id") String id, Project projectForm) {
		_Session session = getSession();
		
		_Validation validation = validate(session, projectForm);
		if (validation.hasError()) {
			return responseValidationError(validation);
		}
		
		try {
			ProjectDAO dao = new ProjectDAO(session);
			Project project;
			boolean isNew = "new".equals(id);
			
			if (isNew) {
				project = new Project();
			} else {
				project = dao.findById(id);
				
				if (project == null) {
					return Response.status(Response.Status.NOT_FOUND).build();
				}
			}
			
			project.setName(projectForm.getName());
			project.setCustomer(projectForm.getCustomer());
			project.setManager(projectForm.getManager());
			project.setProgrammer(projectForm.getProgrammer());
			project.setTester(projectForm.getTester());
			project.setObservers(projectForm.getObservers());
			project.setRepresentatives(projectForm.getRepresentatives());
			project.setComment(projectForm.getComment());
			project.setStatus(projectForm.getStatus());
			project.setFinishDate(projectForm.getFinishDate());
			project.setAttachments(getActualAttachments(project.getAttachments(), projectForm.getAttachments()));
			project.setPrimaryLanguage(EnvConst.getDefaultLang());
			
			Set<Long> readers = new HashSet<>();
			readers.add(projectForm.getManager());
			readers.add(projectForm.getProgrammer());
			if (projectForm.getTester() > 0) {
				readers.add(projectForm.getTester());
			}
			readers.add(session.getUser().getId());
			if (projectForm.getObservers() != null) {
				readers.addAll(projectForm.getObservers());
			}
			
			project.setReaders(readers);
			
			if (isNew) {
				project = dao.add(project);
				new Messages(getAppEnv()).sendOfNewProject(project);
			} else {
				project = dao.update(project);
			}
			
			project = dao.findById(project.getId());
			
			outcome.setId(id);
			outcome.setTitle(project.getName());
			outcome.addPayload(project);
			
			return Response.ok(outcome).build();
		} catch (SecureException | DatabaseException | DAOException e) {
			return responseException(e);
		}
	}
	
	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") String id) {
		try {
			ProjectDAO dao = new ProjectDAO(getSession());
			Project entity = dao.findById(id);
			if (entity != null) {
				entity.setAttachments(null); // if no on delete cascade
				dao.delete(entity);
			}
			return Response.noContent().build();
		} catch (SecureException | DAOException e) {
			return responseException(e);
		}
	}
	
	@GET
	@Path("{id}/attachments/{attachId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAttachment(@PathParam("id") String id, @PathParam("attachId") String attachId) {
		try {
			ProjectDAO dao = new ProjectDAO(getSession());
			Project entity = dao.findById(id);
			
			return getAttachment(entity, attachId);
		} catch (Exception e) {
			return responseException(e);
		}
	}
	
	@DELETE
	@Path("{id}/attachments/{attachmentId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteAttachment(@PathParam("id") String id, @PathParam("attachmentId") String attachmentId) {
		return deleteAttachmentFromSessionFormAttachments(attachmentId);
	}
	
	private _ActionBar getActionBar(_Session session, Project project) {
		_ActionBar actionBar = new _ActionBar(session);
		if (project.isEditable()) {
			actionBar.addAction(new _Action("", "", _ActionType.SAVE_AND_CLOSE));
			if (!project.isNew()) {
				actionBar.addAction(new _Action("", "", _ActionType.DELETE_DOCUMENT));
			}
		}
		return actionBar;
	}
	
	private _Validation validate(_Session session, Project project) {
		_Validation ve = new _Validation();
		
		UserDAO userDAO = new UserDAO(session);
		
		if (project.getName() == null || project.getName().isEmpty()) {
			ve.addError("name", "required", "field_is_empty");
		} else if (project.getName().length() > 140) {
			ve.addError("name", "maxlen_140", "field_is_too_long");
		}
		if (project.getCustomer() == null) {
			ve.addError("customer", "required", "field_is_empty");
		}
		
		if (project.getManager() <= 0) {
			ve.addError("managerUserId", "required", "field_is_empty");
		} else {
			IUser<Long> managerUser = userDAO.findById(project.getManager());
			if (managerUser == null) {
				ve.addError("managerUserId", "required", "user_not_found");
			}
		}
		if (project.getProgrammer() <= 0) {
			ve.addError("programmerUserId", "required", "field_is_empty");
		} else {
			IUser<Long> programmerUser = userDAO.findById(project.getProgrammer());
			if (programmerUser == null) {
				ve.addError("programmerUserId", "required", "user_not_found");
			}
		}
		if (project.getTester() > 0) {
			IUser<Long> testerUser = userDAO.findById(project.getTester());
			if (testerUser == null) {
				ve.addError("testerUserId", "required", "user_not_found");
			}
		}
		
		if (project.getObservers() != null && project.getObservers().size() > 0) {
			for (long uid : project.getObservers()) {
				IUser<Long> ou = userDAO.findById(uid);
				if (ou == null) {
					ve.addError("observerUserIds", "required", "observer user not found");
				}
			}
		}
		
		if (project.getRepresentatives() != null && project.getRepresentatives().size() > 0) {
			for (long uid : project.getRepresentatives()) {
				IUser<Long> ou = userDAO.findById(uid);
				if (ou == null) {
					ve.addError("representativesUserIds", "required", "representative user not found");
				}
			}
		}
		
		if (project.getStatus() == null || project.getStatus() == ProjectStatusType.UNKNOWN) {
			ve.addError("status", "required", "field_is_empty");
		}
		if (project.getFinishDate() == null) {
			ve.addError("finishDate", "date", "field_is_empty");
		}
		if (project.getComment() != null && project.getComment().length() > 2048) {
			ve.addError("comment", "maxlen_2048", "field_is_too_long");
		}
		
		return ve;
	}
	
	@Override
	public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
		sd.setName(getClass().getName());
		ServiceMethod m = new ServiceMethod();
		m.setMethod(HttpMethod.GET);
		m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/projects");
		sd.addMethod(m);
		return sd;
	}
}
