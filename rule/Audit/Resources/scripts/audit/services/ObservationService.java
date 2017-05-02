package audit.services;

import administrator.model.User;
import audit.dao.ObservationDAO;
import audit.dao.ProjectDAO;
import audit.dao.filter.ObservationFilter;
import audit.domain.ObservationDomain;
import audit.init.AppConst;
import audit.model.Observation;
import audit.model.Project;
import audit.model.constants.ObservationStatusType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.EnvConst;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;
import org.eclipse.persistence.exceptions.DatabaseException;
import reference.dao.WorkTypeDAO;
import reference.model.WorkType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import staff.model.Organization;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Path("observations")
public class ObservationService extends RestProvider {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getViewPage() {

        _Session session = getSession();
        WebFormData params = getWebFormData();

        try {
            int pageSize = params.getNumberValueSilently("limit", session.pageSize);
            String statusName = params.getValueSilently("status");
            String projectId = params.getValueSilently("project");
            String contractorId = params.getValueSilently("contractor");
            String workTypeId = params.getValueSilently("workType");

            SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
            ObservationFilter filter = new ObservationFilter();

            if (!statusName.isEmpty()) {
                filter.setStatus(ObservationStatusType.valueOf(statusName));
            }
            if (!projectId.isEmpty()) {
                Project project = new Project();
                project.setId(UUID.fromString(projectId));
                filter.setProject(project);
            }
            if (!contractorId.isEmpty()) {
                Organization org = new Organization();
                org.setId(UUID.fromString(contractorId));
                filter.setContractor(org);
            }
            if (!workTypeId.isEmpty()) {
                WorkType wt = new WorkType();
                wt.setId(UUID.fromString(workTypeId));
                filter.setWorkType(wt);
            }

            ObservationDAO dao = new ObservationDAO(session);
            ViewPage<Observation> vp = dao.findViewPage(filter, sortParams, params.getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(new _Action(_ActionType.LINK).caption("new_observation").url(AppConst.BASE_URL + "observations/new"));
            actionBar.addAction(new _Action(_ActionType.RELOAD).id("refresh").icon("fa fa-refresh"));

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = new Outcome();
            outcome.addPayload("employees", emps);
            outcome.setTitle("observations");
            outcome.addPayload(actionBar);
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
        try {
            ObservationDAO dao = new ObservationDAO(session);
            Observation entity;
            ObservationDomain domain = new ObservationDomain();
            boolean isNew = "new".equals(id);

            if (isNew) {
                WorkTypeDAO workTypeDAO = new WorkTypeDAO(session);
                WorkType workType = null;
                ViewPage<WorkType> wtList = workTypeDAO.findAll();
                if (!wtList.getResult().isEmpty()) {
                    workType = wtList.getResult().get(0);
                }

                ProjectDAO projectDAO = new ProjectDAO(session);
                Project project = null;
                List<Project> projects = projectDAO.findProjectsByInspector((User) session.getUser());
                if (!projects.isEmpty()) {
                    project = projects.get(0);
                }

                entity = domain.composeNew((User) session.getUser(), project, workType);
            } else {
                entity = dao.findByIdentefier(id);
                if (entity == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            EmployeeDAO empDao = new EmployeeDAO(session);
            Map<Long, Employee> emps = empDao.findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = domain.getOutcome(entity);
            outcome.addPayload(EnvConst.FSID_FIELD_NAME, getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload(getActionBar(session, entity, domain));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Observation dto) {
        dto.setId(null);
        return save(dto);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") String id, Observation dto) {
        dto.setId(UUID.fromString(id));
        return save(dto);
    }

    public Response save(Observation dto) {
        _Session session = getSession();

        try {
            ProjectDAO projectDAO = new ProjectDAO(session);
            ObservationDAO dao = new ObservationDAO(session);
            Observation entity;
            ObservationDomain domain = new ObservationDomain();

            if (dto.isNew()) {
                entity = new Observation();
                entity.setAuthor(session.getUser());
                entity.setStatus(ObservationStatusType.DRAFT);
            } else {
                entity = dao.findById(dto.getId());

                if (entity == null) {
                    return Response.status(Response.Status.NOT_FOUND).build();
                }
            }

            dto.setProject(projectDAO.findById(dto.getProject().getId()));
            dto.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));

            domain.fillFromDto(entity, dto, (User) session.getUser());

            if (dto.isNew()) {
                RegNum rn = new com.exponentus.runtimeobj.RegNum();
                entity.setRegNumber(entity.getProject().getPrefix() + rn.getRegNumber(entity.getProject().getPrefix()));
                dao.add(entity, rn);
            } else {
                dao.update(entity);
            }

            if (dto.isNew()) {
                // new Messages(getAppEnv()).sendOfNewObservation(project);
            }

            entity = dao.findById(entity.getId());

            return Response.ok(domain.getOutcome(entity)).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (SecureException | DatabaseException | DAOException e) {
            return responseException(e);
        }
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") String id) {
        try {
            ObservationDAO dao = new ObservationDAO(getSession());
            Observation entity = dao.findByIdentefier(id);
            if (entity != null) {
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
            ObservationDAO dao = new ObservationDAO(getSession());
            Observation entity = dao.findByIdentefier(id);

            return getAttachment(entity, attachId);
        } catch (Exception e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}/attachments/{attachId}/{fileName}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAttachmentFN(@PathParam("id") String id, @PathParam("attachId") String attachId) {
        return getAttachment(id, attachId);
    }

    private _ActionBar getActionBar(_Session session, Observation entity, ObservationDomain domain) {
        _ActionBar actionBar = new _ActionBar(session);
        actionBar.addAction(new _Action(_ActionType.CLOSE).caption("close").icon("fa fa-chevron-left").cls("btn-back"));
        if (entity.isEditable()) {
            actionBar.addAction(new _Action(_ActionType.SAVE_AND_CLOSE).caption("save_close").cls("btn-primary"));
            actionBar.addAction(new _Action(_ActionType.CUSTOM_ACTION).id("detect_gps_location").caption("detect_gps_location").icon("fa fa-map-marker"));
        }
        return actionBar;
    }
}
