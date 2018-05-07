package helpdesk.domain;

import administrator.model.User;
import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.ui.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
import projects.model.Task;
import reference.dao.DemandTypeDAO;
import reference.model.DemandType;

import java.util.Date;

public class DemandDomain extends CommonDomain<Demand> {

    public DemandDomain(_Session ses) throws DAOException {
        super(ses);
        dao = new DemandDAO(ses);
    }

    public Demand composeNew(User user, DemandType demandType) {
        Demand demand = new Demand();

        demand.setAuthor(user);
        demand.setTitle("");
        demand.setBody("");
        demand.setStatus(DemandStatusType.DRAFT);
        demand.setDemandType(demandType);

        return demand;
    }

    @Override
    public Demand fillFromDto(Demand dto, IValidation<Demand> validation, String formSesId) throws DTOException, DAOException {
        validation.check(dto);

        Demand entity;
        DemandTypeDAO demandTypeDAO = new DemandTypeDAO(ses);

        if (dto.isNew()) {
            entity = new Demand();
            entity.setAuthor(ses.getUser());
            entity.addReaderEditor(entity.getAuthor());
        } else {
            entity = dao.findById(dto.getId());
        }

        DemandType demandType = demandTypeDAO.findById(dto.getDemandType().getId());
        entity.setDemandType(demandType);
        entity.setStatus(dto.getStatus());
        entity.setStatusDate(dto.getStatusDate());
        entity.setTitle(dto.getTitle());
        entity.setBody(dto.getBody());
        entity.setTags(dto.getTags());
        entity.setProject(dto.getProject());
        entity.setWayOfInteraction(dto.getWayOfInteraction());
        entity.setAttachments(getActualAttachments(entity.getAttachments(), dto.getAttachments(), formSesId));


        return entity;
    }

    public void changeStatus(Demand demand, DemandStatusType status) {
        // DRAFT(566), PROCESSING(567), COMPLETED(568), CANCELLED(569),
        // OPEN(570);
        demand.setStatus(status);
        demand.setStatusDate(new Date());
    }


    public Outcome getOutcome(Demand demand) {
        Outcome outcome = new Outcome();

        if (StringUtil.isEmpty(demand.getTitle())) {
            outcome.setTitle(Environment.vocabulary.getWord("demand", ses.getLang()));
        } else {
            outcome.setTitle(Environment.vocabulary.getWord("demand", ses.getLang()) + " " + demand.getTitle());
        }
        outcome.setModel(demand);
        outcome.setPayloadTitle("demand");

        if (demand.getTask() != null) {
            Task task = new Task();
            task.setId(demand.getTask().getId());
            task.setTitle(demand.getTask().getTitle());
            task.setRegNumber(demand.getTask().getRegNumber());
            task.setStatus(demand.getTask().getStatus());
            demand.setTask(task);
        }

        if (!demand.isNew()) {
            outcome.addPayload(new ACL(demand));
        }

        return outcome;
    }
}
