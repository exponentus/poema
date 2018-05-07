package helpdesk.services;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.model.constants.PriorityType;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.ACL;
import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.actions.constants.ActionType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.exception.SecureException;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.rest.exception.RestServiceException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting.WebFormData;
import com.exponentus.scripting._Session;
import com.exponentus.server.Server;
import helpdesk.dao.DemandDAO;
import helpdesk.dao.filter.DemandFilter;
import helpdesk.domain.DemandDomain;
import helpdesk.dto.converter.DemandDtoConverter;
import helpdesk.init.ModuleConst;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import helpdesk.ui.ViewOptions;
import org.joda.time.LocalDate;
import projects.dao.ProjectDAO;
import projects.domain.TaskDomain;
import projects.model.Project;
import projects.model.Task;
import projects.services.TaskService;
import reference.dao.DemandTypeDAO;
import reference.dao.TaskTypeDAO;
import reference.model.DemandType;
import reference.model.Tag;
import reference.model.TaskType;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Path("demands")
@Produces(MediaType.APPLICATION_JSON)
public class DemandService extends EntityService<Demand, DemandDomain> {

    @GET
    public Response getViewPage() {
        _Session session = getSession();
        WebFormData params = getWebFormData();

        try {
            String slug = params.getValueSilently("slug");
            String statusName = params.getValueSilently("status");
            String demandTypeId = params.getValueSilently("demandType");
            String projectId = params.getValueSilently("project");

            DemandFilter filter = new DemandFilter();

            if (!statusName.isEmpty()) {
                DemandStatusType status = DemandStatusType.valueOf(statusName);
                filter.setStatus(status);
            }
            if (!demandTypeId.isEmpty()) {
                DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                filter.setDemandType(demandTypeDAO.findById(demandTypeId));
            } else if (!slug.isEmpty()) {
                try {
                    DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                    DemandType demandType = demandTypeDAO.findByName(slug);
                    filter.setDemandType(demandType);
                } catch (DAOException e) {
                    Server.logger.exception(e);
                }
            }
            if (!projectId.isEmpty()) {
                Project project = new Project();
                project.setId(UUID.fromString(projectId));
                filter.setProject(project);
            }
            if (params.containsField("tags")) {
                List<Tag> tags = new ArrayList<>();
                String[] tagIds = params.getListOfValuesSilently("tags");
                for (String tid : tagIds) {
                    Tag tag = new Tag();
                    tag.setId(UUID.fromString(tid));
                    tags.add(tag);
                }
                filter.setTags(tags);
            }

            return getViewPage(filter);
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @POST
    public Response getViewPage(DemandFilter filter) throws DAOException {
        _Session session = getSession();
        LanguageCode lang = session.getLang();
        WebFormData params = getWebFormData();
        SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
        int pageSize = session.getPageSize();
        DemandType demandType = filter.getDemandType();

        DemandDAO dao = new DemandDAO(session);
        ViewPage<Demand> vp = dao.findViewPage(filter, new DemandDtoConverter(session.getUser()), sortParams, params.getPage(), pageSize);

        ViewOptions viewOptions = new ViewOptions();
        vp.setViewPageOptions(viewOptions.getDemandOptions());
        vp.setFilter(viewOptions.getDemandFilter(session));

        ActionBar actionBar = new ActionBar(session);
        Action newDocAction = new Action(ActionType.LINK).caption("add_demand")
                .url(ModuleConst.BASE_URL + "demands/new?type=" + (demandType == null ? "" : demandType.getName()));
        actionBar.addAction(newDocAction);
        actionBar.addAction(new ConventionalActionFactory().refreshVew);

        Outcome outcome = new Outcome();
        outcome.setId("demands");
        outcome.setTitle("demands");
        outcome.setPayloadTitle(demandType == null ? "demands" : demandType.getLocName(lang));
        outcome.addPayload(actionBar);
        outcome.addPayload(vp);

        return Response.ok(outcome).build();
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        try {
            _Session session = getSession();
            Demand demand;
            boolean isNew = "new".equals(id);

            if (isNew) {
                String demandTypeName = getWebFormData().getValueSilently("type");
                DemandType demandType = null;

                try {
                    DemandTypeDAO demandTypeDAO = new DemandTypeDAO(session);
                    if (demandTypeName.isEmpty() || demandTypeName.equals("my")) {
                        demandType = demandTypeDAO.findByName("bug");
                    } else {
                        demandType = demandTypeDAO.findByName(demandTypeName);
                    }
                } catch (DAOException e) {
                    Server.logger.exception(e);
                }

                User user = (User) session.getUser();
                demand = new Demand();
                demand.setAuthor(user);
                demand.setStatus(DemandStatusType.DRAFT);
                demand.setDemandType(demandType);

                Task task = new Task();
                task.setAuthor(user);
                try {
                    TaskTypeDAO taskTypeDAO = new TaskTypeDAO(session);
                    TaskType taskType = taskTypeDAO.findByName(projects.init.ModuleConst.DEFAULT_TASK_TYPE);
                    task.setTaskType(taskType);
                } catch (DAOException e) {
                    Server.logger.exception(e);
                }
                task.setStatus(StatusType.DRAFT);
                task.setStartDate(new Date());
                task.setDueDate(new LocalDate(task.getStartDate()).plusDays(projects.init.ModuleConst.DEFAULT_DUE_DATE_RANGE).toDate());
                demand.setTasks(Collections.singletonList(task));
            } else {
                DemandDAO dao = new DemandDAO(session);
                demand = dao.findById(id);
            }

            Map<Long, Employee> emps = new EmployeeDAO(session).findAll(false).getResult().stream()
                    .collect(Collectors.toMap(Employee::getUserID, Function.identity(), (e1, e2) -> e1));

            Outcome outcome = new Outcome();
            outcome.setTitle(Environment.vocabulary.getWord("demand", session.getLang()));
            outcome.setModel(demand);
            outcome.setPayloadTitle("demand");

            if (!demand.isNew()) {
                outcome.addPayload(new ACL(demand));
            }

            outcome.addPayload(getActionBar(session, demand));
            outcome.setFSID(getWebFormData().getFormSesId());
            outcome.addPayload("employees", emps);
            outcome.addPayload("priorityTypes", Arrays.stream(PriorityType.values()).filter(it -> it != PriorityType.UNKNOWN).collect(toList()));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Demand dto) {
        try {
            new Validation().check(dto);
            _Session ses = getSession();
            DemandDAO demandDAO = new DemandDAO(ses);
            DemandTypeDAO demandTypeDAO = new DemandTypeDAO(ses);

            Demand entity;

            if (dto.isNew()) {
                entity = new Demand();
                entity.setAuthor(ses.getUser());
            } else {
                entity = demandDAO.findById(dto.getId());
            }

            ProjectDAO projectDAO = new ProjectDAO(ses);
            Project project = projectDAO.findById(dto.getProject().getId());

            DemandType demandType = demandTypeDAO.findById(dto.getDemandType().getId());
            entity.setDemandType(demandType);
            entity.setStatus(dto.getStatus());
            entity.setStatusDate(dto.getStatusDate());
            entity.setTitle(dto.getTitle());
            entity.setBody(dto.getBody());
            entity.setTags(dto.getTags());
            entity.setProject(project);
            entity.setWayOfInteraction(dto.getWayOfInteraction());
            entity.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments()));
            entity.setStatus(DemandStatusType.OPEN);

            if (entity.isNew()) {
                RegNum rn = new RegNum();
                entity.setRegNumber(entity.getDemandType().getPrefix() + rn.getRegNumber(entity.getDemandType().getPrefix()));
                entity = demandDAO.add(entity, rn);
                if (entity != null && dto.getTasks().size() > 0) {
                    TaskDomain taskDomain = new TaskDomain(getSession());
                    Task taskDto = dto.getTasks().get(0);
                    taskDto.setProject(project);
                    taskDto.setDemand(entity);
                    taskDto.setTitle(entity.getTitle());
                    Task task = taskDomain.fillFromDto(taskDto, new TaskService.Validation(getSession()), getWebFormData().getFormSesId());
                    taskDomain.saveTask(task);
                    entity.setTasks(Collections.singletonList(task));
                    demandDAO.update(entity);
                }
            } else {
                demandDAO.update(entity);
            }

            Outcome outcome = new Outcome();
            outcome.setTitle(Environment.vocabulary.getWord("demand", ses.getLang()) + " " + entity.getTitle());
            outcome.setModel(entity);
            outcome.setPayloadTitle("demand");
            if (!entity.isNew()) {
                outcome.addPayload(new ACL(entity));
            }
            return Response.ok(outcome).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException | ApprovalException e) {
            return responseException(e);
        } catch (RestServiceException e) {
            return responseException(e);
        }
    }

    private ActionBar getActionBar(_Session session, Demand entity) {
        ActionBar actionBar = new ActionBar(session);
        ConventionalActionFactory actionFactory = new ConventionalActionFactory();

        actionBar.addAction(actionFactory.close);
        if (entity.isNew() || entity.isEditable()) {
            String actLabel = entity.isNew() ? "send" : "save_close";
            actionBar.addAction(actionFactory.saveAndClose.caption(actLabel).cls("btn-primary"));
        }
        if (!entity.isNew() && entity.isEditable()) {
            actionBar.addAction(actionFactory.deleteDocument);
        }

        return actionBar;
    }

    private class Validation implements IValidation<Demand> {

        @Override
        public void check(Demand demand) throws DTOException {
            DTOException ve = new DTOException();

            if (demand.getProject() == null) {
                ve.addError("project", "required", "field_is_empty");
            }

            if (demand.getTitle() == null || demand.getTitle().isEmpty()) {
                ve.addError("title", "required", "field_is_empty");
            }
            if (demand.getDemandType() == null) {
                ve.addError("demandType", "required", "field_is_empty");
            }

            if (ve.hasError()) {
                throw ve;
            }
        }
    }
}
