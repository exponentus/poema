package helpdesk.services;

import administrator.model.User;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.model.constants.PriorityType;
import com.exponentus.common.service.EntityService;
import com.exponentus.common.ui.ConventionalActionFactory;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.Action;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.common.ui.actions.constants.ActionType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
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
import projects.model.Project;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;
import reference.model.Tag;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Path("demands")
@Produces(MediaType.APPLICATION_JSON)
public class DemandService extends EntityService<Demand, DemandDomain> {

    @GET
    public Response getViewPage() {
        _Session session = getSession();
        WebFormData params = getWebFormData();
        int pageSize = session.getPageSize();

        try {
            String slug = params.getValueSilently("slug");
            String statusName = params.getValueSilently("status");
            String demandTypeId = params.getValueSilently("demandType");
            String projectId = params.getValueSilently("project");

            SortParams sortParams = params.getSortParams(SortParams.desc("regDate"));
            DemandFilter filter = new DemandFilter();

            if (!statusName.isEmpty()) {
                DemandStatusType status = DemandStatusType.valueOf(statusName);
                filter.setStatus(status);
            }
            if (!demandTypeId.isEmpty()) {
                DemandType demandType = new DemandType();
                demandType.setId(UUID.fromString(demandTypeId));
                filter.setDemandType(demandType);
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

            DemandDAO dao = new DemandDAO(session);
            ViewPage<Demand> vp = dao.findViewPage(filter, new DemandDtoConverter(), sortParams, params.getPage(), pageSize);

            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getDemandOptions());
            vp.setFilter(viewOptions.getDemandFilter(session));

            ActionBar actionBar = new ActionBar(session);
            Action newDocAction = new Action(ActionType.LINK).caption("add_demand")
                    .url(ModuleConst.BASE_URL + "demands/new?type=" + slug);
            actionBar.addAction(newDocAction);
            actionBar.addAction(new ConventionalActionFactory().refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("demands");
            outcome.setTitle("demands");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") String id) {
        try {
            _Session session = getSession();
            Demand entity;
            DemandDomain demandDomain = new DemandDomain(session);
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
                entity = demandDomain.composeNew((User) session.getUser(), demandType);
            } else {
                DemandDAO dao = new DemandDAO(session);
                entity = dao.findById(id);
            }

            Outcome outcome = demandDomain.getOutcome(entity);
            outcome.addPayload(getActionBar(session, entity));
            outcome.setFSID(getWebFormData().getFormSesId());
            outcome.addPayload("priorityTypes", Arrays.stream(PriorityType.values()).filter(it -> it != PriorityType.UNKNOWN).collect(toList()));

            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @Override
    public Response saveForm(Demand dto) {
        try {
            DemandDomain domain = new DemandDomain(getSession());
            Demand demand = domain.fillFromDto(dto, new DemandService.Validation(), getWebFormData().getFormSesId());
//            if (demand.getTask() != null) {
//                TaskDAO taskDAO = new TaskDAO(getSession());
//                TaskDomain taskDomain = new TaskDomain(getSession());
//                Task task = taskDomain.fillFromDto(demand.getTask(), new TaskService.Validation(getSession()), getWebFormData().getFormSesId());
//
//                domain.save(demand);
//                taskDAO.save(task);
//            } else {
//                domain.save(demand);
//            }

            domain.save(demand);

            return Response.ok(domain.getOutcome(demand)).build();
        } catch (DTOException e) {
            return responseValidationError(e);
        } catch (DAOException | SecureException e) {
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
