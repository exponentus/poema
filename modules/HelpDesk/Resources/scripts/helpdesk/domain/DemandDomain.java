package helpdesk.domain;

import administrator.model.User;
import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.ui.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.RegNum;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import helpdesk.dao.DemandDAO;
import helpdesk.model.Demand;
import helpdesk.model.constants.DemandStatusType;
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

        if (entity.isNew()) {
            RegNum rn = new RegNum();
            entity.setRegNumber(demandType.getPrefix() + rn.getRegNumber(demandType.getPrefix()));

            entity.setAuthor(ses.getUser());
            entity.addReaderEditor(entity.getAuthor());
        }

        if (entity.getTask() == null && dto.getTask() != null) {
            entity.setTask(dto.getTask());
            entity.getTask().setDemand(entity);
            entity.getTask().setProject(entity.getProject());
        }

        return entity;
    }

    public void changeStatus(Demand demand, DemandStatusType status) {
        // DRAFT(566), PROCESSING(567), COMPLETED(568), CANCELLED(569),
        // OPEN(570);
        demand.setStatus(status);
        demand.setStatusDate(new Date());
    }

    public void registerTask(Demand demand) {

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

        if (!demand.isNew()) {
            outcome.addPayload(new ACL(demand));
        }

        return outcome;
    }
}
